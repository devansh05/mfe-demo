const { merge } = require("webpack-merge");
const htmlWebpackPlugin = require("html-webpack-plugin");
const commonConfig = require("./webpack.common.js");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const packageJson = require("../package.json");

const devConfig = {
  mode: "development",
  output: {
    publicPath: "http://localhost:8082/",
  },
  devServer: {
    port: 8082,
    open: true,
    hot: true,
    historyApiFallback: {
      index: "/index.html",
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "auth", // name of the container like a global variable when the script loads up in the container
      filename: "remoteEntry.js", // name of the file that will be created to be consumed by other containers
      exposes: {
        "./AuthApp": "./src/bootstrap", // when someone asks for ./Marketing we'll give them bootstrap
      },
      shared: packageJson.dependencies,
    }),
    new htmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};

module.exports = merge(commonConfig, devConfig);
