// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var src_proto_training_pb = require('../../src/proto/training_pb.js');
var google_protobuf_descriptor_pb = require('google-protobuf/google/protobuf/descriptor_pb.js');

function serialize_training_ModelID(arg) {
  if (!(arg instanceof src_proto_training_pb.ModelID)) {
    throw new Error('Expected argument of type training.ModelID');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_training_ModelID(buffer_arg) {
  return src_proto_training_pb.ModelID.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_training_NewModel(arg) {
  if (!(arg instanceof src_proto_training_pb.NewModel)) {
    throw new Error('Expected argument of type training.NewModel');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_training_NewModel(buffer_arg) {
  return src_proto_training_pb.NewModel.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_training_PriceInBaseUnit(arg) {
  if (!(arg instanceof src_proto_training_pb.PriceInBaseUnit)) {
    throw new Error('Expected argument of type training.PriceInBaseUnit');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_training_PriceInBaseUnit(buffer_arg) {
  return src_proto_training_pb.PriceInBaseUnit.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_training_StatusResponse(arg) {
  if (!(arg instanceof src_proto_training_pb.StatusResponse)) {
    throw new Error('Expected argument of type training.StatusResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_training_StatusResponse(buffer_arg) {
  return src_proto_training_pb.StatusResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_training_UploadInput(arg) {
  if (!(arg instanceof src_proto_training_pb.UploadInput)) {
    throw new Error('Expected argument of type training.UploadInput');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_training_UploadInput(buffer_arg) {
  return src_proto_training_pb.UploadInput.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_training_ValidateRequest(arg) {
  if (!(arg instanceof src_proto_training_pb.ValidateRequest)) {
    throw new Error('Expected argument of type training.ValidateRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_training_ValidateRequest(buffer_arg) {
  return src_proto_training_pb.ValidateRequest.deserializeBinary(new Uint8Array(buffer_arg));
}


// Methods that the service provider must implement
var ModelService = exports.ModelService = {
  // Free
// Can pass the address of the model creator
create_model: {
    path: '/training.Model/create_model',
    requestStream: false,
    responseStream: false,
    requestType: src_proto_training_pb.NewModel,
    responseType: src_proto_training_pb.ModelID,
    requestSerialize: serialize_training_NewModel,
    requestDeserialize: deserialize_training_NewModel,
    responseSerialize: serialize_training_ModelID,
    responseDeserialize: deserialize_training_ModelID,
  },
  // Free
validate_model_price: {
    path: '/training.Model/validate_model_price',
    requestStream: false,
    responseStream: false,
    requestType: src_proto_training_pb.ValidateRequest,
    responseType: src_proto_training_pb.PriceInBaseUnit,
    requestSerialize: serialize_training_ValidateRequest,
    requestDeserialize: deserialize_training_ValidateRequest,
    responseSerialize: serialize_training_PriceInBaseUnit,
    responseDeserialize: deserialize_training_PriceInBaseUnit,
  },
  // Paid
upload_and_validate: {
    path: '/training.Model/upload_and_validate',
    requestStream: true,
    responseStream: false,
    requestType: src_proto_training_pb.UploadInput,
    responseType: src_proto_training_pb.StatusResponse,
    requestSerialize: serialize_training_UploadInput,
    requestDeserialize: deserialize_training_UploadInput,
    responseSerialize: serialize_training_StatusResponse,
    responseDeserialize: deserialize_training_StatusResponse,
  },
  // Paid
validate_model: {
    path: '/training.Model/validate_model',
    requestStream: false,
    responseStream: false,
    requestType: src_proto_training_pb.ValidateRequest,
    responseType: src_proto_training_pb.StatusResponse,
    requestSerialize: serialize_training_ValidateRequest,
    requestDeserialize: deserialize_training_ValidateRequest,
    responseSerialize: serialize_training_StatusResponse,
    responseDeserialize: deserialize_training_StatusResponse,
  },
  // Free, one signature for both train_model_price & train_model methods
train_model_price: {
    path: '/training.Model/train_model_price',
    requestStream: false,
    responseStream: false,
    requestType: src_proto_training_pb.ModelID,
    responseType: src_proto_training_pb.PriceInBaseUnit,
    requestSerialize: serialize_training_ModelID,
    requestDeserialize: deserialize_training_ModelID,
    responseSerialize: serialize_training_PriceInBaseUnit,
    responseDeserialize: deserialize_training_PriceInBaseUnit,
  },
  // Paid
train_model: {
    path: '/training.Model/train_model',
    requestStream: false,
    responseStream: false,
    requestType: src_proto_training_pb.ModelID,
    responseType: src_proto_training_pb.StatusResponse,
    requestSerialize: serialize_training_ModelID,
    requestDeserialize: deserialize_training_ModelID,
    responseSerialize: serialize_training_StatusResponse,
    responseDeserialize: deserialize_training_StatusResponse,
  },
  // Free
delete_model: {
    path: '/training.Model/delete_model',
    requestStream: false,
    responseStream: false,
    requestType: src_proto_training_pb.ModelID,
    responseType: src_proto_training_pb.StatusResponse,
    requestSerialize: serialize_training_ModelID,
    requestDeserialize: deserialize_training_ModelID,
    responseSerialize: serialize_training_StatusResponse,
    responseDeserialize: deserialize_training_StatusResponse,
  },
  // After model deletion, the status becomes DELETED in etcd
// Free
get_model_status: {
    path: '/training.Model/get_model_status',
    requestStream: false,
    responseStream: false,
    requestType: src_proto_training_pb.ModelID,
    responseType: src_proto_training_pb.StatusResponse,
    requestSerialize: serialize_training_ModelID,
    requestDeserialize: deserialize_training_ModelID,
    responseSerialize: serialize_training_StatusResponse,
    responseDeserialize: deserialize_training_StatusResponse,
  },
};

exports.ModelClient = grpc.makeGenericClientConstructor(ModelService);
