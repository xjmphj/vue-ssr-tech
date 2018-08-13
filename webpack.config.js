// node中的基础元素
const path = require('path');
const webpack = require('webpack');
const HTMLPlugin = require('html-webpack-plugin');


//package.json 中的变量 NODE_ENV 可以通过 process.env 访问到
const isDev = process.env.NODE_ENV==='development';

const config = {
  mode:'none',
  target:'web',
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
        },
        {
          test:/\.jsx$/,
          loader:'babel-loader'
        },
        {
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
            {
              loader:'postcss-loader', //用于优化生成后的css，更加浏览器添加一些前缀 ，比如webkit moz
              options:{
                sourceMap:true,  //用于直接引用 stylus-loder 里面的sourceMap ,优化编译过程
              }
            },
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
    //调用webpack ,需要设置这个webpack.DefinePlugin，用来在 编译环境判断 环境，或者其他js 地方可以查找到 process.env.NODE_ENV 环境变量用来去使用，
    //第二的原因是 现在插件vue 、react、等要根据不同环境，webpack配置不同的打包
    //process.env.NODE_ENV = "development"
    new webpack.DefinePlugin({
      'process.env':{
        NODE_ENV: isDev ? '"development"' : '"production"'  //注意分号中要用双引号，否则会变成一个没有定义过的变量   process.env.NODE_ENV = development
      }
    }),
    new HTMLPlugin(),
  ]
}

if(isDev){
  //方便调试，用于
  config.devtool = '#cheap-module-source-map';
  //配置一个本地开发环境的服务
  config.devServer = {
    port:8000,
    host:'0.0.0.0',
    //定位错误
    overlay:{
      errors:true,
    },
    //不重新刷新页面实现数据重新渲染
    hot:true
  }
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  )
}else{

}
module.exports = config;