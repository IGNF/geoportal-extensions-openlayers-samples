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
    sourceExtensions: "https://ignf.github.io/geopf-extensions-openlayers",
    jsdoc: "https://ignf.github.io/geopf-extensions-openlayers/jsdoc/",
    library: {
        name: "OpenLayers",
        url: "https://openlayers.org/",
        logo: "./assets/logo-openlayers.png",
        dist: {
            js: "https://raw.githubusercontent.com/IGNF/geopf-extensions-openlayers/refs/heads/main/samples-src/resources/vendor/ol/v8.2.0/ol.js",
            css: "https://raw.githubusercontent.com/IGNF/geopf-extensions-openlayers/refs/heads/main/samples-src/resources/vendor/ol/v8.2.0/ol.css"
        },
        plugin: {
            js: "https://raw.githubusercontent.com/IGNF/geopf-extensions-openlayers/refs/heads/gh-pages/dist/bundle/GpfExtOL.js",
            css: "https://raw.githubusercontent.com/IGNF/geopf-extensions-openlayers/refs/heads/gh-pages/dist/bundle/Dsfr.css"
        }
    }
};

export var config = {
    apiKey: apiKey,
    project: project
};