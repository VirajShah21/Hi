const path = require('path');

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
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'Guides/js'),
    },
    mode: 'development',
    devtool: 'source-map',
};
