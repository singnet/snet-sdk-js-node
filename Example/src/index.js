// const importSync = require('import-sync');
// const SnetNodeSDK = require('snet-sdk-node'); //TODO
// const { DefaultPaymentStrategy } = importSync('snet-sdk-node');
// const service = require('./stubs/example_service_grpc_pb');
// const messages = require('./stubs/example_service_pb');
// const config = require('./config');

// import * as pkg from 'snet-sdk-node';
// import SnetNodeSDK from 'snet-sdk-node';
// import service from './stubs/example_service_grpc_pb.js';
// import messages from './stubs/example_service_pb.js';
// import config from './config.js';

// const SnetNodeSDK = require('snet-sdk-core/snet-sdk-core.min.js');
import { SnetSDK } from 'snet-sdk-core/snet-sdk-core.min.js';

const config = {
    web3Provider: 'https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID',
    privateKey:
        '5befbd91004bd9c45bd45f43b4057a9368ca18072c10c1e56d209a9e68d32be4',
    networkId: '1',
    ipfsEndpoint: 'https://ipfs.singularitynet.io',
    defaultGasPrice: '4700000',
    defaultGasLimit: '210000',
};

const sdk = new SnetSDK(config);

console.log('sdk', sdk);
// const input = new messages.Numbers();

const main = async (a, b) => {
    const orgId = '26072b8b6a0e448180f8c0e702ab6d2f';
    const serviceId = 'Exampleservice';
    const groupName = 'default_group';
    // const paymentStrategy = new pkg.DefaultPaymentStrategy();
    const opts = {
        disableBlockchainOperations: false,
        tokenExpirationBlock: 21237532,
        tokenToMakeFreeCall:
            '58a80f49c24af290983064f27a364f70ab2bf33ec00f445e2ddbaecfb891347c186f42a17042511b841c65680f82086455ac2d760d039658448fe642cb8f87f21b',
        email: 'redarek4@yandex.ru',
        concurrency: true,
    };

    // input.setA(a);
    // input.setB(b);
    console.log('value set');

    const closeConnection = () => {
        sdk.web3.currentProvider.connection &&
            sdk.web3.currentProvider.connection.close();
    };

    const responseHandler = (resolve, reject) => (err, result) => {
        if (err) {
            console.log('GRPC call failed');
            console.error(err);
            closeConnection();
            reject(err);
        } else {
            console.log('Result:', result.getValue());
            console.log('<---------->');
            resolve(result);
        }
    };

    try {
        console.log('init service client');
        const serviceClient = await sdk.createServiceClient(
            orgId,
            serviceId,
            // service.CalculatorClient,
            groupName,
            paymentStrategy,
            opts
        );

        console.log('service client created success!');

        await new Promise((resolve, reject) => {
            console.log(`Performing: ${a} * ${b}`);
            console.log(resolve);
            console.log(reject);
            // serviceClient.service.mul(input, responseHandler(resolve, reject));
        });

        closeConnection();
    } catch (error) {
        console.log('promise error', error);
        closeConnection();
    }
};

main(20, 8);
