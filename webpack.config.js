module.exports = {
  mode: 'development',
  watch: true,
  entry: {
    bundle: __dirname + '/index.js'
  },
  output: {
    path: __dirname + '/public/js',
    filename: '[name].js'
  },
  devServer: {
    contentBase: './public',
    inline: true
  }
}
