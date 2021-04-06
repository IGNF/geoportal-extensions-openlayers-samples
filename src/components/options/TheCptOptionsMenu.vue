<!-- classe generique -->
<template>
     <div class="tab">
        <button 
            type="button"
            class="tablinks button-menu" 
            v-for="(name, index) in names"
            :class="{ 'active': index === 0 }"
            :ref="'tablinks_'+index"
            v-bind:key="index" 
            v-on:click="onClickButtonOpenOptions($event, name)"><span>{{ name }} </span></button>
    </div>
</template>

<script>

export default {
    name: "TheCptOptionsMenu",
    props: {
        names : Array
    },
    mounted() {
        // le 1er element est actif !
        this.$refs["tablinks_0"][0].click();
    },
    methods: {
        onClickButtonOpenOptions(evt, name) {

            // Get all elements with class="tabcontent" and hide them
            var tabcontent = this.$el.parentElement.getElementsByClassName("tabcontent");
            for (var i = 0; i < tabcontent.length; i++) {
                tabcontent[i].style.display = "none";
            }

            // Get all elements with class="tablinks" and remove the class "active"
            for (const tablinks in this.$refs) {
                if (Object.hasOwnProperty.call(this.$refs, tablinks)) {
                    const element = this.$refs[tablinks][0];
                    element.className = element.className.replace(" active", "");
                }
            }

            // Show the current tab, and add an "active" class to the link that opened the tab
            document.getElementById(name).style.display = "block";
            evt.currentTarget.className += " active";
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    * {box-sizing: border-box}

    /* Style the tab */
    .tab {
        float: left;
        border: 1px solid #ccc;
        background-color: #f1f1f1;
        width: 20%;
        height: 300px;
        overflow: auto;
    }

    /* Style the buttons that are used to open the tab content */
    .tab button {
        display: block;
        background-color: inherit;
        color: black;
        padding: 10px 10px;
        width: 100%;
        border: none;
        outline: none;
        text-align: left;
        cursor: pointer;
        transition: 0.3s;
        overflow-wrap: break-word;
    }

    /* Change background color of buttons on hover */
    .tab button:hover {
        background-color: #41afca;
    }

    /* Create an active/current "tab button" class */
    .tab button.active {
        background-color: #3796AD;
    }

    .button-menu {
        border-radius: 4px;
    }

    .button-menu span {
        cursor: pointer;
        display: inline-block;
        position: relative;
        transition: 0.5s;
    }

    .button-menu span:after {
        content: '\00bb';
        position: absolute;
        opacity: 0;
        top: 0;
        right: -20px;
        transition: 0.5s;
    }

    .button-menu:hover span {
        padding-right: 25px;
    }

    .button-menu:hover span:after {
        opacity: 1;
        right: 0;
    }
</style>
