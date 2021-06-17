const slsw = require('serverless-webpack');
module.exports = {
    target: 'node',
    mode: 'none',
    entry: slsw.lib.entries,
    resolve: {
      alias: {
        'pg-native': 'noop2',
        tedious: 'noop2',
        sqlite3: 'noop2',
        mysql2: 'noop2',
      },
    },
};
