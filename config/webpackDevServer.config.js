'use strict';

const config = require('./webpack.config.dev');
const paths = require('./paths');

const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';
const host = process.env.HOST || 'localhost';

const setName = process.argv[2];

module.exports = {
    compress: true,
    clientLogLevel: 'none',
    contentBase: setName ? `${paths.appBuild}/${setName}` : paths.appBuild,
    watchContentBase: true,
    hot: true,
    publicPath: config.output.publicPath,
    quiet: true,
    watchOptions: {
        ignored: /node_modules/,
    },
    https: protocol === 'https',
    host: host,
    overlay: false,
};
