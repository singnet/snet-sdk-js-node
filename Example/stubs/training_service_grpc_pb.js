// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var training_service_pb = require('./training_service_pb.js');
var training_pb = require('./training_pb.js');

function serialize_service_basicSttInput(arg) {
  if (!(arg instanceof training_service_pb.basicSttInput)) {
    throw new Error('Expected argument of type service.basicSttInput');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_service_basicSttInput(buffer_arg) {
  return training_service_pb.basicSttInput.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_service_sttInput(arg) {
  if (!(arg instanceof training_service_pb.sttInput)) {
    throw new Error('Expected argument of type service.sttInput');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_service_sttInput(buffer_arg) {
  return training_service_pb.sttInput.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_service_sttResp(arg) {
  if (!(arg instanceof training_service_pb.sttResp)) {
    throw new Error('Expected argument of type service.sttResp');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_service_sttResp(buffer_arg) {
  return training_service_pb.sttResp.deserializeBinary(new Uint8Array(buffer_arg));
}


var ExampleServiceService = exports.ExampleServiceService = {
  stt: {
    path: '/service.ExampleService/stt',
    requestStream: false,
    responseStream: false,
    requestType: training_service_pb.sttInput,
    responseType: training_service_pb.sttResp,
    requestSerialize: serialize_service_sttInput,
    requestDeserialize: deserialize_service_sttInput,
    responseSerialize: serialize_service_sttResp,
    responseDeserialize: deserialize_service_sttResp,
  },
  basic_stt: {
    path: '/service.ExampleService/basic_stt',
    requestStream: false,
    responseStream: false,
    requestType: training_service_pb.basicSttInput,
    responseType: training_service_pb.sttResp,
    requestSerialize: serialize_service_basicSttInput,
    requestDeserialize: deserialize_service_basicSttInput,
    responseSerialize: serialize_service_sttResp,
    responseDeserialize: deserialize_service_sttResp,
  },
  // basic stt method without training support
};

exports.ExampleServiceClient = grpc.makeGenericClientConstructor(ExampleServiceService);
