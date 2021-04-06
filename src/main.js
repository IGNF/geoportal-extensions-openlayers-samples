import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App.vue";

// composants
import TheCptGeneratorMap from "./components/router/TheCptGeneratorMap";
import TheCptJsdoc from "./components/router/TheCptJsdoc";

import VueLogger from 'vuejs-logger';

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

Vue.use(VueLogger, options);

Vue.use(VueRouter);

Vue.config.productionTip = false;

const router = new VueRouter({
    mode: 'history',
    base: __dirname,
    routes : [
        { path: '/jsdoc', component: TheCptJsdoc },
        { path: '/generator', component: TheCptGeneratorMap }
    ]
});

new Vue({
    router,
    render: h => h(App)
}).$mount("#app");
