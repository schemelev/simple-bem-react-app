'use strict';

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const getClientEnvironment = require('./env');
const paths = require('./paths');

const setName = process.argv[2];

const publicPath = '/';
const publicUrl = '';
const env = getClientEnvironment(publicUrl);

module.exports = {
    devtool: 'cheap-module-source-map',
    entry: [
        require.resolve('react-dev-utils/webpackHotDevClient'),
        require.resolve('./polyfills'),
        paths.appIndexJs,
    ],
    output: {
        path: setName ? `${paths.appBuild}/${setName}` : paths.appBuild,
        pathinfo: true,
        publicPath,
        filename: 'static/js/[name].bundle.js',
    },
    resolve: {
        extensions: ['.js', '.json'],
        modules: ['node_modules'],
    },
    module: {
        rules: [
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
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                        },
                    },
                    { loader: 'postcss-loader' },
                ],
            },
        ],
    },
    plugins: [
        new InterpolateHtmlPlugin(env.raw),
        new HtmlWebpackPlugin({
            inject: true,
            template: paths.appHtml,
            filename: setName
                ? `${paths.appBuild}/${setName}/index.html`
                : `${paths.appBuild}/index.html`,
        }),
        new webpack.DefinePlugin(env.stringified),
    ],
};
