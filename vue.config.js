
module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? 
  "/geoportal-extensions/" : "",
  configureWebpack: config => {},
  chainWebpack: config => {},
}
