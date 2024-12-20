import SnetSDK from 'snet-sdk-core';
import PrivateKeyIdentity from './identities/PrivateKeyIdentity';
import ServiceClient from './ServiceClient';
import ServiceMetadataProviderNode from './ServiceMetadataProvider';
import { DefaultPaymentStrategy } from './payment_strategies';

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
        if (isEmpty(metadataProvider) || typeof metadataProvider === 'string') {
            return new Error('metadata provider is empty');
        }
        let paymentStrategy = paymentChannelManagementStrategy;
        if (isEmpty(paymentStrategy)) {
            paymentStrategy = this._constructStrategy();
        }

        const serviceClient = new ServiceClient(
            serviceMetadataProvider,
            ServiceStub,
            paymentStrategy
        );
        return serviceClient;
    }

    /**
     * @param {string} orgId
     * @param {string} serviceId
     * @param {string} [groupName]
     * @param {ServiceClientOptions} options
     * @returns {Promise<ServiceMetadataProviderWeb>}
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

    // /**
    //  * @param {URL} serviceEndpoint
    //  * @returns {TrainingProviderWeb}
    //  */
    // createTrainingProvider(serviceEndpoint) {
    //     return new TrainingProviderWeb(this.account, serviceEndpoint);
    // }
}

export default NodeSdk;
