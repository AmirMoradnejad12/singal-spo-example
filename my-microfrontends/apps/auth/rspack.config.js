const path = require('path');
const { PublicPathRspackPlugin } = require('@rspack/core');

module.exports = {
    entry: './src/main.tsx',
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
    },
    output: {
        // 1. Tell Rspack to build a 'SystemJS' module
        libraryTarget: 'system',
        filename: 'org-auth.js',
        path: path.resolve(__dirname, 'dist'),
        // 2. The full URL where this app lives
        publicPath: 'http://localhost:9001/',
    },
    module: {
        rules: [
            {
                test: /\.(j|t)sx?$/,
                loader: 'builtin:swc-loader',
                options: {
                    jsc: {
                        parser: { syntax: 'typescript', tsx: true },
                        transform: { react: { runtime: 'automatic' } },
                    },
                },
            },
        ],
    },
    devServer: {
        port: 9001,
        historyApiFallback: true,
        headers: {
            // 3. Allow the Shell (Port 9000) to fetch this file
            "Access-Control-Allow-Origin": "*",
        },
    },
    plugins: [
        // Helps single-spa find assets (images/css) correctly
        new PublicPathRspackPlugin()
    ],
};