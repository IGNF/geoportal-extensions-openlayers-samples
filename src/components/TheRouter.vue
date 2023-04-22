<!-- classe generique -->
<template>
    <div class="feature">
        <router-link to="/generator" class="button"><img src="./../assets/map.png" alt="IGN" width="250" height="250"></router-link>
        <router-link to="/jsdoc" class="button"><img src="./../assets/jsdoc.png" alt="IGN" width="250" height="250"></router-link>
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
<style scoped>
.feature {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
}
</style>
