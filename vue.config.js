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
          { from : path.join(__dirname, "node_modules/geoportal-extensions-openlayers/css/Portail.css"), to : "dist/theme"},
          { from : path.join(__dirname, "node_modules/geoportal-extensions-openlayers/css/Dsfr.css"), to : "dist/theme"},
          { from : path.join(__dirname, "node_modules/@gouvfr/dsfr/dist/dsfr.css"), to : "dist/css"},
          { from : path.join(__dirname, "node_modules/@gouvfr/dsfr/dist/utility/icons/icons.css"), to : "dist/css"},
        ]
      }),
      new HtmlWebpackTagsPlugin({
        append : false, 
        links : [
          {
            path : "dist/theme/Portail.css",
            attributes : {
              rel : "stylesheet",
              id : "portail"
            }
          },
          {
            path : "dist/css/dsfr.css",
            attributes : {
              rel : "alternate stylesheet",
              id : "dsfr1"
            }
          },
          {
            path : "dist/css/icons.css",
            attributes : {
              rel : "alternate stylesheet",
              id : "dsfr2"
            }
          },
          {
            path : "dist/theme/Dsfr.css",
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
