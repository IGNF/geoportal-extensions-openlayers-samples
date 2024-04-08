<!-- classe generique -->
<!-- fixme : sauf le logo de la librairie -->
<template>
    <div id="app">

        <TheHeader title="Démonstrateur des extensions Géoplateforme pour OpenLayers 8"/>
        <div id="app-content">

            <TheRouter :name="name" />
            <TheThematic/>
            <router-view></router-view>
            <div class="header-library">
                <div class="header-p">
                    <a :href="url">
                        <img src="./assets/logo-openlayers.png" alt="OpenLayers" width="50" height="50">
                    </a>
                    <div class="header-p">Accès à la bibliothèque des <a :href="source">extensions Geoportail</a></div>
                </div>
            </div>
            <TheFooter/>
        </div>

    </div>
</template>

<script>
import TheHeader from "./components/TheHeader";
import TheFooter from "./components/TheFooter";
import TheRouter from "./components/TheRouter";
import TheThematic from "./components/TheThematic";

import { config } from "./config";

export default {
  name: "App",
  components: {
    TheHeader,
    TheRouter,
    TheFooter,
    TheThematic
  },
  data () {
    return {
        source: config.project.sourceExtensions,
        url : config.project.library.url,
        logo: config.project.library.logo, // FIXME !?
        name: config.project.library.name
    }
  }
};
</script>

<style scoped>
    #app-content {
        margin-top: 140px;
    }
    
    .header-library {
        display: -webkit-flex;
        display: flex;
        flex-direction: row;
        -webkit-align-items: center;
        align-items: center;
        /* justify-content: center; */
    }
    .header-p {
        margin: 10px;
        display: flex;
    }
</style>
