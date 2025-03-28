const SnetSDK = require('snet-sdk-node');
const service = require('./stubs/training_service_grpc_pb');
const training_pb = require('./stubs/training_pb');
const path = require('node:path');

const config = require('./config');
const DefaultPaymentStrategy = require('snet-sdk-node/dist/payment_strategies/DefaultPaymentStrategy');

const sdk = new SnetSDK.default(config);

const main = async () => {
    const orgId = 'training_org';
    const serviceId = 'training-service';
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
        const serviceClient = await sdk.createServiceClient(serviceMetadataProvider, service.ExampleServiceClient, paymentStrategy);
        const trainingProvider = await sdk.createTrainingProvider(serviceClient)
        const trainingMetadata = await trainingProvider.getTrainingMetadata();
        const grpcServiceName = trainingMetadata.trainingmethodsMap[0][0];
        const grpcServiceMethod = trainingMetadata.trainingmethodsMap[0][1].valuesList[0].stringValue;
        const methodMetadata = await getMethodMetadataByMethod(trainingProvider, grpcServiceMethod, grpcServiceName)

        console.log('getAllModels response: ', await getAllModels(trainingProvider, grpcServiceMethod, grpcServiceName));

        const newModel = await createModel(trainingProvider, grpcServiceMethod, grpcServiceName)
        console.log('createModel response: ', newModel)

        console.log('getModel response: ', await getModel(trainingProvider, newModel.modelId))

        console.log('uploadAndValidate response: ', await uploadAndValidateModel(trainingProvider, methodMetadata, newModel.modelId));

        console.log('getTrainModelPrice response: ', await getTrainModelPrice(trainingProvider, newModel.modelId));

        console.log('trainModel response: ', await trainModel(trainingProvider, newModel.modelId));

        console.log('getValidatePrice response: ', await getValidatePrice(trainingProvider, newModel.modelId))

        console.log('validateModel response: ', await validateModel(trainingProvider, newModel.modelId))

        console.log('getMethodMetadataByModelId response: ', await getMethodMetadataByModelId(trainingProvider, newModel.modelId))

        const sttInput = new service.ExampleServiceService.stt.requestType();
        const modelId = new training_pb.ModelID();
        modelId.setModelId(newModel.modelId);
        sttInput.setModelId(modelId)
        sttInput.setSpeech('0')
        await new Promise((resolve, reject) => {
            serviceClient.service.stt(sttInput, responseHandler(resolve, reject));
        });

        console.log('updateModel response: ', await updateModel(trainingProvider, newModel.modelId));
        console.log('deleteModel response: ', await deleteModel(trainingProvider, newModel.modelId))
    } catch (err) {
        console.error(err);
    } finally {
        closeConnection();
    }
};

main();

const getMethodMetadataByModelId = async (trainingProvider, modelId) => {
    const params = {
        modelId: modelId,
    };
    return await trainingProvider.getMethodMetadata(params);
};

const getValidatePrice = async (trainingProvider, modelId) => {
    const address = await sdk.account.getAddress();
    const params = {
        modelId: modelId, trainingDataLink: 'https://example.com', address: address,
    };
    return await trainingProvider.getValidateModelPrice(params);
};

const validateModel = async (trainingProvider, modelId) => {
    const address = await sdk.account.getAddress();
    const params = {
        modelId: modelId, trainingDataLink: 'https://example.com', address: address,
    };
    return await trainingProvider.validateModel(params);
};

const uploadAndValidateModel = async (trainingProvider, methodMetadata, modelId) => {
    const filepath = path.resolve('./dataset_example.zip');
    const address = await sdk.account.getAddress();
    const params = {
        modelId: modelId, address: address,
    };
    return await trainingProvider.uploadAndValidateModel(params, filepath, methodMetadata);
};

const trainModel = async (trainingProvider, modelId) => {
    const address = await sdk.account.getAddress();
    const params = {
        modelId: modelId, address: address,
    };
    return await trainingProvider.trainModel(params);
};

const getTrainModelPrice = async (trainingProvider, modelId) => {
    const address = await sdk.account.getAddress();
    const params = {
        modelId: modelId, address: address,
    };
    return await trainingProvider.getTrainModelPrice(params);
};

const getModel = async (trainingProvider, modelId) => {
    const address = await sdk.account.getAddress();
    const params = {
        modelId: modelId, address: address,
    };
    return await trainingProvider.getModel(params);
};

const deleteModel = async (trainingProvider, modelId) => {
    const address = await sdk.account.getAddress();
    const params = {
        modelId: modelId, address: address,
    };
    return await trainingProvider.deleteModel(params);
};

const updateModel = async (trainingProvider, modelId) => {
    const address = await sdk.account.getAddress();
    const params = {
        address: address,
        modelId: modelId,
        modelName: 'name updated',
        description: 'description updated',
        addressList: [],
    };

    return await trainingProvider.updateModel(params);
};

const createModel = async (trainingProvider, grpcServiceMethod, grpcServiceName) => {
    const address = await sdk.account.getAddress();
    const params = {
        address: address,
        name: 'name',
        description: 'description',
        isPublic: true,
        addressList: [],
        grpcMethod: grpcServiceMethod,
        serviceName: grpcServiceName,
    };
    return await trainingProvider.createModel(params);
};

const getAllModels = async (trainingProvider, grpcServiceMethod, grpcServiceName) => {
    const address = await sdk.account.getAddress();
    const params = {
        grpcMethod: grpcServiceMethod,
        serviceName: grpcServiceName,
        name: '',
        statuses: [],
        isPublic: false,
        createdByAddress: '',
        pageSize: 100,
        page: 0,
        address: address,
    };
    return await trainingProvider.getAllModels(params);
};


const getMethodMetadataByMethod = async (trainingProvider, grpcServiceMethod, grpcServiceName) => {
    const params = {
        grpcMethod: grpcServiceMethod, serviceName: grpcServiceName,
    };
    return await trainingProvider.getMethodMetadata(params);
};