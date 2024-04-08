<!-- classe generique -->
<template>
    <div class="">

        <div ref="allParams">

            <h2 id="title-params">Generateur de carte {{ name }}</h2>

            <form
                id="params-form" 
                @submit="onSubmitGenerateMap" 
                action="javascript:void(0);"
                novalidate>

                <!-- gestion des options de la carte -->
                <div id="options">
                    <TheCollapsible active=false name="menu-options-map" title="Options de la carte" />
                    <div id="params-map">
                        <TheCptOptionsMenu v-bind:names="getMapNames"/>
                        <div
                            v-for="options in getMapOptions" 
                            v-bind:key="options.id">
                            <TheCptOptions 
                                v-bind:options="options" 
                                @check-option=onActive />
                        </div>
                    </div>
                </div>

                <!-- gestion des options des widgets -->
                <div id="widgets">
                    <TheCollapsible active=false name="menu-options-widgets" title="Options des widgets" />
                    <div id="params-widgets">
                        <TheCptOptionsMenu v-bind:names="getWidgetNames"/>
                        <div
                            v-for="options in getWidgetOptions" 
                            v-bind:key="options.id">
                            <TheCptOptions 
                                v-bind:options="options" 
                                @check-option=onActive />
                        </div>
                    </div>
                </div>

                <!-- gestion des options de génération -->
                <div id="generation">
                <TheCollapsible active=true name="menu-options-generate" title="Options de génération de la carte" />
                    <div id="params-generate">
                        <button class="button" type="submit">Générer la carte</button>
                        <button class="button" type="button" @click="onClickReset">Réinitialiser les options</button>
                        <button class="button" type="button" @click="onClickShowCode">Afficher le code</button>
                        <button class="button" type="button" @click="onClickExportMap">Exporter la carte</button>
                    </div>
                </div>

            </form>
        </div>

        <!-- affichage de la carte -->
        <div id="mapContainer" v-bind:style="{ display : display }">
            <div id="map"></div>
        </div>

        <TheVersion :version="info.version" :date="info.date"/>

        <Teleport to="body">
            <ThePopup v-if="show" 
                @close="onClickClosePopup" 
                @copy="onClickCopyCode">
                <template v-slot:header>
                    <h3>Code JS</h3>
                </template>
                <template v-slot:body>
                    <highlightjs language='javascript' :code="code" />
                </template>
                <template v-slot:footer>
                    version {{ info.version }}
                </template>
            </ThePopup>
        </Teleport>

    </div>
</template>

<script>

import TheVersion from "./../TheVersion";
import TheCollapsible from "./../TheCollapsible";
import ThePopup from "./../ThePopup";

import TheCptOptions from "./../options/TheCptOptions";
import TheCptOptionsMenu from "./../options/TheCptOptionsMenu";

import { tpl } from "./../../template";

import { 
    addMap,
    removeMap,
    getLibraryName,
    getWidgetOptions,
    getMapOptions,
    getWidgetStatus,
    getLibraryInfo
} from "./../../map";

import { saveAs } from 'file-saver';

export default {
    name: "MyCptGeneratorMap",
    components: {
        TheVersion,
        TheCollapsible,
        TheCptOptions,
        TheCptOptionsMenu,
        ThePopup
    },
    data() {
        return {
            show : false,
            code : "",
            display : "none",
            // informations specifiques à la librairie
            name: getLibraryName(),
            info : getLibraryInfo(),
            options : Object.assign(getWidgetOptions(), getMapOptions()),
            active : getWidgetStatus()
        };
    },
    computed: {
        /** obtenir la liste des nom de widget */
        getWidgetNames() {
            // ex.
            // [
            //     options.measurearea.name,
            //     options.measureazimuth.name,
            //     options.measurelength.name,
            //     options.layerimport.name,
            //     options.getfeatureinfo.name,
            //     options.drawing.name,
            //     options.geoportalattribution.name,
            //     options.route.name,
            //     options.geoportalmouseposition.name,
            //     options.layerswitcher.name,
            //     options.reversegeocode.name,
            //     options.searchengine.name,
            //     options.isocurve.name,
            //     options.elevationpath.name
            // ]
            var names = [];
            for (const key in getWidgetOptions()) {
                if (Object.hasOwnProperty.call(getWidgetOptions(), key)) {
                    var e = getWidgetOptions()[key];
                    names.push(e.name);
                }
            }
            return names.sort();
        },
        /** obtenir la liste des options des widget */
        getWidgetOptions() {
            return getWidgetOptions();
        },
        /** obtenir la liste des noms (view/map) */
        getMapNames() {
            // ex.
            // [
            //     options.ol.view.name,
            //     options.ol.layer.name
            // ]
            var names = [];
            var ns = Object.keys(getMapOptions())[0]; // uniquement la clef ol, leaflet ou itowns !
            for (const key in getMapOptions()[ns]) {
                if (Object.hasOwnProperty.call(getMapOptions()[ns], key)) {
                    var e = getMapOptions()[ns][key];
                    names.push(e.name);
                }
            }
            return names;
        },
        /** obtenir la liste des options de la carte */
        getMapOptions() {
            var ns = Object.keys(getMapOptions())[0]; // uniquement la clef ol, leaflet ou itowns !
            return getMapOptions()[ns];
        }
    },
    methods: {
        /** handler submit form */
        onSubmitGenerateMap() {
            removeMap();
            this.display = "block";
            addMap(this.options, this.active);
        },

        /** handler click button */
        onClickShowCode() {
            // https://fr.vuejs.org/v3/examples/modal.html
            this.show = true;
            this.code = tpl.getCodeJS();
        },
        onClickExportMap() {
            // https://github.com/eligrey/FileSaver.js
            try {
                var isFileSaverSupported = !!new Blob;
                if (isFileSaverSupported) {
                    this.$log.debug("Blob is supported...");
                }
            } catch (e) {
                this.$log.error("Blob not supported !");
            }
            
            var blob = new Blob([tpl.getCodeHTML()], {type: "text/plain;charset=utf-8"});
            saveAs(blob, "index.html");

        },
        onClickReset() {
            // TODO reinit les options par defaut
        },
        onClickCopyCode() {
            var self = this;
            navigator.clipboard.writeText(tpl.getCodeJS())
            .then(
                () => { self.$log.info("Copy to clipboard !");},
                () => { self.$log.error("Copy to clipboard not supported !"); }
            );
        },
         onClickClosePopup() {
            this.show = false;
        },

        /** activation du widget sur la carte */
        onActive(e) {
            this.active[e.type] = e.value;
        },
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#map {
    height: 700px;
    background-image:url("./../../assets/waiting.gif");
    background-position:center center;
    background-repeat:no-repeat;
}
#params-title {
    display: flex;
    flex-direction: column;
}
#all-params {
    width: 100%;
    display: flex;
    flex-direction: column;
}

#options {
    width:20%
}

#widgets {
    width:35%
}

#generation {
    width:35%
}
#params-generate,
#params-widgets,
#params-map {
    margin:0px;
    margin-bottom: 20px;
}

#params-form {
display: flex;
  align-items: stretch;
}

.button {
  position: relative;
  background-color: #3796AD;
  border: none;
  color: #FFFFFF;
  padding: 20px;
  margin: 5px;
  /* width: 120px; */
  text-align: center;
  -webkit-transition-duration: 0.4s; /* Safari */
  transition-duration: 0.4s;
  text-decoration: none;
  overflow: hidden;
  cursor: pointer;
}

.button:after {
  content: "";
  background: #3796AD;
  display: block;
  position: absolute;
  padding-top: 300%;
  padding-left: 350%;
  margin-left: -20px!important;
  margin-top: -120%;
  opacity: 0;
  transition: all 0.8s
}

.button:active:after {
  padding: 0;
  margin: 0;
  opacity: 1;
  transition: 0s
}

</style>
