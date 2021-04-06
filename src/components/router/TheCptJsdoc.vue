<!-- classe generique -->
<template>
    <div class="">
        <h2>JSDoc des extensions {{ name }}</h2>
        <iframe :src="source"></iframe>
    </div>
</template>

<script>

import { config } from "./../../config";

export default {
    name: "MyCptJsdoc",
    components: {},
    data () {
        return {
            source: config.project.jsdoc,
            name: config.project.library.name
        }
    },
    methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="css">
    iframe {
        width: 100%;
        height: 400px;
    }
</style>
