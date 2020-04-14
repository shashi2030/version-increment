var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
const fs = require("fs");
const versionFile = require('./src/JSON/version.json');
const packageJson = require('./package.json');

function versionIncrement() {
  var currentVersin = packageJson.version.split('.'),
    versionObj = {
      ...versionFile,
      version: {
        major: parseInt(currentVersin[0]),
        minor: parseInt(currentVersin[1]),
        patch: parseInt(currentVersin[2])
      }
    }
  fs.writeFileSync('./src/JSON/version.json', JSON.stringify(versionObj));
}

try {
  versionIncrement();
} catch (error) {
  console.log("version not updated getting error", error);
}
const htmlPlugin = new HtmlWebpackPlugin({
  template: 'dist/index.html',
  filename: "index.html",
});

module.exports = {
  // entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name(file) {
                if (process.env.NODE_ENV === 'development') {
                  return '[path][name].[ext]';
                }

                return './static/[hash].[ext]';
              },
            },
          },
        ],
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  output: {
    path: path.join(__dirname, "build"),
    filename: "bundle.js",
    chunkFilename: "[name].[hash].js"
  },
  plugins: [htmlPlugin],
  devServer: {
    contentBase: './dist'
  }
};