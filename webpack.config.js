const slsw = require('serverless-webpack');
module.exports = {
    target: 'node',
    mode: 'none',
    module:{
      rules:[{
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env', { targets: "defaults" }]
              ]
            }
          }
        ]
      }]
    },
    entry: slsw.lib.entries,
};
