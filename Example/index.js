import SnetSDK from "snet-sdk-node";
import {createRequire} from 'module';
const require = createRequire(import.meta.url);
const service = require('./stubs/example_service_grpc_pb.cjs')
const messages = require('./stubs/example_service_pb.cjs')
import config from "./config.js";
import DefaultPaymentStrategy from "snet-sdk-node/dist/paymentStrategies/DefaultPaymentStrategy.js";

const sdk = new SnetSDK.default(config);
const numbers = new messages.Numbers();

const main = async () => {
    const orgId = "26072b8b6a0e448180f8c0e702ab6d2f";
    const serviceId = "Exampleservice";
    const groupName = "default_group";

    const opts = {
        disableBlockchainOperations: false,
        concurrency: false
    };

    numbers.setA(Math.floor(Math.random() * 10) + 1);
    numbers.setB(Math.floor(Math.random() * 10) + 1);

    const closeConnection = () => {
        sdk.web3.currentProvider.connection && sdk.web3.currentProvider.connection.close();
    };

    const responseHandler = (resolve, reject) => (err, result) => {
        if (err) {
            console.log("GRPC call failed");
            console.error(err);
            closeConnection();
            reject(err);
        } else {
            console.log("Result:", result.getValue());
            console.log("<---------->");
            resolve(result);
        }
    };
    try {
        const serviceMetadataProvider = await sdk.createServiceMetadataProvider(orgId, serviceId, groupName, opts);
        const paymentStrategy = new DefaultPaymentStrategy.default(serviceMetadataProvider.account, 0);
        const serviceClient = await sdk.createServiceClient(serviceMetadataProvider, service.CalculatorClient, paymentStrategy);

        await new Promise((resolve, reject) => {
            serviceClient.service.mul(numbers, responseHandler(resolve, reject));
        });

        closeConnection();
    } catch (error) {
        console.log("promise error", error);
        closeConnection();
    }
};

main();