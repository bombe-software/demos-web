const path = require('path');

module.exports = {
	entry: ["./src/index.js"],
	output: {
		path: __dirname,
		publicPath: "/",
		filename: "bundle.js"
	},
	module: {
		loaders: [
			{
				exclude: /node_modules/,
				loader: "babel",
				query: {
					presets: ["react", "es2015"]
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