<!-- classe generique -->
<template>
    <div class="">
        <h2>Pages disponibles</h2>
        <ul>
            <li><router-link to="/generator" class="button">Generateur de Carte {{ name }}</router-link></li>
            <li><router-link to="/jsdoc" class="button">Lien vers la JSDoc</router-link></li>
        </ul>
    </div>
</template>

<script>
export default {
  name: "TheRouter",
  props: {
    name: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
