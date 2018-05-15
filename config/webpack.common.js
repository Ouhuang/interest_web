'use strict'
const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); //css 分离
const ProgressBarPlugin = require('progress-bar-webpack-plugin'); //进度条
const CopyWebpackPlugin = require('copy-webpack-plugin'); //静态资源
const chalk = require('chalk'); //进度颜色
const config = require('./index.js');

const devMode = process.env.NODE_ENV !== 'production'
const mode = devMode ? 'dev' : 'build'
module.exports = {
    entry: {
        app: './src/main.js',
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].js',
        publicPath: config[mode].assetsPublicPath
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.json']
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                include: [path.resolve(__dirname, '../src')],
                use: 'babel-loader'
            },
            {
                test: /\.tsx?$/,
                use: [{
                    loader: 'ts-loader',  //使用 ts-loader 时，设置 happyPackMode: true / transpileOnly: true。
                    options: {
                        transpileOnly: true,
                        happyPackMode: true
                    }
                }],

            },
            {
                test: /\.css$/,
                use: [
                    // 在开发环境使用 style-loader
                    devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                    "css-loader"
                ],
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: ["file-loader"]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: config.assetsPath('img/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: config.assetsPath('media/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: config.assetsPath('fonts/[name].[hash:7].[ext]')
                }
            }
        ]
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: devMode ? '[name].css' : config.assetsPath('css/[name].[hash].css'),
            chunkFilename: devMode ? '[id].css' : config.assetsPath('css/[id].[hash].css'),
        }),
        new ProgressBarPlugin(
            {
                format: (devMode ? '  启动中' : '  打包中') + ' [:bar] ' + chalk.green.bold(':percent'),
            }
        ),
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, '../public'), // 定义要拷贝的源目录 
                to: config[mode].assetsSubDirectory,  //  定义要拷贝到的目标目录
                ignore: ['index.html']//忽略拷贝指定的文件  可以用模糊匹配
            }
        ])
    ],
    stats: {
        entrypoints: false,
        children: false,
        modules: false
    }
}