import DefaultPaymentStrategy from 'snet-sdk-core/paymentStrategies/DefaultPaymentStrategy';
import { FreeCallPaymentStrategy, PaidCallPaymentStrategy, PrepaidPaymentStrategy } from "./index";

class DefaultPaymentStrategyNode extends DefaultPaymentStrategy {
    /**
     * Initializing the payment strategy for web SDK
     * @param {Account} account
     * @param {number} concurrentCalls
     */
    constructor(account, concurrentCalls) {
        super(account, concurrentCalls);
        this._account = account;
        this._concurrentCalls = concurrentCalls;
    }

    /**
     * Get the metadata for the gRPC call with the choice of the default payment strategy
     * @param {ServiceMetadataProviderNode} serviceMetadata
     * @returns {Promise<({'snet-payment-type': string}|{'snet-payment-channel-id': string}|{'snet-payment-channel-nonce': string}|{'snet-payment-channel-amount': string}|{'snet-payment-channel-signature-bin': string.base64})[]>}
     */
    async getPaymentMetadata(serviceMetadata) {
        const freeCallPaymentStrategy = new FreeCallPaymentStrategy(this._account, serviceMetadata);
        const isFreeCallsAvailable = await freeCallPaymentStrategy.isFreeCallAvailable();
        let paymentStrategy;

        if (isFreeCallsAvailable) {
            paymentStrategy = freeCallPaymentStrategy;
        } else if (serviceMetadata.concurrencyFlag) {
            paymentStrategy = new PrepaidPaymentStrategy(this._account, serviceMetadata);
        } else {
            paymentStrategy = new PaidCallPaymentStrategy(this._account, serviceMetadata);
        }
        return await paymentStrategy.getPaymentMetadata();
    }
}

export default DefaultPaymentStrategyNode;
