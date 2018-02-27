const path = require('path');

module.exports = {
	entry: ["babel-polyfill", "./src/index.js"],
	output: {
		path: __dirname,
		publicPath: "/",
		filename: "bundle.js"
	},
	module: {
		rules: [
			{
				exclude: /node_modules/,
				use: {
					loader: 'babel',
					options: {
						presets: ["env", "react", "es2015", "stage-3"]
					}
				}
			}
		]
	},
	resolve: {
		extensions: [".js", ".jsx"]
	},
	resolveLoader: {
		moduleExtensions: ['-loader']
	}
};