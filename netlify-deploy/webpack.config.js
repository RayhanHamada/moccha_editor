const path = require('path');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';
const entryPath = process.env.WEBPACK_ENTRY_PATH;
const prodOutput = path.resolve(__dirname, process.env.WEBPACK_OUTPUT_PATH);

module.exports = {
	mode: isProd ? 'production' : 'development',
	entry: {
		entryPath,
	},
	output: {
		path: prodOutput,
		filename: '[name].[hash].js',
	},
	resolve: {
		extensions: ['.js', '.jsx', '.ts', '.tsx'],
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.s(a|c)ss$/,
				use: ['style-loader', 'css-loader', 'sass-loader'],
			},
			{
				test: /\.css$/,
				loader: 'style-loader!css-loader',
			},
			{
				test: /\.(ttf|woff|jpe?g|png|svg|gif)$/,
				loader: 'file-loader',
				options: {
					name: '[name].[ext]',
				},
			},
		],
	},
	plugins: [
		/*
		 * no need to specify env-cmd in dev mode in package.json
		 */
		new HTMLWebpackPlugin({
			title: 'React with Webpack and Typescript Support Boilerplate',
			template: './src/index.html',
			favicon: 'assets/mocha_icon.png',
		}),
		new MonacoWebpackPlugin({
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
			],
		}),
	],

	// only specified if environment is in production mode
	optimization: !isProd
		? {}
		: {
				minimize: true,
				minimizer: [new TerserWebpackPlugin()],
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
				overlay: true,
		  },
};
