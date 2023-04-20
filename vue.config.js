/* eslint no-unused-vars: off */
module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? 
  "/geoportal-extensions-openlayers-samples/" : "",
  configureWebpack: config => {},
  chainWebpack: config => {},
}
