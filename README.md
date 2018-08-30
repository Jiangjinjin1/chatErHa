# vue-project

To start:

```
script:{"eslint": "eslint --format 'node_modules/eslint-friendly-formatter' file1 src"} 作为eslint命令也可以个人喜欢eslint报错显示风格
```

```bash
$ npm install
```

To develop:

```bash
$ npm start
```

To build for production:

```bash
$ npm run build
```

此处最下面的chunks和chunksSortMode如果不这么手动配置，我在fetch.js文件里
相应请求拦截时引入router实例就会报错，此处花了我一晚上时间查问题，好在终于搞定，
一万点暴击伤害~~~~

```
// 本地环境用这个
new HtmlWebpackPlugin({
  title: config.title,
  template: path.resolve(__dirname, './index.html'),
  favicon: path.resolve(__dirname, '../public/favicon.png'),
  filename: './index.html',
  chunks: ['client'],
  chunksSortMode: 'manual'// 解决了fetch.js引入router实例编译报错Cyclic dependency循环依赖错误
})
```

```
// 生产环境用这个配置
new HtmlWebpackPlugin({
  title: config.title,
  template: path.resolve(__dirname, './index.html'),
  favicon: path.resolve(__dirname, '../public/favicon.png'),
  filename: './index.html',
  chunksSortMode: 'none'// 本地和打包配置区分，如果用本地环境的配置，也会报Cyclic dependency循环依赖错误
})
```