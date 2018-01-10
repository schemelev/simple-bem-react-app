'use strict';

process.env.NODE_ENV = 'development';

require('dotenv').config({ silent: true });

const fs = require('fs');
const chalk = require('chalk');
const detect = require('detect-port');
const WebpackDevServer = require('webpack-dev-server');
const clearConsole = require('react-dev-utils/clearConsole');
const checkRequiredFiles = require('react-dev-utils/checkRequiredFiles');
const getProcessForPort = require('react-dev-utils/getProcessForPort');
const openBrowser = require('react-dev-utils/openBrowser');
const prompt = require('react-dev-utils/prompt');
const paths = require('../config/paths');
const config = require('../config/webpack.config.dev');
const devServerConfig = require('../config/webpackDevServer.config');
const createWebpackCompiler = require('./utils/createWebpackCompiler');
const addWebpackMiddleware = require('./utils/addWebpackMiddleware');

const useYarn = fs.existsSync(paths.yarnLockFile);
const cli = useYarn ? 'yarn' : 'npm';
const isInteractive = process.stdout.isTTY;

if (!checkRequiredFiles([paths.appHtml, paths.appIndexJs])) {
    process.exit(1);
}

const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 3000;

function run(port) {
    const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';
    const host = process.env.HOST || 'localhost';

    const compiler = createWebpackCompiler(config, function onReady(showInstructions) {
        if (!showInstructions) {
            return;
        }
        console.log();
        console.log('The app is running at:');
        console.log();
        console.log(`  ${chalk.cyan(`${protocol}://${host}:${port}/`)}`);
        console.log();
        console.log('Note that the development build is not optimized.');
        console.log(`To create a production build, use ${chalk.cyan(`${cli} run build`)}.`);
        console.log();
    });

    const devServer = new WebpackDevServer(compiler, devServerConfig);

    addWebpackMiddleware(devServer);

    devServer.listen(port, err => {
        if (err) {
            console.log('has error');
            return console.log(err);
        }

        console.log('no error');

        if (isInteractive) {
            clearConsole();
        }
        console.log(chalk.cyan('Starting the development server...'));
        console.log();

        !process.env.NO_BRO && openBrowser(`${protocol}://${host}:${port}/`);
    });
}

detect(DEFAULT_PORT).then(port => {
    if (port === DEFAULT_PORT) {
        run(port);
        return;
    }

    if (isInteractive) {
        clearConsole();
        const existingProcess = getProcessForPort(DEFAULT_PORT);

        const question =
            chalk.yellow(
                `Something is already running on port ${DEFAULT_PORT}.` +
                    `${existingProcess ? ` Probably:\n  ${existingProcess}` : ''}`
            ) + '\n\nWould you like to run the app on another port instead?';

        prompt(question, true).then(shouldChangePort => {
            if (shouldChangePort) {
                run(port);
            }
        });
    } else {
        console.log(chalk.red(`Something is already running on port ${DEFAULT_PORT}.`));
    }
});
