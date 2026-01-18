const { defineConfig } = require('@vue/cli-service')

const TerserPlugin = require('terser-webpack-plugin')
const isProd = process.env.NODE_ENV === 'production'


module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: '',
  configureWebpack:{
    performance: {
      hints: false
    },
    optimization: {
      splitChunks: {
        minSize: 10000,
        maxSize: 550000,
      },

      minimize: true,
      minimizer: isProd ? [
          new TerserPlugin({
              terserOptions: {
                  ecma: 6,
                  compress: { drop_console: true },
                  output: { comments: false, beautify: false }
              }
          })
      ] : []
    }
} 
})