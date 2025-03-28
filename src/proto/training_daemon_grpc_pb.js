// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var training_daemon_pb = require('./training_daemon_pb.js');
var google_protobuf_descriptor_pb = require('google-protobuf/google/protobuf/descriptor_pb.js');
var google_protobuf_struct_pb = require('google-protobuf/google/protobuf/struct_pb.js');
var training_pb = require('./training_pb.js');
var google_protobuf_empty_pb = require('google-protobuf/google/protobuf/empty_pb.js');

function serialize_google_protobuf_Empty(arg) {
  if (!(arg instanceof google_protobuf_empty_pb.Empty)) {
    throw new Error('Expected argument of type google.protobuf.Empty');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_google_protobuf_Empty(buffer_arg) {
  return google_protobuf_empty_pb.Empty.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_training_AllModelsRequest(arg) {
  if (!(arg instanceof training_daemon_pb.AllModelsRequest)) {
    throw new Error('Expected argument of type training.AllModelsRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_training_AllModelsRequest(buffer_arg) {
  return training_daemon_pb.AllModelsRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_training_AuthValidateRequest(arg) {
  if (!(arg instanceof training_daemon_pb.AuthValidateRequest)) {
    throw new Error('Expected argument of type training.AuthValidateRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_training_AuthValidateRequest(buffer_arg) {
  return training_daemon_pb.AuthValidateRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_training_CommonRequest(arg) {
  if (!(arg instanceof training_daemon_pb.CommonRequest)) {
    throw new Error('Expected argument of type training.CommonRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_training_CommonRequest(buffer_arg) {
  return training_daemon_pb.CommonRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_training_MethodMetadata(arg) {
  if (!(arg instanceof training_daemon_pb.MethodMetadata)) {
    throw new Error('Expected argument of type training.MethodMetadata');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_training_MethodMetadata(buffer_arg) {
  return training_daemon_pb.MethodMetadata.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_training_MethodMetadataRequest(arg) {
  if (!(arg instanceof training_daemon_pb.MethodMetadataRequest)) {
    throw new Error('Expected argument of type training.MethodMetadataRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_training_MethodMetadataRequest(buffer_arg) {
  return training_daemon_pb.MethodMetadataRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_training_ModelResponse(arg) {
  if (!(arg instanceof training_pb.ModelResponse)) {
    throw new Error('Expected argument of type training.ModelResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_training_ModelResponse(buffer_arg) {
  return training_pb.ModelResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_training_ModelsResponse(arg) {
  if (!(arg instanceof training_daemon_pb.ModelsResponse)) {
    throw new Error('Expected argument of type training.ModelsResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_training_ModelsResponse(buffer_arg) {
  return training_daemon_pb.ModelsResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_training_NewModelRequest(arg) {
  if (!(arg instanceof training_daemon_pb.NewModelRequest)) {
    throw new Error('Expected argument of type training.NewModelRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_training_NewModelRequest(buffer_arg) {
  return training_daemon_pb.NewModelRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_training_PriceInBaseUnit(arg) {
  if (!(arg instanceof training_pb.PriceInBaseUnit)) {
    throw new Error('Expected argument of type training.PriceInBaseUnit');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_training_PriceInBaseUnit(buffer_arg) {
  return training_pb.PriceInBaseUnit.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_training_StatusResponse(arg) {
  if (!(arg instanceof training_pb.StatusResponse)) {
    throw new Error('Expected argument of type training.StatusResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_training_StatusResponse(buffer_arg) {
  return training_pb.StatusResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_training_TrainingMetadata(arg) {
  if (!(arg instanceof training_daemon_pb.TrainingMetadata)) {
    throw new Error('Expected argument of type training.TrainingMetadata');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_training_TrainingMetadata(buffer_arg) {
  return training_daemon_pb.TrainingMetadata.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_training_UpdateModelRequest(arg) {
  if (!(arg instanceof training_daemon_pb.UpdateModelRequest)) {
    throw new Error('Expected argument of type training.UpdateModelRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_training_UpdateModelRequest(buffer_arg) {
  return training_daemon_pb.UpdateModelRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_training_UploadAndValidateRequest(arg) {
  if (!(arg instanceof training_daemon_pb.UploadAndValidateRequest)) {
    throw new Error('Expected argument of type training.UploadAndValidateRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_training_UploadAndValidateRequest(buffer_arg) {
  return training_daemon_pb.UploadAndValidateRequest.deserializeBinary(new Uint8Array(buffer_arg));
}


// These methods are implemented only by the daemon; the service provider should ignore them
var DaemonService = exports.DaemonService = {
  // Free
create_model: {
    path: '/training.Daemon/create_model',
    requestStream: false,
    responseStream: false,
    requestType: training_daemon_pb.NewModelRequest,
    responseType: training_pb.ModelResponse,
    requestSerialize: serialize_training_NewModelRequest,
    requestDeserialize: deserialize_training_NewModelRequest,
    responseSerialize: serialize_training_ModelResponse,
    responseDeserialize: deserialize_training_ModelResponse,
  },
  // Free
validate_model_price: {
    path: '/training.Daemon/validate_model_price',
    requestStream: false,
    responseStream: false,
    requestType: training_daemon_pb.AuthValidateRequest,
    responseType: training_pb.PriceInBaseUnit,
    requestSerialize: serialize_training_AuthValidateRequest,
    requestDeserialize: deserialize_training_AuthValidateRequest,
    responseSerialize: serialize_training_PriceInBaseUnit,
    responseDeserialize: deserialize_training_PriceInBaseUnit,
  },
  // Paid
upload_and_validate: {
    path: '/training.Daemon/upload_and_validate',
    requestStream: true,
    responseStream: false,
    requestType: training_daemon_pb.UploadAndValidateRequest,
    responseType: training_pb.StatusResponse,
    requestSerialize: serialize_training_UploadAndValidateRequest,
    requestDeserialize: deserialize_training_UploadAndValidateRequest,
    responseSerialize: serialize_training_StatusResponse,
    responseDeserialize: deserialize_training_StatusResponse,
  },
  // Paid
validate_model: {
    path: '/training.Daemon/validate_model',
    requestStream: false,
    responseStream: false,
    requestType: training_daemon_pb.AuthValidateRequest,
    responseType: training_pb.StatusResponse,
    requestSerialize: serialize_training_AuthValidateRequest,
    requestDeserialize: deserialize_training_AuthValidateRequest,
    responseSerialize: serialize_training_StatusResponse,
    responseDeserialize: deserialize_training_StatusResponse,
  },
  // Free, one signature for both train_model_price & train_model methods
train_model_price: {
    path: '/training.Daemon/train_model_price',
    requestStream: false,
    responseStream: false,
    requestType: training_daemon_pb.CommonRequest,
    responseType: training_pb.PriceInBaseUnit,
    requestSerialize: serialize_training_CommonRequest,
    requestDeserialize: deserialize_training_CommonRequest,
    responseSerialize: serialize_training_PriceInBaseUnit,
    responseDeserialize: deserialize_training_PriceInBaseUnit,
  },
  // Paid
train_model: {
    path: '/training.Daemon/train_model',
    requestStream: false,
    responseStream: false,
    requestType: training_daemon_pb.CommonRequest,
    responseType: training_pb.StatusResponse,
    requestSerialize: serialize_training_CommonRequest,
    requestDeserialize: deserialize_training_CommonRequest,
    responseSerialize: serialize_training_StatusResponse,
    responseDeserialize: deserialize_training_StatusResponse,
  },
  // Free
// After deleting the model, the status becomes DELETED in etcd
delete_model: {
    path: '/training.Daemon/delete_model',
    requestStream: false,
    responseStream: false,
    requestType: training_daemon_pb.CommonRequest,
    responseType: training_pb.StatusResponse,
    requestSerialize: serialize_training_CommonRequest,
    requestDeserialize: deserialize_training_CommonRequest,
    responseSerialize: serialize_training_StatusResponse,
    responseDeserialize: deserialize_training_StatusResponse,
  },
  get_all_models: {
    path: '/training.Daemon/get_all_models',
    requestStream: false,
    responseStream: false,
    requestType: training_daemon_pb.AllModelsRequest,
    responseType: training_daemon_pb.ModelsResponse,
    requestSerialize: serialize_training_AllModelsRequest,
    requestDeserialize: deserialize_training_AllModelsRequest,
    responseSerialize: serialize_training_ModelsResponse,
    responseDeserialize: deserialize_training_ModelsResponse,
  },
  get_model: {
    path: '/training.Daemon/get_model',
    requestStream: false,
    responseStream: false,
    requestType: training_daemon_pb.CommonRequest,
    responseType: training_pb.ModelResponse,
    requestSerialize: serialize_training_CommonRequest,
    requestDeserialize: deserialize_training_CommonRequest,
    responseSerialize: serialize_training_ModelResponse,
    responseDeserialize: deserialize_training_ModelResponse,
  },
  update_model: {
    path: '/training.Daemon/update_model',
    requestStream: false,
    responseStream: false,
    requestType: training_daemon_pb.UpdateModelRequest,
    responseType: training_pb.ModelResponse,
    requestSerialize: serialize_training_UpdateModelRequest,
    requestDeserialize: deserialize_training_UpdateModelRequest,
    responseSerialize: serialize_training_ModelResponse,
    responseDeserialize: deserialize_training_ModelResponse,
  },
  // Unique methods by daemon
// One signature for all getters
get_training_metadata: {
    path: '/training.Daemon/get_training_metadata',
    requestStream: false,
    responseStream: false,
    requestType: google_protobuf_empty_pb.Empty,
    responseType: training_daemon_pb.TrainingMetadata,
    requestSerialize: serialize_google_protobuf_Empty,
    requestDeserialize: deserialize_google_protobuf_Empty,
    responseSerialize: serialize_training_TrainingMetadata,
    responseDeserialize: deserialize_training_TrainingMetadata,
  },
  // Free & without authorization
get_method_metadata: {
    path: '/training.Daemon/get_method_metadata',
    requestStream: false,
    responseStream: false,
    requestType: training_daemon_pb.MethodMetadataRequest,
    responseType: training_daemon_pb.MethodMetadata,
    requestSerialize: serialize_training_MethodMetadataRequest,
    requestDeserialize: deserialize_training_MethodMetadataRequest,
    responseSerialize: serialize_training_MethodMetadata,
    responseDeserialize: deserialize_training_MethodMetadata,
  },
};

exports.DaemonClient = grpc.makeGenericClientConstructor(DaemonService);
