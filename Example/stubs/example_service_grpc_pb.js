// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var example_service_pb = require('./example_service_pb.js');

function serialize_lyrics_Answer(arg) {
  if (!(arg instanceof example_service_pb.Answer)) {
    throw new Error('Expected argument of type lyrics.Answer');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_lyrics_Answer(buffer_arg) {
  return example_service_pb.Answer.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_lyrics_Query(arg) {
  if (!(arg instanceof example_service_pb.Query)) {
    throw new Error('Expected argument of type lyrics.Query');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_lyrics_Query(buffer_arg) {
  return example_service_pb.Query.deserializeBinary(new Uint8Array(buffer_arg));
}


var LyricsService = exports.LyricsService = {
  generate: {
    path: '/lyrics.Lyrics/generate',
    requestStream: false,
    responseStream: false,
    requestType: example_service_pb.Query,
    responseType: example_service_pb.Answer,
    requestSerialize: serialize_lyrics_Query,
    requestDeserialize: deserialize_lyrics_Query,
    responseSerialize: serialize_lyrics_Answer,
    responseDeserialize: deserialize_lyrics_Answer,
  },
};

exports.LyricsClient = grpc.makeGenericClientConstructor(LyricsService);
