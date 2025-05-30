const SnetSDK = require('snet-sdk-node');
const service = require('./stubs/example_service_grpc_pb');
const config = require('./config');
const DefaultPaymentStrategy = require('snet-sdk-node/paymentStrategies/DefaultPaymentStrategy');

const cluster = require('cluster');

const sdk = new SnetSDK.default(config);

const main = async () => {
    const orgId = '26072b8b6a0e448180f8c0e702ab6d2f';
    const serviceId = 'Exampleservice';
    const groupName = 'default_group';
    const opts = {
        concurrency: true
    };
    const concurrencyCalls = 2;
    const serviceMetadataProvider = await sdk.createServiceMetadataProvider(orgId, serviceId, groupName, opts);
    const paymentStrategy = new DefaultPaymentStrategy.default(serviceMetadataProvider.account, concurrencyCalls);
    const serviceClient = await sdk.createServiceClient(serviceMetadataProvider, service.CalculatorClient, paymentStrategy);

    if (cluster.isMaster) {
        console.log(`Master process started with PID: ${process.pid}`);
        const {concurrencyToken, channelId} = await serviceClient.getConcurrencyTokenAndChannelId();
        const strChannelId = channelId.toString()
        const worker = cluster.fork();
        worker.on('message', message => {
            console.log(`Worker ${worker.id} requested concurrency token`);
            worker.send({
                concurrencyToken,
                strChannelId,
                info: `Master: sent concurrency token to worker ${worker.id}`
            });
        });
        worker.send({
            concurrencyToken,
            strChannelId,
            info: `Master: sent concurrency token to worker ${worker.id}`
        });
        cluster.on('exit', (worker, code, signal) => {
            console.log(`Worker ${worker.process.pid} exited with code ${code}`);
        });
    } else {
        process.send(`Worker ${process.pid} ready to receive token`);
        process.on('message', async (message) => {
            serviceClient.setConcurrencyTokenAndChannelId(message.concurrencyToken, message.channelId);

            const numbers = new service.CalculatorService.mul.requestType();
            numbers.setA(Math.floor(Math.random() * 10) + 1);
            numbers.setB(Math.floor(Math.random() * 10) + 1);

            serviceClient.service.mul(numbers, (err, result) => {
                if (err) {
                    console.error(`Worker ${process.pid} service failed with error: ${err}`);
                } else {
                    console.log(`Worker ${process.pid} service response: ${result.getValue()}`);
                }
                process.exit();
            });
        });
    }
}

main()
