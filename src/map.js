// <!-- classe specifique à OpenLayers -->

import { setOptions } from "./helper";
import { config } from "./config";
import { tpl } from "./template";

import Map from "ol/Map";
import View from "ol/View";
import KML from "ol/format/KML"; 
import GeoJSON from "ol/format/GeoJSON"; 
import GPX from "ol/format/GPX";
// import MapboxVector from "ol/layer/MapboxVector"; // EVOL ol v6 !
import VectorSource from "ol/source/Vector";
import {
    Vector as VectorLayer
} from "ol/layer";

import "ol/ol.css";

import {
    olExtended, 
    olExtVersion, 
    olExtDate,
    Services,
    Logger
} from "geoportal-extensions-openlayers";

import JsonDrawing from "./data/openlayers-drawing.doclet.json";
import JsonElevationPath from "./data/openlayers-elevationpath.doclet.json";
import JsonGeoportalAttribution from "./data/openlayers-geoportalattribution.doclet.json";
import JsonGetFeatureInfo from "./data/openlayers-getfeatureinfo.doclet.json";
import JsonIsoCurve from "./data/openlayers-isocurve.doclet.json";
import JsonLayerImport from "./data/openlayers-layerimport.doclet.json";
import JsonLayerSwitcher from "./data/openlayers-layerswitcher.doclet.json";
import JsonMeasureArea from "./data/openlayers-measurearea.doclet.json";
import JsonMeasureAzimuth from "./data/openlayers-measureazimuth.doclet.json";
import JsonMeasureLength from "./data/openlayers-measurelength.doclet.json";
import JsonGeoportalMousePosition from "./data/openlayers-mouseposition.doclet.json";
import JsonReverseGeocode from "./data/openlayers-reversegeocode.doclet.json";
import JsonRoute from "./data/openlayers-route.doclet.json";
import JsonSearchEngine from "./data/openlayers-searchengine.doclet.json";

import JsonOlView from "./data/ol/openlayers-view.json";
import JsonOlLayer from "./data/ol/openlayers-layer.json";

// gestion des loggers des API
const isProduction = process.env.NODE_ENV === 'production';
isProduction ? Logger.disableAll() : Logger.enableAll();

// gestion du path de deploiement
const publicPath = process.env.BASE_URL;

/** suppression  de la carte */
export function removeMap() {
    var map = document.getElementById("map");
    while (map.hasChildNodes()) {  
        map.removeChild(map.firstChild);
    }
}

/** ajout de la carte */
export function addMap(options, status) {

    // Creation de la Map
    var createMap = function () {
        tpl.clear();

        // traitements des layers
        var layersOptions = [];

        options.ol.layer.params.forEach(element => {
            if (element.section) {
                return;
            }
            if (!element.value) {
                return;
            }
            if (element.service.toLowerCase() === "tile") {
                layersOptions.push(new olExtended.layer.GeoportalWMTS({
                    layer : element.name
                }));
                tpl.addLayer("tile", element.name);
            }
            if (element.service.toLowerCase() === "image") {
                layersOptions.push(new olExtended.layer.GeoportalWMS({
                    layer : element.name
                }));
                tpl.addLayer("image", element.name);
            }
            if (element.service.toLowerCase() === "vector.kml") {
                layersOptions.push(new VectorLayer({
                        source: new VectorSource({
                            url: publicPath + element.name,
                            format: new KML()
                        })
                }));
                tpl.addLayer("vector.kml", element.name);
            }
            if (element.service.toLowerCase() === "vector.gpx") {
                layersOptions.push(new VectorLayer({
                        source: new VectorSource({
                            url: publicPath + element.name,
                            format: new GPX()
                        })
                }));
                tpl.addLayer("vector.gpx", element.name);
            }
            if (element.service.toLowerCase() === "vector.geojson") {
                layersOptions.push(new VectorLayer({
                        source: new VectorSource({
                            url: publicPath + element.name,
                            format: new GeoJSON()
                        })
                }));
                tpl.addLayer("vector.geojson", element.name);
            }
            if (element.service.toLowerCase() === "vectortile") {
                layersOptions.push(
                    // EVOL ol v6 !
                    // cf. https://openlayers.org/en/latest/apidoc/module-ol_layer_MapboxVector.html
                    // new MapboxVector({
                    //     styleUrl: publicPath + '',
                    // })
                );
            }
        });

        var map = new Map({
            target : "map",
            layers : layersOptions,
            view : new View(setOptions(options.ol.view))
        });

        tpl.addView(setOptions(options.ol.view));

        var opts;
        if (status.drawing) {
            opts = setOptions(options.drawing);
            var drawing = new olExtended.control.Drawing();
            map.addControl(drawing);
            tpl.addWidget("drawing", opts);
        }
        if (status.isocurve) {
            opts = setOptions(options.isocurve);
            var iso = new olExtended.control.Isocurve(opts);
            map.addControl(iso);
            tpl.addWidget("isocurve", opts);
        }
        if (status.layerimport) {
            opts = setOptions(options.layerimport);
            var layerImport = new olExtended.control.LayerImport(opts);
            map.addControl(layerImport);
            tpl.addWidget("layerimport", opts);
        }
        if (status.layerswitcher) {
            opts = setOptions(options.layerswitcher);
            var layerSwitcher = new olExtended.control.LayerSwitcher(opts);
            map.addControl(layerSwitcher);
            tpl.addWidget("layerswitcher", opts);
        }
        if (status.geoportalmouseposition) {
            opts = setOptions(options.geoportalmouseposition);
            var mp = new olExtended.control.GeoportalMousePosition(opts);
            map.addControl(mp);
            tpl.addWidget("geoportalmouseposition", opts);
        }
        if (status.route) {
            opts = setOptions(options.route);
            var route = new olExtended.control.Route(opts);
            map.addControl(route);
            tpl.addWidget("route", opts);
        }
        if (status.reversegeocode) {
            opts = setOptions(options.reversegeocode);
            var reverse = new olExtended.control.ReverseGeocode(opts);
            map.addControl(reverse);
            tpl.addWidget("reversegeocode", opts);
        }
        if (status.searchengine) {
            opts = setOptions(options.searchengine);
            var search = new olExtended.control.SearchEngine(opts);
            map.addControl(search);
            tpl.addWidget("searchengine", opts);
        }
        if (status.getfeatureinfo) {
            opts = setOptions(options.getfeatureinfo);
            var feature =  new olExtended.control.GetFeatureInfo(opts);
            map.addControl(feature);
            tpl.addWidget("getfeatureinfo", opts);
        }
        if (status.measurelength) {
            opts = setOptions(options.measurelength);
            var measureLength = new olExtended.control.MeasureLength(opts);
            map.addControl(measureLength);
            tpl.addWidget("measurelength", opts);
        }
        if (status.measurearea) {
            opts = setOptions(options.measurearea);
            var measureArea = new olExtended.control.MeasureArea(opts);
            map.addControl(measureArea);
            tpl.addWidget("measurearea", opts);
        }
        if (status.measureazimuth) {
            opts = setOptions(options.measureazimuth);
            var measureAzimuth = new olExtended.control.MeasureAzimuth(opts);
            map.addControl(measureAzimuth);
            tpl.addWidget("measureazimuth", opts);
        }
        if (status.elevationpath) {
            opts = setOptions(options.elevationpath);
            var measureProfil = new olExtended.control.ElevationPath(opts);
            map.addControl(measureProfil);
            tpl.addWidget("elevationpath", opts);
        }
        if (status.geoportalattribution) {
            opts = setOptions(options.geoportalattribution);
            var attributions = new olExtended.control.GeoportalAttribution(opts);
            map.addControl(attributions);
            tpl.addWidget("geoportalattribution", opts);
        }
    };

    // Appel autoconf
    Services.getConfig({
        apiKey: config.apiKey,
        protocol : "XHR",
        onSuccess : createMap
    });
}

/** obtenir la nom de la librairie */
export function getLibraryName() {
    return config.project.library.name;
}

/** obtenir les options des widgets par defaut */
export function getWidgetOptions() {
    return {
        measurelength : JsonMeasureLength,
        measurearea : JsonMeasureArea,
        measureazimuth : JsonMeasureAzimuth,
        drawing : JsonDrawing,
        layerimport : JsonLayerImport,
        getfeatureinfo : JsonGetFeatureInfo,
        geoportalattribution : JsonGeoportalAttribution,
        route : JsonRoute,
        geoportalmouseposition : JsonGeoportalMousePosition,
        layerswitcher : JsonLayerSwitcher,
        reversegeocode : JsonReverseGeocode,
        searchengine : JsonSearchEngine,
        isocurve : JsonIsoCurve,
        elevationpath : JsonElevationPath
    };
}

/** obtenir les options de la carte par defaut */
export function getMapOptions() {
    return {
        ol: {
            view: JsonOlView,
            layer: JsonOlLayer
        }
    };
}

/** obtenir le statut des widgets par defaut */
export function getWidgetStatus() {
    return {
        measurelength : false,
        measurearea : false,
        measureazimuth : false,
        drawing : false,
        layerimport : false,
        getfeatureinfo : false,
        geoportalattribution : false,
        route : false,
        geoportalmouseposition : false,
        layerswitcher : false,
        reversegeocode : false,
        searchengine : false,
        isocurve : false,
        elevationpath : false
    };
}

/** obtenir la version / date des widgets */
export function getLibraryInfo() {
    return {
        version : "[" + olExtVersion + "]",
        date : olExtDate
    };
}