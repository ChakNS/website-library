const path = require('path')
const resolve = dir => {
  return path.join(__dirname, dir)
}
module.exports = {
  publicPath: '',
  devServer: {
    overlay: {
      warnings: false,
      errors: true
    },
    hot: false
  },
  lintOnSave: process.env.NODE_ENV !== 'production',
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src')) // key,value自行定义，比如.set('@@', resolve('src/components'))
      .set('_c', resolve('src/components'))

  },
  // 打包时不生成.map文件
  productionSourceMap: false
}