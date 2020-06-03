var monaco_editor_webpack_plugin_1 = require('monaco-editor-webpack-plugin');
var terser_webpack_plugin_1 = require('terser-webpack-plugin');
var html_webpack_plugin_1 = require('html-webpack-plugin');
var webpack_1 = require('webpack');
var dotenv_webpack_1 = require('dotenv-webpack');
var path_1 = require('path');
var isProd = process.env.NODE_ENV === 'production';
var entryPath = './src/index.tsx';
var prodOutput = path_1["default"].resolve(__dirname, 'dist');
exports["default"] = {
    mode: isProd ? 'production' : 'development',
    entry: {
        entryPath: entryPath
    },
    output: {
        path: prodOutput,
        filename: '[name].[hash].js'
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.s(a|c)ss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.(ttf|woff|jpe?g|png|svg|gif)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]'
                }
            },
        ]
    },
    plugins: [
        /*
         * no need to specify env-cmd in dev mode in package.json
         */
        new dotenv_webpack_1["default"]({
            path: isProd ? './prod.env' : './dev.env'
        }),
        new html_webpack_plugin_1["default"]({
            title: 'React with Webpack and Typescript Support Boilerplate',
            template: './src/index.html',
            favicon: 'assets/mocha_icon.png'
        }),
        new monaco_editor_webpack_plugin_1["default"]({
            languages: [
                'typescript',
                'javascript',
                'cpp',
                'php',
                'css',
                'csharp',
                'python',
                'json',
                'kotlin',
            ]
        }),
    ],
    // only specified if environment is in production mode
    optimization: !isProd
        ? {}
        : {
            minimize: true,
            minimizer: [new terser_webpack_plugin_1["default"]()]
        },
    // only specified if the environment is in development mode
    devServer: isProd
        ? {}
        : {
            port: 8080,
            open: true,
            hot: true,
            compress: true,
            stats: 'errors-only',
            overlay: true
        }
};
as;
webpack_1.Configuration;
