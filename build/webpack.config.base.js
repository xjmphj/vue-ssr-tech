// node中的基础元素
const path = require('path');
const webpack = require('webpack');
const createVueLoaderOptions = require('./vue-loader.config')

//package.json 中的变量 NODE_ENV 可以通过 process.env 访问到
const isDev = process.env.NODE_ENV==='development';

const config = {
  target:'web',
  //入口文件
  entry:path.join(__dirname,'../client/index.js'),
  //输出文件
  output:{
     filename:'bundle.[hash:8].js', //文件打包后的名称 测试环境不可以用chunkhash
     path:path.join(__dirname,'../dist') //文件目录
  },
  module:{
    rules:[
        {
          test:/\.vue$/,
          loader:'vue-loader',
          options: createVueLoaderOptions(isDev)
        },
        {
          test:/\.jsx$/,
          loader:'babel-loader'
        },{
          test:/\.js$/,
          loader:'babel-loader',
          exclude:/node_modules/
        },

        {
          test:/\.(gif|jpg|png|svg|jpeg)$/,
          use:
          [
            {
              loader:'url-loader',
              options:{ //对loader 做配置，将图片转化成base64的代码，直接写在js内容里而不用生成新的文件，减少http请求
                limit:1024,
                name:'resources/[path][name].[hash:8].[ext]'  //还可以指定输出的文件名字，//文件的名字配置，保留原来的名字和扩展名称
              }
            }

          ]
        }
    ]
  }
}
module.exports = config;