const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

 module.exports = {
   plugins: [new MiniCssExtractPlugin({
    filename: "css/styles.css",
   })], 
   entry: "./src/client/js/main.js",
   mode: "development",
   output: {
     filename: "js/main.js",
     path: path.resolve(__dirname, "assets"),
   },
   module: {
     rules: [
       {
         test: /\.js$/,
         use: {
           loader: "babel-loader",
           options: {
             presets: [["@babel/preset-env", { targets: "defaults" }]],
           },
         },
       },
       {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"], //webpack process backward.
       },
     ],
   },
 };