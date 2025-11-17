const { merge } = require("webpack-merge");
const htmlWebpackPlugin = require("html-webpack-plugin");
const commonConfig = require("./webpack.common.js");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const packageJson = require("../package.json");

const devConfig = {
  mode: "development",
  devServer: {
    port: 8081,
    open: true,
    hot: true,
    historyApiFallback: {
      index: "index.html",
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "marketing", // name of the container like a global variable when the script loads up in the container
      filename: "remoteEntry.js", // name of the file that will be created to be consumed by other containers
      exposes: {
        "./MarketingApp": "./src/bootstrap", // when someone asks for ./Marketing we'll give them bootstrap
      },
      shared: packageJson.dependencies,
    }),
    new htmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};

module.exports = merge(commonConfig, devConfig);
