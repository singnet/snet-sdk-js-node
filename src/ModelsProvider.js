import { PaymentChannelStateServiceClient } from './proto/state_service_grpc_pb';
import { logMessage } from 'snet-sdk-core/utils/logger';
import { DaemonClient, DaemonService } from "./proto/training_daemon_grpc_pb";
import training_daemon_pb from "./proto/training_daemon_pb";
import training_pb from "./proto/training_pb";

export class ChannelModelProvider {
    /**
     * @param {URL} serviceEndpoint
     * @param grpcChannelCredentials
     */
    constructor(serviceEndpoint, grpcChannelCredentials) {
        this.serviceEndpoint = serviceEndpoint;
        this.grpcChannelCredentials = grpcChannelCredentials;
    }

    /**
     * @returns {PaymentChannelStateServiceClient}
     */
    generatePaymentChannelStateServiceClient() {
        logMessage('debug', 'ChannelModelProvider', 'Creating PaymentChannelStateService client');
        logMessage('debug', 'ChannelModelProvider', `PaymentChannelStateService pointing to ${serviceEndpoint.host}, `);
        return new PaymentChannelStateServiceClient(
            this.serviceEndpoint.host,
            this.grpcChannelCredentials
        );
    }

    /**
     * @return {MethodDescriptor}
     */
    getChannelStateRequestMethodDescriptor() {
        const paymentChannelStateServiceClient =
            this.generatePaymentChannelStateServiceClient();
        return paymentChannelStateServiceClient.getChannelState.requestType;
    }
}

export class TrainingModelProvider {
    /**
     * @param {URL} serviceEndpoint
     * @param grpcCredentials
     * @returns {DaemonClient}
     */
    _generateModelServiceClient(serviceEndpoint, grpcCredentials) {
        debug(
            `TrainingChannelStateService pointing to ${serviceEndpoint.host}, `,
            {
                tags: ['gRPC'],
            }
        );
        const host = serviceEndpoint.host;
        if (!host) {
            throw new Error('host is undefined');
        }
        return new DaemonClient(host, grpcCredentials);
    }

    /**
     * @return {MethodDescriptor}
     */
    _getAllModelsRequestMethodDescriptor() {
        return DaemonService.get_all_models.requestType;
    };

    /**
     * @return {MethodDescriptor}
     */
    _getTrainingMetadataRequestMethodDescriptor() {
        return DaemonService.get_training_metadata.requestType;
    };

    /**
     * @return {MethodDescriptor}
     */
    _getMethodMetadataRequestMethodDescriptor() {
        return DaemonService.get_method_metadata.requestType;
    };

    /**
     * @return {MethodDescriptor}
     */
    _getCreateModelRequestMethodDescriptor() {
        return DaemonService.create_model.requestType;
    };

    /**
     * @return {MethodDescriptor}
     */
    _getDeleteModelRequestMethodDescriptor() {
        return DaemonService.delete_model.requestType;
    };

    /**
     * @return {MethodDescriptor}
     */
    _getUpdateModelRequestMethodDescriptor() {
        return DaemonService.update_model.requestType;
    };

    /**
     * @return {MethodDescriptor}
     */
    _getValidateModelPriceRequestMethodDescriptor() {
        return DaemonService.validate_model_price.requestType;
    };

    /**
     * @return {MethodDescriptor}
     */
    _getTrainModelPriceRequestMethodDescriptor() {
        return DaemonService.train_model_price.requestType;
    };

    /**
     * @return {MethodDescriptor}
     */
    _getTrainModelRequestMethodDescriptor() {
        return DaemonService.train_model.requestType;
    };

    /**
     * @return {MethodDescriptor}
     */
    _getValidateModelRequestMethodDescriptor() {
        return DaemonService.validate_model.requestType;
    };

    /**
     * @return {MethodDescriptor}
     */
    _getUploadAndValidateModelRequestMethodDescriptor() {
        return DaemonService.upload_and_validate.requestType;
    };

    /**
     * @return {MethodDescriptor}
     */
    _getModelStatusRequestMethodDescriptor() {
        return DaemonService.get_model.requestType;
    };

    /**
     * @return {MethodDescriptor}
     */
    _getNewModelRequestMethodDescriptor() {
        return training_pb.NewModel;
    };

    /**
     * @return {MethodDescriptor}
     */
    _getAuthorizationRequestMethodDescriptor() {
        return training_daemon_pb.AuthorizationDetails;
    };

    /**
     * @return {MethodDescriptor}
     */
    _getUploadInputMethodDescriptor() {
        return training_daemon_pb.UploadInput;
    };
}
