module.exports = {
    baseUrl: './',
    assetsDir: 'static',
    outputDir: 'dist',
    publicPath: './',
    productionSourceMap: false,
    devServer: {
        // proxy: {
        //     '/backend': {
        //         target:'http://localhost:9090',
        //         changeOrigin: true,
        //         pathRewrite: {
        //             '^/backend':'/'
        //         }
        //     }
        // }
    }
}
