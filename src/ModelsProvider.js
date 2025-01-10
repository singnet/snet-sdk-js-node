import { PaymentChannelStateServiceClient } from './proto/state_service_grpc_pb';
// import { debug } from 'loglevel';

export class ChannelModelProvider {
    /**
     * @param {string} serviceEndpoint
     */
    constructor(serviceEndpoint, grpcChannelCredentials) {
        this.serviceEndpoint = serviceEndpoint;
        this.grpcChannelCredentials = grpcChannelCredentials;
    }

    /**
     * @returns {PaymentChannelStateServiceClient}
     */
    generatePaymentChannelStateServiceClient() {
        // debug('Creating PaymentChannelStateService client', {
        //     tags: ['gRPC'],
        // });
        // debug(
        //     `PaymentChannelStateService pointing to ${serviceEndpoint.host}, `,
        //     { tags: ['gRPC'] }
        // );
        return new PaymentChannelStateServiceClient(
            serviceEndpoint.host,
            grpcChannelCredentials
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

// TODO: add training and pricing proto and pb files
// export class TrainingModelProvider {
//     /**
//      * @param {string} serviceEndpoin
//      * @returns {PaymentChannelStateServiceClient}
//      */
//     _generateModelServiceClient(serviceEndpoint) {
//         debug(
//             `TrainingChannelStateService pointing to ${serviceEndpoint.origin}, `,
//             {
//                 tags: ['gRPC'],
//             }
//         );
//         const host = serviceEndpoint.origin;
//         if (!host) {
//             throw new Error('host is undefined');
//         }
//         return new ModelClient(host);
//     }

//     /**
//      * @return {MethodDescriptor}
//      */
//     _getModelRequestMethodDescriptor() {
//         return Model.get_all_models.requestType;
//     }

//     /**
//      * @return {MethodDescriptor}
//      */
//     _getAuthorizationRequestMethodDescriptor() {
//         return training_pb.AuthorizationDetails;
//     }

//     /**
//      * @return {MethodDescriptor}
//      */
//     _getCreateModelRequestMethodDescriptor() {
//         return Model.create_model.requestType;
//     }

//     /**
//      * @return {MethodDescriptor}
//      */
//     _getDeleteModelRequestMethodDescriptor() {
//         return Model.delete_model.requestType;
//     }

//     /**
//      * @return {MethodDescriptor}
//      */
//     _getUpdateModelRequestMethodDescriptor() {
//         return Model.update_model_access.requestType;
//     }

//     /**
//      * @return {MethodDescriptor}
//      */
//     _getModelDetailsRequestMethodDescriptor() {
//         return training_pb.ModelDetails;
//     }
// }
