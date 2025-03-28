import ServiceMetadataProvider from 'snet-sdk-core/dist/ServiceMetadataProvider';
import ConcurrencyManager from './ConcurrencyManager';
import { ChannelModelProvider } from './ModelsProvider';
import {debug, error} from "loglevel";
import * as grpc from "@grpc/grpc-js";

class ServiceMetadataProviderNode extends ServiceMetadataProvider {
    /**
     * @param {Account} account
     * @param {String} orgId
     * @param {String} serviceId
     * @param {ServiceMetadata} metadata
     * @param {MPEContract} mpeContract
     * @param {Group} group
     * @param {ServiceClientOptions} [options={}]
     */
    constructor(
        account,
        orgId,
        serviceId,
        metadata,
        mpeContract,
        group,
        options = {}
    ) {
        super(orgId, serviceId, metadata, mpeContract, group, options);
        this.account = account;
    }

    get concurrencyManager() {
        return new ConcurrencyManager(
            this.account,
            this,
            this._concurrentCalls
        );
    }

    get ChannelModelProvider() {
        const serviceEndpoint = this._getServiceEndpoint();
        const grpcCredentials = this._getGrpcCredentials(serviceEndpoint);
        return new ChannelModelProvider(serviceEndpoint, grpcCredentials);
    }

    _getGrpcCredentials(serviceEndpoint) {
        if (serviceEndpoint.protocol === 'https:') {
            debug('Channel credential created for https', { tags: ['gRPC'] });
            return grpc.credentials.createSsl();
        }
        if (serviceEndpoint.protocol === 'http:') {
            debug('Channel credential created for http', { tags: ['gRPC'] });
            return grpc.credentials.createInsecure();
        }

        const errorMessage = `Protocol: ${serviceEndpoint.protocol} not supported`;
        error(errorMessage, { tags: ['gRPC'] });
        throw new Error(errorMessage);
    }
}

export default ServiceMetadataProviderNode;
