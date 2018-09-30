const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HTMLPlugin = require('html-webpack-plugin');
const ExtractPlugin = require('extract-text-webpack-plugin');
const baseConfig = require('./webpack.config.base.js');


const isDev = process.env.NODE_ENV === 'development';

const defalutPlugins = [
  new webpack.DefinePlugin({
      'process.env': {
          NODE_ENV: isDev ? '"development"' : '"production"'
      }
  }),
  new HTMLPlugin()
];

let config ;


const  devServer = {
  port: '8888',
  host: '0.0.0.0',
  overlay: {  // webpack编译出现错误，则显示到网页上
      errors: true,
  },
  // open: true,

  // 不刷新热加载数据
  hot: true
};

if (isDev) {
    config = merge(baseConfig,{
      devtool:'#cheap-module-eval-source-map',
      module:{
        rules:[
          {
            test: /\.styl/,
            use: [
                'vue-style-loader',//可以热启动，样式的加载
                'css-loader',
                {
                    loader: 'postcss-loader',
                    options: {
                        sourceMap: true
                    }
                },
                'stylus-loader'
            ]
        }
        ]
      },
      devServer,
      plugins:defalutPlugins.concat([
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
      ])
    })
   
} else {
    config = merge(baseConfig,{
      entry:{   // 将所用到的类库单独打包
          app: path.join(__dirname, '../client/index.js'),
          vendor: ['vue']
      },
      output:{
        filename:'[name].[chunkhash:8].js'
      },
      module:{
        rules:[
          {
            test: /\.styl/,
            use: ExtractPlugin.extract({
                fallback: 'vue-style-loader',//可以热启动，样式的加载
                use: [
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    'stylus-loader'
                ]
            })
        }
        ]
      },
      plugins:defalutPlugins.concat([
       
        // new MiniCssExtractPlugin({
        //     filename:"[name].[chunkhash:8].css"
        //   })
          new ExtractPlugin('styles.[contentHash:8].css'),
          new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor'
          }),
          new webpack.optimize.CommonsChunkPlugin({
            name: 'runtime'
          }),
          new webpack.NamedChunksPlugin()
      ])
    })
}

module.exports = config;
