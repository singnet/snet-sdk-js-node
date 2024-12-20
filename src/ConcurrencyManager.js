import * as grpc from '@grpc/grpc-js';
// import { logger } from './core';
import { TokenServiceClient } from './proto/token_service_grpc_pb';
import { toBNString } from 'snet-sdk-core/utils/bignumber_helper';
import { debug, error } from 'loglevel';

class ConcurrencyManager {
    /**
     * @param {Account} account
     * @param {ServiceMetadataProvider} serviceMetadata
     * @param {number} concurrentCalls
     */
    constructor(account, serviceMetadata, concurrentCalls = 1) {
        this._account = account;
        this._concurrentCalls = concurrentCalls;
        this._serviceMetadata = serviceMetadata;
        this._tokenServiceClient = this._generateTokenServiceClient();
        this._token = '';
        this._usedAmount = 0;
        this._plannedAmount = 0;
    }

    get concurrentCalls() {
        return this._concurrentCalls;
    }

    set token(value) {
        this._token = value;
    }

    async getToken(channel, serviceCallPrice) {
        if (this._token) {
            return this._token;
        }
        const currentSignedAmount =
            channel.state.currentSignedAmount.toNumber();
        if (currentSignedAmount !== 0) {
            const { plannedAmount, usedAmount, token } =
                await this._getTokenForAmount(channel, currentSignedAmount);
            if (usedAmount < plannedAmount) {
                return token;
            }
        }
        const newAmountToBeSigned = currentSignedAmount + serviceCallPrice;
        return this._getNewToken(channel, newAmountToBeSigned);
    }

    /**
     * @param {ServiceClient} serviceClient
     * @param {PaymentChannel} channel
     * @param {number} amount
     * @returns {Promise<string | undefined>} token
     * @private
     */
    async _getNewToken(channel, amount) {
        const tokenResponse = await this._getTokenForAmount(channel, amount);
        const { token } = tokenResponse;
        return token;
    }

    async _getTokenServiceRequest(channel, amount) {
        const { nonce } = channel.state;
        const currentBlockNumber = await this._account.getCurrentBlockNumber();

        const mpeSignature = await this._generateMpeSignature(
            parseInt(channel.channelId, 10),
            parseInt(nonce, 10),
            amount
        );
        const tokenSignature = await this._generateTokenSignature(
            mpeSignature,
            currentBlockNumber
        );
        const Request = this._tokenServiceClient.getToken.requestType;
        const request = new Request();

        request.setChannelId(parseInt(channel.channelId, 10));
        request.setCurrentNonce(parseInt(nonce, 10));
        request.setSignedAmount(amount);
        request.setSignature(tokenSignature);
        request.setCurrentBlock(toBNString(currentBlockNumber));
        request.setClaimSignature(mpeSignature);
        return request;
    }

    /**
     * Get token for the given amount
     * @param {ServiceClient} serviceClient
     * @param {PaymentChannel} channel
     * @param {number} amount
     * @returns {Promise<string>} token
     * @private
     */
    async _getTokenForAmount(channel, amount) {
        const request = await this._getTokenServiceRequest(channel, amount);
        return new Promise((resolve, reject) => {
            this._tokenServiceClient.getToken(
                request,
                (error, responseMessage) => {
                    if (error) {
                        console.log('token grpc error', error);
                        reject(error);
                    } else {
                        this._plannedAmount =
                            responseMessage.getPlannedAmount();
                        this._usedAmount = responseMessage.getUsedAmount();
                        this._token = responseMessage.getToken();
                        resolve({
                            plannedAmount: this._plannedAmount,
                            usedAmount: this._usedAmount,
                            token: this._token,
                        });
                    }
                }
            );
        });
    }

    async _generateTokenSignature(mpeSignature, currentBlockNumber) {
        const mpeSignatureHex = mpeSignature.toString('hex');
        return this._account.signData(
            { t: 'bytes', v: mpeSignatureHex },
            { t: 'uint256', v: currentBlockNumber }
        );
    }

    async _generateMpeSignature(channelId, nonce, signedAmount) {
        return this._account.signData(
            { t: 'string', v: '__MPE_claim_message' },
            { t: 'address', v: this._serviceMetadata.mpeContract.address },
            { t: 'uint256', v: channelId },
            { t: 'uint256', v: nonce },
            { t: 'uint256', v: signedAmount }
        );
    }

    /**
     * Generate Token service client
     * @returns {TokenServiceClient}
     */
    _generateTokenServiceClient() {
        const serviceEndpoint = this._serviceMetadata._getServiceEndpoint();
        const grpcCredentials = this._getGrpcCredentials(serviceEndpoint);
        return new TokenServiceClient(serviceEndpoint.host, grpcCredentials);
    }

    /**
     * generate options for the grpc call for respective protocol
     * @param {{host:String, protocol:String}} serviceEndpoint
     * @returns {*} grpcOptions
     * @private
     */
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

export default ConcurrencyManager;
