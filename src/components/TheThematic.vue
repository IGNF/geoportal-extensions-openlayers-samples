<!-- classe generique -->
<template>
    <div id="toggle">
    <h2>Thème</h2>
        <div>
            <label id="switch" class="switch">
                <input type="checkbox" @change="onToggleTheme" id="slider">
                <span class="slider round"></span>
            </label>
            <label for="slider" ref="labelSlider" id="labelSlider"></label>
        </div>
    </div>
</template>

<script>

export default {
    name: "TheThematic",
    props: {},
    beforeMount() {
        // INFO l'opération d'ajout des tags link est realisée par webpack (cf. vue.config.js) :
        // <link href="./node_modules/geoportal-extensions-openlayers/css/Portail.css" rel="stylesheet" id="portail">
        // <link href="./node_modules/geoportal-extensions-openlayers/css/Dsfr.css" rel="alternate stylesheet" id="dsfr">
    },
    mounted() {
        this.$refs.labelSlider.innerHTML = "Classique";
        localStorage.setItem("theme", "portail");
        if (document.getElementById("slider")) {
            document.getElementById("slider").checked = false;
        }
    },
    methods: {
        onToggleTheme() {
            var portail = document.querySelectorAll("link[id='portail']");
            var dsfr = document.querySelectorAll("link[id^=dsfr]");

            if (localStorage.getItem("theme") === "portail") {
                localStorage.setItem("theme", "dsfr");
                this.$refs.labelSlider.innerHTML = "DSFR";
                this.enableStylesheet(dsfr);
                this.disableStylesheet(portail);
            } else {
                localStorage.setItem("theme", "portail");
                this.$refs.labelSlider.innerHTML = "Classique";
                this.enableStylesheet(portail);
                this.disableStylesheet(dsfr);
            }
        },
        enableStylesheet(nodes) {
            nodes.forEach(node => {
                node.rel = "stylesheet";
            });
        },
        disableStylesheet(nodes) {
            nodes.forEach(node => {
                node.rel = "alternate stylesheet";
            });
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    :root {
        --color-primary: #0060df;
        --color-secondary: #fbfbfe;
        --font-color: #000000;
    }

    #toggle {
        display: flex;
        width: 100%;
        height: 100%;
        background: var(--color-secondary);
        flex-direction: column;
        margin-bottom: 20px;
        /* justify-content: center;
        align-items: center; */
    }

    #toggle button {
        color: var(--font-color);
        background: var(--color-primary);
        padding: 10px 20px;
        border: 0;
        border-radius: 5px;
    }

    /* The switch - the box around the slider */
    .switch {
        position: relative;
        display: inline-block;
        width: 60px;
        height: 34px;
    }

    /* Hide default HTML checkbox */
    .switch input {
        opacity: 0;
        width: 0;
        height: 0;
    }

    /* The slider */
    .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #ccc;
        -webkit-transition: 0.4s;
        transition: 0.4s;
    }

    .slider:before {
        position: absolute;
        content: "";
        height: 40px;
        width: 40px;
        left: 0px;
        bottom: 4px;
        top: 0;
        bottom: 0;
        margin: auto 0;
        -webkit-transition: 0.4s;
        transition: 0.4s;
        box-shadow: 0 0px 15px #2020203d;
        background: white;
        background-repeat: no-repeat;
        background-position: center;
    }

    input:checked+.slider {
        background-color: #2196f3;
    }

    input:focus+.slider {
        box-shadow: 0 0 1px #2196f3;
    }

    input:checked+.slider:before {
        -webkit-transform: translateX(24px);
        -ms-transform: translateX(24px);
        transform: translateX(24px);
        background: white;
        background-repeat: no-repeat;
        background-position: center;
    }

    /* Rounded sliders */
    .slider.round {
        border-radius: 34px;
    }

    .slider.round:before {
        border-radius: 50%;
    }

    #labelSlider {
        margin-left: 20px;
        vertical-align: bottom;
    }
</style>
