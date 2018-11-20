const path = require("path")

module.exports = {
  entry: "./client/index.js", // entry point is the index.js in the root of project folder
  mode: "development",
  output: {
    path: path.resolve(__dirname, "public"), // bundle.js will also be in the root of project folder
    filename: "bundle.js"
  },
  devtool: "source-maps",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  }
}
