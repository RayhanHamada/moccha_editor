import path from 'path';
	
import MonacoWebpackPlugin from 'monaco-editor-webpack-plugin';
import TerserWebpackPlugin from 'terser-webpack-plugin';
import HTMLWebpackPlugin from 'html-webpack-plugin';
import DotenvCmd from 'dotenv-cmd-webpack';
import { Configuration } from 'webpack';
	
const isProd = process.env.NODE_ENV === 'production';
const entryPath = './src/index.tsx';
const prodOutput = path.resolve(__dirname, './dist');
	
export default {
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
		DotenvCmd({
			filePath: './.env-cmdrc.json',
			env: isProd ? 'prod' : 'dev',
			debug: true,
		}),
		new HTMLWebpackPlugin({
			title: 'React with Webpack and Typescript Support Boilerplate',
			template: './src/index.html',
			favicon: 'assets/mocha_icon.png',
		}),
		new MonacoWebpackPlugin({
			languages: ['typescript', 'javascript', 'cpp', 'python', 'json'],
		}),
	],
	
	// only specified if environment is in production mode
	optimization: isProd
		? {
				minimize: true,
				minimizer: [new TerserWebpackPlugin()],
				}
		: {},
	
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
} as Configuration;
