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
          { from : path.join(__dirname, "node_modules/geoportal-extensions-openlayers/css/Classic.css"), to : "theme"},
          { from : path.join(__dirname, "node_modules/geoportal-extensions-openlayers/css/Dsfr.css"), to : "theme"},
          { from : path.join(__dirname, "node_modules/@gouvfr/dsfr/dist/dsfr.css"), to : "dsfr"},
          { from : path.join(__dirname, "node_modules/@gouvfr/dsfr/dist/utility/icons/icons-system/icons-system.css"), to : "dsfr/utility/icons/icons-system/"},
          { from : path.join(__dirname, "node_modules/@gouvfr/dsfr/dist/icons/system/"), to : "dsfr/icons/system"},
          { from : path.join(__dirname, "node_modules/@gouvfr/dsfr/dist/fonts/"), to : "dsfr/fonts"},
        ]
      }),
      new HtmlWebpackTagsPlugin({
        append : false, 
        links : [
          {
            path : "theme/Classic.css",
            attributes : {
              rel : "stylesheet",
              id : "portail"
            }
          },
          {
            path : "dsfr/dsfr.css",
            attributes : {
              rel : "alternate stylesheet",
              id : "dsfr1"
            }
          },
          {
            path : "dsfr/utility/icons/icons-system/icons-system.css",
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
