const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");

module.exports = {
  webpack: {
    plugins: {
      add: [
        new CopyWebpackPlugin({
          patterns: [
            {
              from: path.resolve(__dirname, "public/background.js"),
              to: path.resolve(__dirname, "build"),
            },
            {
              from: path.resolve(__dirname, "public/content.js"),
              to: path.resolve(__dirname, "build"),
            },
            {
              from: path.resolve(__dirname, "public/blocked.html"),
              to: path.resolve(__dirname, "build"),
            },
          ],
        }),
      ],
    },
  },
};
