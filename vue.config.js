module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? 
  "/geoportal-extensions-openlayers-samples/" : "",
  configureWebpack: config => {
  },
  chainWebpack: config => {
    // Exemple :
    // config.resolve.alias.set('vue', '@vue/compat')
    // config.module
    //   .rule('vue')
    //   .use('vue-loader')
    //   .tap(options => {
    //     return {
    //       ...options,
    //       compilerOptions: {
    //         compatConfig: {
    //           MODE: 2
    //         }
    //       }
    //     }
    //   })
  },
  // transpileDependencies: [
  //   "ol"
  // ]
}
