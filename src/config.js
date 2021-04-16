/**
 * Configuration par defaut de la carte
 */
var  apiKey = "jhyvi0fgmnuxvfv0zjzorvdn";

/**
 * Configuration par defaut du projet
 */
var project = {
    sourceProject : "https://github.com/IGNF/geoportal-extensions-openlayers-samples",
    sourceExtensions: "https://ignf.github.io/geoportal-extensions",
    jsdoc: "https://ignf.github.io/geoportal-extensions/current/jsdoc/openlayers",
    library: {
        name: "OpenLayers",
        url: "https://openlayers.org/",
        logo: "./assets/logo-openlayers.png",
        dist: {
            js: "https://cdn.jsdelivr.net/gh/openlayers/openlayers.github.io@master/en/v5.3.0/build/ol.js",
            css: "https://cdn.jsdelivr.net/gh/openlayers/openlayers.github.io@master/en/v5.3.0/css/ol.css"
        },
        plugin: {
            js: "https://ignf.github.io/geoportal-extensions/openlayers-latest/dist/GpPluginOpenLayers.js",
            css: "https://ignf.github.io/geoportal-extensions/openlayers-latest/dist/GpPluginOpenLayers.css"
        }
    }
};

export var config = {
    apiKey: apiKey,
    project: project
};