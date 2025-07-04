import PrepaidPaymentStrategy from 'snet-sdk-core/paymentStrategies/PrepaidPaymentStrategy';
import { PrepaidMetadataGenerator } from 'snet-sdk-core/utils/metadataUtils';

class PrepaidPaymentStrategyNode extends PrepaidPaymentStrategy {
    /**
     * @param {Account} account
     * @param {ServiceMetadataProvider} serviceMetadata
     * @param {number} blockOffset
     * @param {number} callAllowance
     */
    constructor(
        account,
        serviceMetadata,
        blockOffset = 240,
        callAllowance = 1
    ) {
        super(account, serviceMetadata, blockOffset, callAllowance);
        this.metadataGenerator = new PrepaidMetadataGenerator();
    }

    /**
     * @returns {Promise<[{'snet-payment-type': string}, {'snet-payment-channel-id': string}, {'snet-payment-channel-nonce': string}, {'snet-prepaid-auth-token-bin': *}]>}
     */
    async getPaymentMetadata() {
        const metadataFields = await super.getPaymentMetadata();
        return this.metadataGenerator.generateMetadata(metadataFields);
    }
}

export default PrepaidPaymentStrategyNode;
