<!-- classe generique -->
<template>
    <div id="info">
        <p> Bibliothèque des extensions version {{version}} ( {{date}} )</p>
    </div>
</template>

<script>

export default {
    name: "TheVersion",
    props: {
        'version' : String, 
        'date' : String
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#info {
    padding: 5px;
    width: 100%;
    height: 20px;
    font-family: monospace;
}
</style>
