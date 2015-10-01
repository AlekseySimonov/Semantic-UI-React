var g = require('gulp-load-plugins')();
var gulp = g.help(require('gulp'), require('../gulphelp'));
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var exec = require('child_process').exec;
var runSequence = require('run-sequence');

var devEnv = require('../../dev-env');
var paths = require('../../paths');
var statsConfig = require('../../webpack-stats');
var webpackConfig;
var contentBase;

gulp.task('serve', 'serve, build (in memory only), and watch the app', function(cb) {
  webpackConfig = require('../../webpack.development');
  contentBase = paths.build;
  runSequence(
    'webpack-dev-server',
    cb
  );
});

gulp.task('webpack-dev-server', function(cb) {
  // http://webpack.github.io/docs/webpack-dev-server.html#api
  var devMiddlewareConfig = {
    contentBase: contentBase,
    historyApiFallback: true,
    hot: true,
    quiet: false,                    // log nothing
    noInfo: true,                    // log only warnings and errors

    // http://webpack.github.io/docs/node.js-api.html#stats
    stats: statsConfig
  };

  // http://webpack.github.io/docs/configuration.html
  var compiler = webpack(webpackConfig);

  function onComplete(err, stdout, stderr) {
    cb(err);
  }

  new WebpackDevServer(compiler, devMiddlewareConfig)
    .listen(devEnv.port, devEnv.host, function(err) {
      if (err) {
        throw new g.util.PluginError('webpack-dev-server', err);
      }

      g.util.log(
        g.util.colors.green('[webpack-dev-server]'),
        devEnv.serverUrl
      );

      exec('open ' + devEnv.serverUrl, onComplete);
    });
});
