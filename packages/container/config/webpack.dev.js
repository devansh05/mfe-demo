const { merge } = require("webpack-merge");
const commonConfig = require("./webpack.common.js");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const packageJson = require("../package.json");

const devConfig = {
  mode: "development",
  output: {
    publicPath: "http://localhost:8080/",
  },
  devServer: {
    port: 8080,
    open: true,
    hot: true,
    historyApiFallback: {
      index: "index.html",
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "container", // not used anywhere but good to have
      remotes: {
        //first marketing is the name of the remote container we are trying to connect to
        //second marketing is the name given in that remote container's ModuleFederationPlugin
        marketing: "marketing@http://localhost:8081/remoteEntry.js", //telling where to find the remote container
        auth: "auth@http://localhost:8082/remoteEntry.js", //telling where to find the remote container
      },
      exposes: {},
      shared: packageJson.dependencies,
    }),
  ],
};

module.exports = merge(commonConfig, devConfig);
