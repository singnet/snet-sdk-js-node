# snet-sdk-node

![npm](https://img.shields.io/npm/v/snet-sdk.svg)

SingularityNET SDK for Node.js
  
## Getting Started  
  
These instructions are for the development and use of the SingularityNET SDK for JavaScript on Node.js platform.It is built on top of the snet-sdk-core, extending its functionality to support server specific environments.

- `core` – The main SDK functionality.
- **`nodeJS` – Node.js-specific implementations.**
- `web` – Web (browser) integrations.

### Node.js and npm Requirements

This package requires **Node.js version 18** or higher and **npm version 8** or higher. Please ensure these versions are
installed on your system before using this package.

### Installation

```bash
npm install snet-sdk-node
```

### Usage

The SingularityNET SDK allows you to import compiled client libraries for your service or services of choice and make
calls to those services programmatically from your application by setting up state channels with the providers of those
services and making gRPC calls to the SingularityNET daemons for those services by selecting a channel with sufficient
funding and supplying the appropriate metadata for authentication.

```javascript
const SnetSDK = require('snet-sdk-node');
const config = require('./config');
const sdk = new SnetSDK.default(config);
```

You can find a sample config below

```json
{
  "web3Provider": "https://mainnet.infura.io/v3/YOUR_INFURA_KEY",
  "privateKey": "0xYOUR_PRIVATE_KEY",
  "networkId": "1",
  "ipfsEndpoint": "https://ipfs.singularitynet.io",
  "defaultGasPrice": "4700000",
  "defaultGasLimit": "210000",
  "tokenName": "FET",
  "standType": "demo"
}
```
All config fields:
| **Key**            | **Description**                                                                           |
|--------------------|-------------------------------------------------------------------------------------------|
| `web3Provider`     | The URL of the Web3 provider, used to interact with the Ethereum network.|
| `privateKey`       | The private key of the Ethereum account used for signing transactions. Must start with 0x |
| `networkId`        | The ID of the Ethereum network to connect to. (1 for Mainnet or 11155111 for Sepolia)|
| `ipfsEndpoint`     | The optional parameter. The endpoint for connecting to an SingularityNet IPFS node|
| `logLevel`        | The optional parameter, `info` by default. Can be -	`debug`, `error`, `info` |
| `rpcEndpoint`     | It is the optional field, you should provide this if you are getting block size limit exceeded error. This is usually happens when you are using any web social auth providers.|
| `defaultGasPrice`  | The gas price (in wei) to be used for transactions.|
| `defaultGasLimit`  | The gas limit to be set for transactions.|
| `tokenName`  | The name of the token which will be used. It can assume the values `FET` and `AGIX`. |
| `standType`  | This attribute for test networks can assume the values `demo`, `dev`, and for Mainnet, it can take on the values `prod` |

Now, the instance of the sdk can be used to instantiate clients for SingularityNET services. To interact with those
services, the sdk needs to be supplied with the compiled gRPC client libraries.

To generate the gRPC client libraries, you need the SingularityNET Command Line Interface, or CLI, which you can
download from PyPi,
see [https://github.com/singnet/snet-cli#installing-with-pip](https://github.com/singnet/snet-cli#installing-with-pip)

Once you have the CLI installed, run the following command:

```bash
snet sdk generate-client-library nodejs <org_id> <service_id>
```

Optionally, you can specify an output path; otherwise it's going to be
`./client_libraries/nodejs/<hash>/<org_id>/<service_id>`

Also, you can use `protoc` to generate pb files from `.proto`:

```bash
protoc --js_out=import_style=commonjs,binary:. --grpc_out=grpc_js:. --plugin=protoc-gen-grpc=`which grpc_tools_node_protoc_plugin` -I . filename.proto 
```

Once you have the generated gRPC client libraries, you can create an instance of a SingularityNET service client:

```javascript
const SnetSDK = require('snet-sdk-node');
// Load the configuration file
const config = require('<path_to_config_file>');
// Import the generated gRPC client library for the specific service
const grpc = require('<path_to_generated_grpc_js_file>');
const DefaultPaymentStrategy = require('snet-sdk-node/paymentStrategies/DefaultPaymentStrategy');
const sdk = new SnetSDK.default(config);

const opts = {
    disableBlockchainOperations: false,
    concurrency: false
};

const serviceMetadataProvider = await sdk.createServiceMetadataProvider('<org_id>', '<service_id>', '<payment_group_name>', opts);
const paymentStrategy = new DefaultPaymentStrategy.default(serviceMetadataProvider.account, 0);
const serviceClient = await sdk.createServiceClient(serviceMetadataProvider, grpc.<ClientStub>, paymentStrategy);
```

This generates a service client which can be used to make gRPC calls to the desired service.
You can then invoke service specific calls as follows

```javascript
const request = new grpc.<ServiceStub>.<methodName>.requestType();
request.<serviceSetMethod>("<message>");
serviceClient.service.<methodName>(request, (err, result) => {
    // Callback receives two parameters: err and result
});
```

### Examples

#### Paid calls

Here’s a [complete example](./Example/index.js) demonstrating how to make a paid call to a service method.

#### Free calls

The SDK supports Free Calls, allowing you to access services without spending real cryptocurrency, as long as the service provider has enabled this option.

To use free calls, you need to supply additional parameters in the opts object when creating the service metadata provider:

```javascript
const opts = {
    disableBlockchainOperations: false,
    concurrency: false,
    tokenExpiryDateBlock: 12345678
};
```

Here’s a [complete example](./Example/index_freecall.js) demonstrating how to make a free call to a service.

#### Concurrent calls

SDK exposes two methods to facilitate concurrent service calls.

- getConcurrencyTokenAndChannelId
- setConcurrencyTokenAndChannelId

In the consumer, you should call the getConcurrencyTokenAndChannelId() in the master thread.  
It will return the concurrency token and the channel id.
Pass both of them to worker threads and the set the same in the respective instances using
setConcurrencyTokenAndChannelId.

SDK also exposes the `class DefaultPaymentStrategy` to handle the payment metadata for concurrent calls.
Initialize the DefaultPaymentStrategy with the number of calls you would want to run concurrently.

Here’s a [complete example](./Example/index_concurrency.js) demonstrating how to run calls concurrently.

#### Training calls

The SDK supports [Training Services](https://dev.singularitynet.io/docs/products/DecentralizedAIPlatform/DevelopersTutorials/Training/), enabling you to create, manage, train, validate, and invoke AI models using a structured API.

Here’s a [complete example](./Example/index_freecall.js) demonstrating the full flow of all training methods and service invocation.

Also, you can check [Explanation of training](https://dev.singularitynet.io/docs/products/DecentralizedAIPlatform/CoreConcepts/training/).

### Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the
[tags on this repository](https://github.com/singnet/snet-sdk-node/tags).

## License

This project is licensed under the MIT License - see the
[LICENSE](https://github.com/singnet/snet-sdk-node/blob/master/LICENSE) file for details.
