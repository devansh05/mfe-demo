const { merge } = require("webpack-merge");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const commonConfig = require("./webpack.common.js");
const packageJson = require("../package.json");
const domain = process.env.PRODUCTION_DOMAIN;

const prodConfig = {
  mode: "production",
  output: {
    filename: "[name].[contenthash].js", //for caching purpose
    publicPath: "/container/latest/", //telling where to find the assets for this container this will prepend to all the assets and files
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "container", // not used anywhere but good to have
      remotes: {
        marketing: `marketing@${domain}/marketing/latest/remoteEntry.js`, //telling where to find the remote container
        auth: `auth@${domain}/auth/latest/remoteEntry.js`, // add auth remote for production
        dashboard: `dashboard@${domain}/dashboard/latest/remoteEntry.js`,
      },
      shared: packageJson.dependencies,
    }),
  ],
};

module.exports = merge(commonConfig, prodConfig);
