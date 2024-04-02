/**
 * Configuration par defaut de la carte
 */
var  apiKey = "full";

/**
 * Configuration par defaut du projet
 * @fixme espace de partage des binaires
 */
var project = {
    sourceProject : "https://github.com/IGNF/geoportal-extensions-openlayers-samples",
    sourceExtensions: "https://ignf.github.io/geoportal-extensions-openlayers",
    jsdoc: "https://ignf.github.io/geoportal-extensions-openlayers/current/jsdoc/",
    library: {
        name: "OpenLayers",
        url: "https://openlayers.org/",
        logo: "./assets/logo-openlayers.png",
        dist: {
            js: "https://raw.githubusercontent.com/IGNF/geoportal-extensions-openlayers/master/samples-src/resources/vendor/ol/v6.9.0/ol.js",
            css: "https://raw.githubusercontent.com/IGNF/geoportal-extensions-openlayers/master/samples-src/resources/vendor/ol/v6.9.0/ol.css"
        },
        plugin: {
            js: "https://ignf.github.io/geoportal-extensions-openlayers/latest/dist/Widgets.js",
            css: "https://ignf.github.io/geoportal-extensions-openlayers/latest/dist/Widgets.css"
        }
    }
};

export var config = {
    apiKey: apiKey,
    project: project
};