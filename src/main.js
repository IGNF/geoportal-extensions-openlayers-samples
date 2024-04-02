import { createApp } from 'vue';
import { createMemoryHistory, createRouter } from 'vue-router'
import App from "./App.vue";

// composants
import TheCptGeneratorMap from "./components/router/TheCptGeneratorMap";
import TheCptJsdoc from "./components/router/TheCptJsdoc";

// logger
import VueLogger from 'vuejs3-logger';

// lib JS
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import vuePlugin from "@highlightjs/vue-plugin";

hljs.registerLanguage('javascript', javascript);

const isProduction = process.env.NODE_ENV === 'production';
 
const options = {
    isEnabled: !isProduction,
    logLevel : 'debug',
    stringifyArguments : false,
    showLogLevel : true,
    showMethodName : true,
    separator: '|',
    showConsoleColors: true
};


const app =createApp(App);

app.use(vuePlugin);

app.use(VueLogger, options);

const router = new createRouter({
    history: createMemoryHistory(),
    routes : [
        { path: '/jsdoc', component: TheCptJsdoc },
        { path: '/generator', component: TheCptGeneratorMap }
    ]
});

app.use(router);
app.mount('#app');
