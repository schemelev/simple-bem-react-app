'use strict';

const webpack = require('webpack');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const paths = require('./paths');
const getClientEnvironment = require('./env');

const env = getClientEnvironment(paths.publicUrl);

module.exports = {
    resolve: {
        extensions: ['.ts', '.js', '.json'],
        modules: ['node_modules'],
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            configFile: paths.resolveApp('tsconfig.json'),
                        },
                    },
                ],
            },
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'webpack-bem-loader',
                        options: {
                            levels: paths.levels,
                            techs: ['js', 'css'],
                        },
                    },
                    {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true,
                        },
                    },
                ],
                include: [paths.appSrc].concat(Object.keys(paths.levels)),
            },
        ],
    },
    plugins: [new InterpolateHtmlPlugin(env.raw), new webpack.DefinePlugin(env.stringified)],
};
