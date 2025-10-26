const path = require('path');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

module.exports = function addDevMiddlewares(app, webpackConfig) {
  const compiler = webpack(webpackConfig);

  const middleware = webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    stats: 'minimal', // or 'errors-only'
  });

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));

  // Access the in-memory file system via middleware context
  const fs = middleware.context.outputFileSystem;

  app.get('*', (req, res) => {
    const filepath = path.join(compiler.outputPath, 'index.html');
    fs.readFile(filepath, (err, file) => {
      if (err) {
        console.error('File not found:', filepath);
        res.sendStatus(404);
        return;
      }
      res.send(file.toString());
    });
  });
};
