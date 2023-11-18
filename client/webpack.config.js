const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  mode: "production",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "../public"),
    filename: "bundler.js",
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, "../public"),
    },
    port: 4000,
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true,
    proxy:{
      "api":"http://localhost:7004"
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Web Pack",
      filename: "index.html",
      template: "./src/index.html",
    }),
  ],
};
