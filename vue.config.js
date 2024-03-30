module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? 
  "/geoportal-extensions-openlayers-samples/" : "",
  configureWebpack: config => {},
  chainWebpack: config => {},
  transpileDependencies: true
}
