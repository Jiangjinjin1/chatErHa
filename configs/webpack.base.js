const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')

const config = require('./config')

const HtmlWebpackPlugin_split = process.env.NODE_ENV === 'development' ? 
  new HtmlWebpackPlugin({
    title: config.title,
    template: path.resolve(__dirname, './index.html'),
    favicon: path.resolve(__dirname, '../public/favicon.png'),
    filename: './index.html',
    chunks: ['client'],
    chunksSortMode: 'manual'// 解决了fetch.js引入router实例编译报错Cyclic dependency循环依赖错误
  }):
  new HtmlWebpackPlugin({
    title: config.title,
    template: path.resolve(__dirname, './index.html'),
    favicon: path.resolve(__dirname, '../public/favicon.png'),
    filename: './index.html',
    chunksSortMode: 'none'// 本地和打包配置区分，如果用本地环境的配置，也会报Cyclic dependency循环依赖错误
  })

module.exports = {
  entry: {
    client: './src/index.js'
  },
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'js/[name].js',
    publicPath: './'
  },
  resolve: {
    extensions: ['.js', '.vue', '.css', '.json','.scss'],
    alias: {
      '~': path.join(__dirname, '../src'),
      '~components': path.join(__dirname, '../src/components')
    }
  },
  performance: {},
  module: {
    rules: [
      // {
      //   enforce: 'pre',
      //   test: /\.(js|vue)$/,
      //   use: [{loader: 'eslint-loader', options: {
      //       formatter: require('eslint-friendly-formatter')
      //     }}],
      //   exclude: [/node_modules/]
      // },
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: [/node_modules/]
      },
      {
        test: /\.(ico|jpg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
        use: [{loader:'file-loader', options: {
          //9kb以内的图片处理成base64字符串
          limit:8192,
          //指定拷贝文件的输出目录
          outputPath: 'images/'
        }}]
      }
    ]
  },
  plugins: [
    HtmlWebpackPlugin_split,
    new VueLoaderPlugin()
  ]
}
