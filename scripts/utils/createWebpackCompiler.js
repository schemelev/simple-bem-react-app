'use strict';

const chalk = require('chalk');
const webpack = require('webpack');
const clearConsole = require('react-dev-utils/clearConsole');
const formatWebpackMessages = require('react-dev-utils/formatWebpackMessages');

const isInteractive = process.stdout.isTTY;
let handleCompile;

module.exports = function createWebpackCompiler(config, onReadyCallback) {
    let compiler;
    try {
        compiler = webpack(config, handleCompile);
    } catch (err) {
        console.log(chalk.red('Failed to compile.'));
        console.log();
        console.log(err.message || err);
        console.log();
        process.exit(1);
    }

    compiler.plugin('invalid', () => {
        if (isInteractive) {
            clearConsole();
        }
        console.log('Compiling...');
    });

    let isFirstCompile = true;

    compiler.plugin('done', stats => {
        if (isInteractive) {
            clearConsole();
        }

        const messages = formatWebpackMessages(stats.toJson({}, true));
        const isSuccessful = !messages.errors.length && !messages.warnings.length;
        const showInstructions = isSuccessful && (isInteractive || isFirstCompile);

        if (isSuccessful) {
            console.log(chalk.green('Compiled successfully!'));
        }

        if (typeof onReadyCallback === 'function') {
            onReadyCallback(showInstructions);
        }
        isFirstCompile = false;

        if (messages.errors.length) {
            console.log(chalk.red('Failed to compile.'));
            console.log();
            messages.errors.forEach(message => {
                console.log(message);
                console.log();
            });
            return;
        }

        if (messages.warnings.length) {
            console.log(chalk.yellow('Compiled with warnings.'));
            console.log();
            messages.warnings.forEach(message => {
                console.log(message);
                console.log();
            });
            // Teach some ESLint tricks.
            console.log('You may use special comments to disable some warnings.');
            console.log(
                'Use ' + chalk.yellow('// eslint-disable-next-line') + ' to ignore the next line.'
            );
            console.log(
                'Use ' + chalk.yellow('/* eslint-disable */') + ' to ignore all warnings in a file.'
            );
        }
    });

    return compiler;
};
