<!-- classe generique -->
<template>
    <header>
        <div class="header-content">
            <a class="ribbon-github" :href="source">Fork me on GitHub</a>
            <p class="logoIGN">
                <a href="https://www.ign.fr">
                    <img src="./../assets/logoIGN.png" alt="IGN" width="94" height="100">
                </a>
            </p>
            <h1>{{ title }}</h1>
        </div>
    </header>
</template>

<script>
import { config } from "./../config";

export default {
  name: "TheHeader",
  props: {
    title: String
  },
  data () {
    return {
        source: config.project.sourceProject
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h1 {
        text-align: center;
    }
    header {
        position: fixed;
        width: calc(100% - 16px);
        min-width: 590px;
        z-index: 1000;
        top: 10px;
        background-image: url("./../assets/entete.png");
        height : 120px ;
        margin-bottom: 10px;
        box-shadow: 0 0 10px #71767A;
    }

    .header-content {
        position: relative;
        /* max-width: 1200px; */
        margin: auto;
    }

    header .header-content {
        display: -webkit-flex;
        display: flex;
        -webkit-align-items: center;
        align-items: center;
    }

    .logoIGN {
        display: inline-block;
        width: 94px ;
        height: 100px;
        margin: 10px;
        margin-left: 20px;
    }

    .logoIGN img {
        width: 100%;
        height: 100%;
    }

    header h1 {
        -webkit-flex: 1;
        flex: 1;
        font-family: OpenSansLight, Arial, sans-serif;
        font-size: 25px;
        font-weight: bold;
        line-height: 1em;
        color: #71767A;
        margin: 0 50px;
        margin-bottom: 20px;
        text-indent: -15px;
    }
    .ribbon-github {
        /* positioning */
        position: fixed;
        padding: 5px 45px;
        /* width: 128px; */
        /* top right of the page */
        top: 50px;
        right: -50px;
        -webkit-transform: rotate(45deg);
        -moz-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        transform: rotate(45deg);
        /* effects with some shadow */
        box-shadow: 0 0 0 3px #3796ad, 0 0 20px -3px rgba(0, 0, 0, 0.5);
        text-shadow: 0 0 0 #e5e5e5, 0 0 5px rgba(0, 0, 0, 0.3);
        /* looks */
        background-color: #3796ad;
        color: #e5e5e5;
        font-size: 13px;
        font-family: sans-serif;
        text-decoration: none;
        font-weight: bold;
        /* ribbon effects */
        border: 2px dotted #e5e5e5;
        /* webkit antialias fix */
        -webkit-backface-visibility: hidden;
        letter-spacing: .5px;
    }
</style>
