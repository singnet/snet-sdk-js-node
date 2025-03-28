const SnetSDK = require('snet-sdk-node');
const service = require('./stubs/example_service_grpc_pb');
const config = require('./config');
const DefaultPaymentStrategy = require('snet-sdk-node/dist/payment_strategies/DefaultPaymentStrategy');

const sdk = new SnetSDK.default(config);

const main = async () => {
    const orgId = '26072b8b6a0e448180f8c0e702ab6d2f';
    const serviceId = 'Exampleservice';
    const groupName = 'default_group';

    const opts = {
        disableBlockchainOperations: false,
        tokenExpiryDateBlock: 10000000,
        tokenToMakeFreeCall: 'token',
        email: 'your@email.ru',
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
            console.log('result: ', result.getResult());
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