import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import alias from '@rollup/plugin-alias';
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
            format: 'esm',
            preserveModules: true,
            preserveModulesRoot: 'src',
            sourcemap: true,
        },
        plugins: [
            peerDepsExternal(),
            alias({
                entries: [
                    {
                        find: 'snet-sdk-core',
                        replacement: 'snet-sdk-core/dist',
                    },
                ],
            }),
            resolve({
                extensions,
            }),
            commonjs(),
            json(),
        ],
    },
];
