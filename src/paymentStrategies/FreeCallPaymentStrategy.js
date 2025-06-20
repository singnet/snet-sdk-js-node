import * as grpc from '@grpc/grpc-js';
import services, {
    FreeCallStateServiceService,
} from '../proto/state_service_grpc_pb';
import FreeCallPaymentStrategy from 'snet-sdk-core/paymentStrategies/FreeCallPaymentStrategy';
import { logMessage } from 'snet-sdk-core/utils/logger';

class FreeCallPaymentStrategyNode extends FreeCallPaymentStrategy {
    /**
     * Initializing the free-call payment strategy for web SDK
     * @param {Account} account
     * @param {number} concurrentCalls
     * @param {serviceMetadata} serviceMetadata
     */
    constructor(account, serviceMetadata) {
        super(account, serviceMetadata);
        // this._serviceMetadata = serviceMetadata;
        this._freeCallStateServiceClient =
            this._generateFreeCallStateServiceClient();
        this._freeCallStateMethodDescriptor =
            this._generateFreeCallStateMethodDescriptor();
        this._freeCallTokenMethodDescriptor =
            this._generateFreeCallTokenMethodDescriptor();
    }

    /**
     * create the grpc client for free call state service
     * @returns {module:grpc.Client}
     * @private
     */
    _generateFreeCallStateServiceClient() {
        const serviceEndpoint = this._serviceMetadata._getServiceEndpoint();
        const grpcCredentials = this._getGrpcCredentials(serviceEndpoint);
        return new services.FreeCallStateServiceClient(
            serviceEndpoint.host,
            grpcCredentials
        );
    }

    /**
     * @returns {MethodDescriptor}
     * @private
     */
    _generateFreeCallStateMethodDescriptor() {
        return FreeCallStateServiceService.getFreeCallsAvailable;
    }

    /**
     * @returns {MethodDescriptor}
     * @private
     */
    _generateFreeCallTokenMethodDescriptor() {
        return FreeCallStateServiceService.getFreeCallToken;
    }

    /**
     * generate options for the grpc call for respective protocol
     * @param {{host:String, protocol:String}} serviceEndpoint
     * @returns {*} grpcOptions
     * @private
     */
    _getGrpcCredentials(serviceEndpoint) {
        if (serviceEndpoint.protocol === 'https:') {
            logMessage('debug', 'FreeCallPaymentStrategyNode', 'Channel credential created for https');
            return grpc.credentials.createSsl();
        }
        if (serviceEndpoint.protocol === 'http:') {
            logMessage('debug', 'FreeCallPaymentStrategyNode', 'Channel credential created for http');
            return grpc.credentials.createInsecure();
        }

        const errorMessage = `Protocol: ${serviceEndpoint.protocol} not supported`;
        logMessage('error', 'FreeCallPaymentStrategyNode', errorMessage);
        throw new Error(errorMessage);
    }
}

export default FreeCallPaymentStrategyNode;
