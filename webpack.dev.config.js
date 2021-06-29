/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-01-23 16:49:19
 * @LastEditTime : 2020-01-17 14:44:26
 * @LastEditors  : Please set LastEditors
 */
const path = require('path')
const webpack = require('webpack')
const proxyUrl = 'http://localhost:3033'
module.exports = {
    
    entry: [
        'react-hot-loader/patch','babel-polyfill',
        path.join(__dirname,'src/index.js')],

    output:{
        path:path.join(__dirname,'public'),
        filename:'bundle.js'
    },
    
    /* 定位报错位置 */
    devtool:'inline-source-map',

    devServer:{
        contentBase: './public',
        historyApiFallback: false,
        host: '0.0.0.0',
        hot: true,
        proxy:{
            '/api':'http://localhost:3033'
        }
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],

    module: {
        rules: [{
            test: /\.js$/,
            use: {
                loader: 'babel-loader'
            },
            include: path.join(__dirname, 'src')
        },
        {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
         }]
    }
}