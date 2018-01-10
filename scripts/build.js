'use strict';

process.env.NODE_ENV = 'production';

require('dotenv').config({ silent: true });

const chalk = require('chalk');
const fs = require('fs-extra');

const parallelWebpack = require('parallel-webpack');
const parallelWebpackArgv = require('minimist')(process.argv.slice(2), {
    '--': true,
    default: {
        watch: false,
        maxRetries: 1,
        stats: true,
    },
});

const configPath = require.resolve('../config/webpack.config.prod');
const paths = require('../config/paths');
const checkRequiredFiles = require('react-dev-utils/checkRequiredFiles');
const FileSizeReporter = require('react-dev-utils/FileSizeReporter');

const measureFileSizesBeforeBuild = FileSizeReporter.measureFileSizesBeforeBuild;
const printFileSizesAfterBuild = FileSizeReporter.printFileSizesAfterBuild;

if (!checkRequiredFiles([paths.appHtml, paths.appIndexJs])) {
    process.exit(1);
}

measureFileSizesBeforeBuild(paths.appBuild).then(previousFileSizes => {
    fs.emptyDirSync(paths.appBuild);

    build(previousFileSizes);

    copyPublicFolder();
});

function printErrors(summary, errors) {
    console.log(chalk.red(summary));
    console.log();
    errors.forEach(err => {
        console.log(err.message || err);
        console.log();
    });
}

function build(previousFileSizes) {
    console.log('Creating an optimized production build...');

    try {
        parallelWebpack.run(configPath, {
            watch: parallelWebpackArgv.watch,
            maxRetries: parallelWebpackArgv.maxRetries,
            stats: parallelWebpackArgv.stats,
        });
    } catch (err) {
        printErrors('Failed to compile.', [err]);
        process.exit(1);
    }
}

function copyPublicFolder() {
    fs.copySync(paths.appPublic, paths.appBuild, {
        dereference: true,
        filter: file => file !== paths.appHtml,
    });
}
