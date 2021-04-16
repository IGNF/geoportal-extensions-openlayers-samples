// <!-- classe specifique à OpenLayers -->
// ES6 notation
// https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Template_literals
import {
    commaLists,
    stripIndents,
    html
} from 'common-tags';

import {
    config
} from "./config";

var data = {
    apiKey: config.apiKey,
    layers: [],
    view: "",
    widgets: {
        drawing: {
            code: "",
            class: "Drawing"
        },
        isocurve: {
            code: "",
            class: "Isocurve"
        },
        layerimport: {
            code: "",
            class: "LayerImport"
        },
        layerswitcher: {
            code: "",
            class: "LayerSwitcher"
        },
        geoportalmouseposition: {
            code: "",
            class: "GeoportalMousePosition"
        },
        route: {
            code: "",
            class: "Route"
        },
        reversegeocode: {
            code: "",
            class: "ReverseGeocode"
        },
        searchengine: {
            code: "",
            class: "SearchEngine"
        },
        getfeatureinfo: {
            code: "",
            class: "GetFeatureInfo"
        },
        measurelength: {
            code: "",
            class: "MeasureLength"
        },
        measurearea: {
            code: "",
            class: "MeasureArea"
        },
        measureazimuth: {
            code: "",
            class: "MeasureAzimuth"
        },
        elevationpath: {
            code: "",
            class: "ElavationPath"
        },
        geoportalattribution: {
            code: "",
            class: "GeoportalAttribution"
        }
    }
};

/**
 * clear data
 */
function __clear() {
    data.layers = [];
    data.view = "";
    for (const key in data.widgets) {
        if (Object.hasOwnProperty.call(data.widgets, key)) {
            const el = data.widgets[key];
            el.code = "";
        }
    }
}

/**
 * add a layer config into template
 * @param {String} type 
 * @param {String} name 
 * @example
 * __addLayer('tile', 'ORTHOIMAGERY.ORTHOPHOTOS')
 */
function __addLayer(type, name) {
    switch (type) {
        case "tile":
            data.layers.push(`
                new ol.layer.GeoportalWMTS({
                    layer : "${name}"
                })`);
            break;
        case "image":
            data.layers.push(`
                new ol.layer.GeoportalWMS({
                    layer : "${name}"
                })`);
            break;
        case "vector.kml":
            data.layers.push(`
                new ol.layer.Vector({
                    source: new ol.source.Vector({
                        url: "${name}",
                        format: new ol.format.KML()
                    })
                })`);
            break;
        case "vector.gpx":
            data.layers.push(`
                new ol.layer.Vector({
                    source: new ol.source.Vector({
                        url: "${name}",
                        format: new ol.format.GPX()
                    })
                })`);
            break;
        case "vector.geojson":
            data.layers.push(`
                new ol.layer.Vector({
                    source: new ol.source.Vector({
                        url: "${name}",
                        format: new ol.format.GeoJSON()
                    })
                })`);
            break;
        case "vectortile":
        default:
            break;
    }
}

/**
 * add a view config into template
 * @param {Object} option 
 */
function __addView(option) {
    data.view = JSON.stringify(option, null, 0);
}

/**
 * add a widget config into template
 * @param {String} name 
 * @param {Object} option
 * @example
 * __addWidget('drawing', {})
 */
function __addWidget(name, option) {
    var opts = JSON.stringify(option || {}, null, 0);
    var className = data.widgets[name].class;
    data.widgets[name].code = `
        // widget ${name}
        var ${name} = new ol.control.${className}(${opts});
        map.addControl(${name});
    `;
}

/**
 * get code js
 * @returns {String}
 */
function __getCodeJS() {
    var layers = commaLists `[${data.layers}]`;
    var view = stripIndents `${data.view}`;

    return `
    var self = this;

    // Creation de la carte
    var createMap = function () {

        // les options des couches
        var layersOptions = ${layers};

        // les options de la vue
        var viewOptions = ${view};

        // la carte
        var map = new ol.Map({
            target : "map",
            layers : layersOptions,
            view : new ol.View(viewOptions)
        });

        // les widgets
        ${data.widgets.drawing.code}
        ${data.widgets.isocurve.code}
        ${data.widgets.layerimport.code}
        ${data.widgets.layerswitcher.code}
        ${data.widgets.geoportalmouseposition.code}
        ${data.widgets.route.code}
        ${data.widgets.reversegeocode.code}
        ${data.widgets.searchengine.code}
        ${data.widgets.getfeatureinfo.code}
        ${data.widgets.measurelength.code}
        ${data.widgets.measurearea.code}
        ${data.widgets.measureazimuth.code}
        ${data.widgets.elevationpath.code}
        ${data.widgets.geoportalattribution.code}
    };

    // Appel autoconf
    Gp.Services.getConfig({
        apiKey: "${data.apiKey}",
        protocol : "XHR",
        onSuccess : createMap
    });
    `;
}

/**
 * get code html
 * @returns {String}
 */
function __getCodeHTML() {
    var code = {
        js: __getCodeJS(),
        css: __getCodeCSS()
    };
    var lib = {
        js: config.project.library.dist.js,
        css: config.project.library.dist.css
    };
    var plugin = {
        css: config.project.library.plugin.css,
        js: config.project.library.plugin.js
    }

    return html `
    <!DOCTYPE html>
    <html>
        <head>
            <meta content="IE=edge,chrome=1" http-equiv="X-UA-Compatible">
            <meta charset="UTF-8">

            <!-- Library -->
            <link rel="stylesheet" href="${lib.css}" />
            <script src="${lib.js}"></script>

            <!-- Plugin IGN -->
            <link rel="stylesheet" href="${plugin.css}" />
            <script src="${plugin.js}"></script>

            <style>
            ${code.css}
            </style>

            <title>Exemple</title>

        </head>
        <body>
            <h1>Extensions Géoportail</h1>
            <!-- map -->
            <div id="map"></div>
            <!-- code source -->
            <script>
            ${code.js}
            </script>
        </body>
    </html>
    `;
}

/**
 * get code css
 * @returns {String}
 */
function __getCodeCSS() {
    return `
    #map:{
        height: 400px;
    }
    `;
}

export var tpl = {
    clear: __clear,
    addLayer: __addLayer,
    addView: __addView,
    addWidget: __addWidget,
    getCodeJS: __getCodeJS,
    getCodeHTML: __getCodeHTML,
    getCodeCSS: __getCodeCSS
};