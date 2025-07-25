import * as grpc from '@grpc/grpc-js';
import { URL } from 'url';
import { logMessage } from 'snet-sdk-core/utils/logger';

class ServiceClient {
    /**
     * @param {ServiceMetadataProvider} metadataProvider
     * @param {GRPCClient} ServiceStub - GRPC service client constructor
     * @param {DefaultPaymentChannelManagementStrategy} paymentChannelManagementStrategy
     */
    constructor(
        metadataProvider,
        ServiceStub,
        paymentChannelManagementStrategy
    ) {
        this.metadataProvider = metadataProvider;
        this._paymentChannelManagementStrategy =
            paymentChannelManagementStrategy;
        this._grpcService = this._constructGrpcService(ServiceStub);
    }

    /**
     * @type {GRPCClient}
     */
    get service() {
        return this._grpcService;
    }

    _constructGrpcService(ServiceStub) {
        logMessage('debug', 'ServiceClient', 'Creating service client');
        const serviceEndpoint = this._getServiceEndpoint();
        const grpcChannelCredentials =
            this._getGrpcChannelCredentials(serviceEndpoint);
        const grpcOptions = this._generateGrpcOptions();
        logMessage('debug', 'ServiceClient', `Service pointing to ${serviceEndpoint.host}, `);

        return new ServiceStub(
            serviceEndpoint.host,
            grpcChannelCredentials,
            grpcOptions
        );
    }

    _generateGrpcOptions() {
        if (this.metadataProvider._options.disableBlockchainOperations) {
            return {};
        }

        return {
            interceptors: [this._generateInterceptor()],
        };
    }

    _generateInterceptor() {
        return (options, nextCall) => {
            const requester = {
                start: async (metadata, listener, next) => {
                    if (!this._paymentChannelManagementStrategy) {
                        next(metadata, listener);
                        return;
                    }
                    const paymentMetadata = await this.metadataProvider.fetchPaymentMetadata(this._paymentChannelManagementStrategy);

                    paymentMetadata.forEach(paymentMeta => {
                        Object.entries(paymentMeta).forEach(([key, value]) => {
                            // Convert `-bin` keys to Buffer
                            if (key.endsWith('-bin') && typeof value === 'string') {
                                metadata.add(key, Buffer.from(value, 'base64')); // Assuming base64-encoded value
                            } else {
                                metadata.add(key, value);
                            }
                        });
                    });

                    next(metadata, listener);
                }
            };
            return new grpc.InterceptingCall(nextCall(options), requester);
        };
    }

    _getGrpcChannelCredentials(serviceEndpoint) {
        if (serviceEndpoint.protocol === 'https:') {
            logMessage('debug', 'ServiceClient', 'Channel credential created for https');
            return grpc.credentials.createSsl();
        }

        if (serviceEndpoint.protocol === 'http:') {
            logMessage('debug', 'ServiceClient', 'Channel credential created for http');
            return grpc.credentials.createInsecure();
        }

        const errorMessage = `Protocol: ${serviceEndpoint.protocol} not supported`;
        logMessage('error', 'ServiceClient', errorMessage);
        throw new Error(errorMessage);
    }

    async getConcurrencyTokenAndChannelId() {
        return this._paymentChannelManagementStrategy.getConcurrencyTokenAndChannelId(
            this.metadataProvider
        );
    }

    setConcurrencyTokenAndChannelId(token, channelId) {
        this.metadataProvider.concurrencyManager.token = token;
        this._paymentChannelManagementStrategy.channelId = channelId;
    }

    _getServiceEndpoint() {
        return new URL(this.metadataProvider.group.endpoints[0]);
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

    _enhanceMetadataDefault(metadata, paymentMetadata) {
        paymentMetadata.forEach((paymentMeta) => {
            Object.entries(paymentMeta).forEach(([key, value]) => {
                if (key.endsWith('-bin') && typeof value === 'string') {
                    metadata.add(key, Buffer.from(value, 'base64'));
                } else {
                    metadata.add(key, String(value));
                }
            });
        });

        metadata.add(
            "snet-payment-mpe-address",
            this.metadataProvider._mpeContract.address
        );
        return metadata;
    }
}

export default ServiceClient;
