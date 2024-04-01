const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackTagsPlugin = require("html-webpack-tags-plugin");

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? 
  "/geoportal-extensions-openlayers-samples/" : "",
  configureWebpack: {
    plugins: [
      new CopyWebpackPlugin ({
        patterns : [
          { from : path.join(__dirname, "node_modules/geoportal-extensions-openlayers/css/Portail.css"), to : "theme"},
          { from : path.join(__dirname, "node_modules/geoportal-extensions-openlayers/css/Dsfr.css"), to : "theme"},
          { from : path.join(__dirname, "node_modules/@gouvfr/dsfr/dist/dsfr.css"), to : "css"},
          { from : path.join(__dirname, "node_modules/@gouvfr/dsfr/dist/utility/icons/icons.css"), to : "css"},
        ]
      }),
      new HtmlWebpackTagsPlugin({
        append : false, 
        links : [
          {
            path : "theme/Portail.css",
            attributes : {
              rel : "stylesheet",
              id : "portail"
            }
          },
          {
            path : "css/dsfr.css",
            attributes : {
              rel : "alternate stylesheet",
              id : "dsfr1"
            }
          },
          {
            path : "css/icons.css",
            attributes : {
              rel : "alternate stylesheet",
              id : "dsfr2"
            }
          },
          {
            path : "theme/Dsfr.css",
            attributes : {
              rel : "alternate stylesheet",
              id : "dsfr3"
            }
          }
        ]
      })
    ]
  },
  chainWebpack: config => {},
  transpileDependencies: [
    'ol'
  ]
}
