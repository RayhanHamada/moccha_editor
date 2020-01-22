import path from 'path';
import HTMLWebpackPlugin from 'html-webpack-plugin';
import TerserWebpackPlugin from 'terser-webpack-plugin';
import { Configuration } from 'webpack';

const isProd = process.env.NODE_ENV === 'production';
const entryPath = './src/index.tsx';
const prodOutput = path.resolve(__dirname, 'build');

export default {
	mode: isProd ? 'production' : 'development',
	entry: entryPath,
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
		new HTMLWebpackPlugin({
			title: 'React with Webpack and Typescript Support Boilerplate',
			template: './src/index.html',
		}),
	],

	// only specified if environment is in production mode
	optimization: !isProd
		? {}
		: {
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
} as Configuration;
