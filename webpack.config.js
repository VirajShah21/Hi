// @ts-nocheck

const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
    entry: './Guides/guides.ts',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            { test: /\.css$/i, use: ['style-loader', 'css-loader'] },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        plugins: [new TsconfigPathsPlugin({})],
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'Guides/js'),
    },
    mode: 'development',
    devtool: 'source-map',
};
