"use strict";

const slsw = require("serverless-webpack");
const nodeExternals = require("webpack-node-externals");
const LodashModuleReplacementPlugin = require("lodash-webpack-plugin");

const mode = slsw.lib.webpack.isLocal ? "development" : "production";

async function getConfig() {
	return {
		entry: slsw.lib.entries,
		target: "node",
		mode,
		externals: [nodeExternals()],
		module: {},
		optimization: {
			minimize: true,
		},
		plugins: [
			new LodashModuleReplacementPlugin(),
		],
	};
}

module.exports = getConfig();
