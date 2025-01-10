import resolve from '@rollup/plugin-node-resolve';
// import commonjs from '@rollup/plugin-commonjs';
// import commonjsNamedExports from 'rollup-plugin-commonjs-named-exports';
import json from '@rollup/plugin-json';
// import replace from '@rollup/plugin-replace';

import cjsEs from 'rollup-plugin-cjs-es';
import { getFiles } from './scripts/buildUtils';

const extensions = ['.js'];
const excludingFiles = ['.test.js'];

export default [
    {
        input: [
            'src/index.js',
            ...getFiles('./src', extensions, excludingFiles),
        ],
        output: {
            dir: 'dist',
            format: 'cjs',
            preserveModules: true,
            preserveModulesRoot: 'src',
            sourcemap: true,
        },
        plugins: [
            json(),
            cjsEs({
                exportType: {
                    'src/proto/state_service_grpc_pb.js': [
                        'PaymentChannelStateServiceClient',
                    ],
                    'src/proto/example_service_grpc_pb.js': [
                        'TokenServiceClient',
                    ],
                },
            }),
            resolve(),
        ],
        // , ],
        //peerDepsExternal(),
    },
];
