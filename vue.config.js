module.exports = {
  publicPath: './',
  // webpack配置
  configureWebpack: {
    // 关闭 webpack 的性能提示
    performance: {
      hints: false
    }
  },
  devServer: {
    proxy: 'http://localhost:5000'
  },
  lintOnSave: false
}
