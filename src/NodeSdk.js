import SnetSDK from 'snet-sdk-core/dist';
import PrivateKeyIdentity from './identities/PrivateKeyIdentity';
import ServiceClient from './ServiceClient';
import ServiceMetadataProviderNode from './ServiceMetadataProvider';
import {DefaultPaymentStrategy} from './payment_strategies';
import TrainingProviderNode from './training/TrainingProvider';
import {isEmpty} from 'lodash';

class NodeSdk extends SnetSDK {
    /**
     * @param {Config} config
     * @param {IPFSMetadataProvider} metadataProvider
     */
    constructor(config, metadataProvider) {
        super(config, metadataProvider);
    }

    async createServiceClient(
        serviceMetadataProvider,
        ServiceStub,
        paymentChannelManagementStrategy
    ) {
        if (isEmpty(this._metadataProvider) || typeof this._metadataProvider === 'string') {
            return new Error('metadata provider is empty');
        }
        let paymentStrategy = paymentChannelManagementStrategy;
        if (isEmpty(paymentStrategy)) {
            paymentStrategy = this._constructStrategy();
        }

        return new ServiceClient(
            serviceMetadataProvider,
            ServiceStub,
            paymentStrategy
        );
    }

    /**
     * @param {string} orgId
     * @param {string} serviceId
     * @param {string} [groupName]
     * @param {ServiceClientOptions} options
     * @returns {Promise<ServiceMetadataProviderNode>}
     */
    async createServiceMetadataProvider(
        orgId,
        serviceId,
        groupName = null,
        options = {}
    ) {
        const serviceMetadata = await this._metadataProvider.metadata(
            orgId,
            serviceId
        );
        const group = await this._serviceGroup(
            serviceMetadata,
            orgId,
            serviceId,
            groupName
        );

        return new ServiceMetadataProviderNode(
            this.account,
            orgId,
            serviceId,
            serviceMetadata,
            this._mpeContract,
            group,
            options
        );
    }

    _createIdentity() {
        return new PrivateKeyIdentity(this._config, this._web3);
    }

    /**
     * @param {number} concurrentCalls
     * @returns {DefaultPaymentStrategy}
     * @private
     */
    _constructStrategy(concurrentCalls = 1) {
        return new DefaultPaymentStrategy(this._account, concurrentCalls);
    }

    /**
     * @param {ServiceClient} serviceClient
     * @returns {TrainingProviderNode}
     */
    createTrainingProvider(serviceClient) {
        const serviceEndpoint = serviceClient._getServiceEndpoint()
        return new TrainingProviderNode(this.account, serviceEndpoint, serviceClient);
    }
}

export default NodeSdk;
