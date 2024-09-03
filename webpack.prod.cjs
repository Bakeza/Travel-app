import HtmlWebPackPlugin from "html-webpack-plugin";
import path from "path";
import WorkboxPlugin from "workbox-webpack-plugin";

export default {
  entry: "./src/client/index.js",
  mode: "production",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/client/views/index.html",
      filename: "index.html",
    }),
    new WorkboxPlugin.GenerateSW(),
  ],
  devServer: {
    static: path.join(__dirname, "src/client"),
    compress: true,
    port: 3000,
    allowedHosts: "all",
  },
};
