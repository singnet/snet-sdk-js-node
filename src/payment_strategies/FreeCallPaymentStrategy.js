import * as grpc from '@grpc/grpc-js';
import { FreeCallStateServiceClient } from '../proto/state_service_grpc_pb';
import FreeCallPaymentStrategy from 'snet-sdk-core/payment_strategies/FreeCallPaymentStrategy';
// import { debug, error } from 'loglevel';

class FreeCallPaymentStrategyNode extends FreeCallPaymentStrategy {
    /**
     * Initializing the free-call payment strategy for web SDK
     * @param {Account} account
     * @param {number} concurrentCalls
     */
    constructor(account, serviceMetadata) {
        super(account, serviceMetadata);
        this._serviceMetadata = serviceMetadata;
        this._freeCallStateServiceClient =
            this._generateFreeCallStateServiceClient();
        this._freeCallStateMethodDescriptor =
            this._generateFreeCallStateMethodDescriptor();
    }

    /**
     * create the grpc client for free call state service
     * @returns {module:grpc.Client}
     * @private
     */
    _generateFreeCallStateServiceClient() {
        const serviceEndpoint = this._serviceMetadata._getServiceEndpoint();
        const grpcCredentials = this._getGrpcCredentials(serviceEndpoint);
        return new FreeCallStateServiceClient(
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
     * generate options for the grpc call for respective protocol
     * @param {{host:String, protocol:String}} serviceEndpoint
     * @returns {*} grpcOptions
     * @private
     */
    _getGrpcCredentials(serviceEndpoint) {
        if (serviceEndpoint.protocol === 'https:') {
            // debug('Channel credential created for https', {
            //     tags: ['gRPC'],
            // });
            return grpc.credentials.createSsl();
        }
        if (serviceEndpoint.protocol === 'http:') {
            // debug('Channel credential created for http', {
            //     tags: ['gRPC'],
            // });
            return grpc.credentials.createInsecure();
        }

        const errorMessage = `Protocol: ${serviceEndpoint.protocol} not supported`;
        // error(errorMessage, { tags: ['gRPC'] });
        throw new Error(errorMessage);
    }
}

export default FreeCallPaymentStrategyNode;
