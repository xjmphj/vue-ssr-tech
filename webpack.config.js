// node中的基础元素
const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  mode:'development',
  //入口文件
  entry:path.join(__dirname,'src/index.js'),
  //输出文件
  output:{
     filename:'bundle.js', //文件打包后的名称
    path:path.join(__dirname,'dist') //文件目录
  },
  module:{
    rules:[
        {
          test:/\.vue$/,
          loader:'vue-loader'
        },{
          test:/\.css$/,
          use:[
            'style-loader',
            'css-loader',
          ]
        },
        {
          test:/\.styl/,
          use:[
            'style-loader',
            'css-loader',
            'stylus-loader'
          ]
        },
        {
          test:/\.(gif|jpg|png|svg|jpeg)$/,
          use:
          [
            {
              loader:'url-loader',
              options:{ //对loader 做配置，将图片转化成base64的代码，直接写在js内容里而不用生成新的文件，减少http请求
                limit:1024,
                name:'[name].[ext]'  //还可以指定输出的文件名字，//文件的名字配置，保留原来的名字和扩展名称
              }
            }

          ]
        }
    ]
  },
  plugins: [
    new VueLoaderPlugin()
  ]
}