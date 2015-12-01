// @see: http://blog.madewithlove.be/post/webpack-your-bags/

var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
// var lost = require('lost');
var AssetsPlugin = require('assets-webpack-plugin');
var CleanPlugin = require('clean-webpack-plugin');
var ExtractPlugin = require('extract-text-webpack-plugin');

var isProduction = function() {
    return process.env.NODE_ENV === 'production';
};

// Webpack config
var config = {
    target: 'web',
    context: path.resolve('resources'),
    entry: {
        admin: './assets/admin/index.js',
        app: './assets/app/index.js',
        vendor: ['jquery']
    },
    output: {
        path: path.resolve('public/build'),
        publicPath: '/build/', // This is used to generate URLs to assets
        filename: 'js/[name]' + (isProduction() ? '-[hash:7]' : '') + '.js',
        chunkFilename: 'js/[name]-[chunkhash:7].js'
    },
    externals: {
        'wow': 'WOW'
    },
    resolve: {
        modulesDirectories: [
            'node_modules',
            // Custom dir's om module's in te zoeken
            'public/assets',
            'public/libs'
        ]
    },
    module: {
        loaders: [{
            test: /\.css$/,
            loader: ExtractPlugin.extract('style', 'css!postcss')
        }, {
            test: /\.scss$/,
            loader: ExtractPlugin.extract('style', 'css!postcss!sass?sourceMap')
        }, {
            test: /\.(png|gif|jpe?g|svg)$/i,
            loaders: [
                'url?limit=10000&name=img/[name]-[hash:7].[ext]', // Inline base64 URLs for <= 10k images, direct URLs for others
                'image-webpack?{bypassOnDebug: true, progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}'
            ]
        }],
        noParse: [
            'jquery/dist/jquery.min.js'
        ]
    },
    plugins: [
        // Cleanup the builds/ folder before compiling our final assets
        new CleanPlugin('public/build'),

        // Pipe content to file
        new ExtractPlugin('css/[name]' + (isProduction() ? '-[hash:7]' : '') + '.css'),

        // Map $ and jQuery to `require('jquery')`
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),

        // Analyzes chunks for recurring dependencies, and extracts them somewhere else
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor', // The commons chunk name
            filename: 'vendor.js', // The filename of the commons chunk
            minChunks: Infinity, // (with more entries, this ensures that no other module goes into the vendor chunk)
            chunks: ['app'] // Only use these entries
        }),

        // Create a manifest file
        new AssetsPlugin({
            path: path.resolve('public/build'),
            filename: 'manifest.json',
            prettyPrint: true
        }),

        // NoErrorsPlugin is a little plugin used when running webpack-dev-server
        // just to make sure it doesn't refresh your browser if your
        // latest change throws an error when rebuilding.
        new webpack.NoErrorsPlugin(),

        // This plugins defines various variables that we can set to false
        // in production to avoid code related to them from being compiled
        // in our final bundle
        new webpack.DefinePlugin({
            __DEBUG__: !isProduction(),
            'process.env': {
                BABEL_ENV: JSON.stringify(isProduction() ? 'production' : 'local'),
                NODE_ENV: JSON.stringify(isProduction() ? 'production' : 'local')
            }
        })
    ],

    // Development
    debug: !isProduction(),
    devtool: isProduction() ? false : 'eval',
    devServer: {
        contentBase: '/',
        // Proxy localhost:8080 naar localhost:8000
        // (kan ook project.dev zijn bijvoorbeeld)
        proxy: { '*': 'http://localhost:8000' },
        host: '0.0.0.0',
        port: '8080'
    },

    // Postcss loader
    postcss: [
        // lost({}), voor als je lost (https://github.com/corysimmons/lost) gebruikt
        autoprefixer({
            browsers: ['last 2 versions', '> 5%', 'ie >= 10']
        })
    ]
};

// Production plugins
if (isProduction()) {
    config.plugins = config.plugins.concat([
        // This plugin looks for similar chunks and files
        // and merges them for better caching by the user
        new webpack.optimize.DedupePlugin(),

        // This plugins optimizes chunks and modules by
        // how much they are used in your app
        new webpack.optimize.OccurenceOrderPlugin(),

        // This plugin prevents Webpack from creating chunks
        // that would be too small to be worth loading separately
        new webpack.optimize.MinChunkSizePlugin({
            minChunkSize: 51200 // ~50kb
        }),

        // This plugin minifies all the Javascript code of the final bundle
        // Will also minimize css files :D
        new webpack.optimize.UglifyJsPlugin({
            mangle: true,
            compress: {
                warnings: false
            } // Suppress uglification warnings
        }),

        // Add banner
        new webpack.BannerPlugin([
            'Author: Naam <email>',
            'Date: ' + new Date().toLocaleDateString('nl-NL')
        ].join("\n"), { raw: false, entryOnly: true })
    ]);
}

// Exports
module.exports = config;