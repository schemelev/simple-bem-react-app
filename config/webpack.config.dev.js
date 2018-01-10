'use strict';

const webpack = require('webpack');
const merge = require('webpack-merge');
const configCommon = require('./webpack.config.common');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const paths = require('./paths');

const setName = process.argv[2];

module.exports = merge(configCommon, {
    devtool: 'cheap-module-source-map',
    entry: [
        require.resolve('react-dev-utils/webpackHotDevClient'),
        require.resolve('./polyfills'),
        paths.appIndexJs,
    ],
    output: {
        publicPath: paths.publicPath,
        filename: 'static/js/[name].bundle.js',
        path: setName ? `${paths.appBuild}/${setName}` : paths.appBuild,
        pathinfo: true,
    },
    module: {
        rules: [
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
        new HtmlWebpackPlugin({
            inject: true,
            template: paths.appHtml,
            filename: setName
                ? `${paths.appBuild}/${setName}/index.html`
                : `${paths.appBuild}/index.html`,
        }),
    ],
});
