const SnetSDK = require('snet-sdk-node');
const service = require('./stubs/example_service_grpc_pb');
const config = require('./config');
const DefaultPaymentStrategy = require('snet-sdk-node/paymentStrategies/DefaultPaymentStrategy');

const sdk = new SnetSDK.default(config);

const main = async () => {
    const orgId = '190625';
    const serviceId = '190625_1';
    const groupName = 'default_group';

    const opts = {
        disableBlockchainOperations: false,
        concurrency: false
    };

    const closeConnection = () => {
        sdk.web3.currentProvider.connection && sdk.web3.currentProvider.connection.close();
    };

    const responseHandler = (resolve, reject) => (err, result) => {
        if (err) {
            console.error('call failed', err);
            closeConnection();
            reject(err);
        } else {
            console.log('result: ', result.getValue());
            resolve(result);
        }
    };

    try {
        const serviceMetadataProvider = await sdk.createServiceMetadataProvider(orgId, serviceId, groupName, opts);
        const paymentStrategy = new DefaultPaymentStrategy.default(serviceMetadataProvider.account, 0);
        const serviceClient = await sdk.createServiceClient(serviceMetadataProvider, service.CalculatorClient, paymentStrategy);

        const numbers = new service.CalculatorService.mul.requestType();
        numbers.setA(Math.floor(Math.random() * 10) + 1);
        numbers.setB(Math.floor(Math.random() * 10) + 1);

        await new Promise((resolve, reject) => {
            serviceClient.service.mul(numbers, responseHandler(resolve, reject));
        });
    } catch (err) {
        console.error(err);
    } finally {
        closeConnection();
    }
};

main();