'use strict';

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const getClientEnvironment = require('./env');
const paths = require('./paths');

const publicPath = paths.servedPath;
const publicUrl = publicPath.slice(0, -1);
const env = getClientEnvironment(publicUrl);

if (env.stringified['process.env'].NODE_ENV !== '"production"') {
    throw new Error('Production builds must have NODE_ENV=production.');
}

function getConfig(setName) {
    const name = setName || '[name]';
    const appBuild = setName ? `${paths.appBuild}/${setName}` : paths.appBuild;

    const cssFilename = `static/css/${name}.[contenthash:8].css`;

    const extractTextPluginOptions = {};

    return {
        bail: true,
        devtool: 'source-map',
        entry: paths.appIndexJs,
        output: {
            publicPath,
            path: appBuild,
            filename: `static/js/${name}.[chunkhash:8].js`,
            chunkFilename: `static/js/${name}.[chunkhash:8].chunk.js`,
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
                    loader: ExtractTextPlugin.extract(
                        Object.assign(
                            {
                                fallback: 'style-loader',
                                use: [
                                    {
                                        loader: 'css-loader',
                                        options: {
                                            importLoaders: 1,
                                        },
                                    },
                                    { loader: 'postcss-loader' },
                                ],
                            },
                            extractTextPluginOptions
                        )
                    ),
                    // Note: this won't work without `new ExtractTextPlugin()` in `plugins`.
                },
            ],
        },
        plugins: [
            new InterpolateHtmlPlugin(env.raw),
            new HtmlWebpackPlugin({
                inject: true,
                template: paths.appHtml,
                filename: `${appBuild}/index.html`,
                minify: {
                    removeComments: true,
                    collapseWhitespace: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true,
                    removeEmptyAttributes: true,
                    removeStyleLinkTypeAttributes: true,
                    keepClosingSlash: true,
                    minifyJS: true,
                    minifyCSS: true,
                    minifyURLs: true,
                },
            }),
            new webpack.DefinePlugin(env.stringified),
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    screw_ie8: true, // React doesn't support IE8
                    warnings: false,
                },
                mangle: {
                    screw_ie8: true,
                },
                output: {
                    comments: false,
                    screw_ie8: true,
                },
                sourceMap: true,
            }),
            new ExtractTextPlugin({
                filename: cssFilename,
            }),
            new ManifestPlugin({
                fileName: 'asset-manifest.json',
            }),
        ],
        target: paths.appTarget,
    };
}

module.exports = paths.appSets
    ? Object.keys(paths.appSets).map(setName => getConfig(setName))
    : getConfig();
