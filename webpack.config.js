import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default {
    entry: './src/index.tsx',
    output: {
        path: path.resolve('public'),
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'ts-loader',
                },
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader', 'postcss-loader'],
            },
            {
                test: /\.(gif|svg|jpg|png|webp)$/,
                use: ["file-loader"]
            }
        ],
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
        fallback: {
            fs: 'browserify-fs',
            path: 'path-browserify',
            stream: 'stream-browserify',
            util: 'util',
        },
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
        }),
    ],
    mode: 'development',
};