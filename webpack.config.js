const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: './src/client/index.js', // Main JS entry point
  },
  output: {
    filename: 'bundle.js', // Output bundled JS file
    path: path.resolve(__dirname, 'dist/client'), // Output directory
  },
  module: {
    rules: [
      // CSS loader
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/client/index.html', // Use the HTML file as a template
    }),
  ],
  devServer: {
    static: path.resolve(__dirname, 'dist'), // Serve files from the 'dist' folder
    port: 8080,
  },
  mode: 'development', // Set to 'production' for production builds
};
