const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
	entry: './src/index.js',
	devtool: 'inline-source-map',
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'babel-loader',
				options: { presets: ['@babel/preset-env', '@babel/preset-react'] }
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			},
			{
				test: /\.svg/,
				use: {
					loader: 'svg-url-loader',
					options: {}
				}
			},
			{
				test: /\.(png|jpg|gif)$/,
				use: [
					{
						loader: 'file-loader',
						options: {}
					}
				]
			}
		]
	},
	resolve: { extensions: ['*', '.js', '.jsx'] },
	output: {
		path: path.resolve(__dirname, 'dist/'),
		publicPath: '/',
		filename: 'bundle.js'
	},
	devServer: {
		port: 3000,
		publicPath: 'http://localhost:3000/',
		hot: true,
		historyApiFallback: true,
		proxy: {
			'/api': 'http://localhost:3001'
		}
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new CleanWebpackPlugin(['dist']),
		new HtmlWebpackPlugin({
			template: './public/index.html',
			filename: './index.html'
		})
	]
};
