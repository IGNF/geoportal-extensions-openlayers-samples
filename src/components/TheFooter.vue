<!-- classe generique -->
<template>
    <footer>
        <div class="header-content">
            <p>
                <img class="logo" src="./../assets/logoIGNsmall.png" alt="IGN" title="IGN" width="51" height="25">
                <img class="baseline" src="./../assets/baselineIGN.png" alt="L'information grandeur nature" title="L'information grandeur nature" width="256" height="21">
            </p>
        </div>
    </footer>
</template>

<script>
export default {
  name: "TheFooter",
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    footer {
        margin-top: 5px;
        padding: 10px;
        background-color: #71767A;
        color: #FFF;
        font-size: 14px;
    }

    footer p {
        width: 60%;
        margin-left: 10%;
    }

    footer p:not(:first-child) {
        /* margin-top: 1em; */
    }

    footer p img:first-child {
        margin-right: 15px;
    }
</style>
