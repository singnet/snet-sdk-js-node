import TrainingProvider from 'snet-sdk-core/training/TrainingProvider';
import {TrainingModelProvider} from '../ModelsProvider';
import PaidCallPaymentStrategyNode from '../paymentStrategies/PaidCallPaymentStrategy';
import * as grpc from '@grpc/grpc-js';

class TrainingProviderNode extends TrainingProvider {
    /**
     * Initializing the training provider
     * @param {Account} account
     * @param {URL} serviceEndpoint
     * @param {ServiceClient} serviceClient
     */
    constructor(account, serviceEndpoint, serviceClient) {
        super(account, serviceEndpoint);
        this.serviceClient = serviceClient;
        this.TrainingModelProvider = new TrainingModelProvider();
        const grpcCredentials = this.serviceClient._getGrpcCredentials(serviceEndpoint);
        this._modelServiceClient =
            this.TrainingModelProvider?._generateModelServiceClient(
                serviceEndpoint, grpcCredentials
            );
    }

    async _generateTrainingPaymentMetadata(modelId, amount) {
        let metadata = new grpc.Metadata();
        const paidCallPaymentStrategy = new PaidCallPaymentStrategyNode(this.account, this.serviceClient.metadataProvider);
        const paymentMetadata = await paidCallPaymentStrategy.getTrainingPaymentMetadata(modelId, amount);
        return this.serviceClient._enhanceMetadataDefault(metadata, paymentMetadata);
    }
}

export default TrainingProviderNode;