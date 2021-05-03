<!-- classe generique -->
<template>
    <div v-bind:id="options.name" class="tabcontent">
        <div class="check-option" v-if="options.auto === true">
            <input 
                type="checkbox" 
                v-model="active" 
                class=""
                :name="options.name"
                @change="onChangeCheckOption($event)"/>
            <span>Activation du widget "{{options.name}}"</span>
        </div>

        <fieldset>
            <legend v-if="options.auto === true">
                Options du widgets 
                <button class="button-exemple" type="button" @click="onClickShowExample">exemple</button>
            </legend>
            <div
                v-for="option in options.params" 
                v-bind:key="option.id" 
                :ref="options.name"
                class="button-options">
                    <TheCptOptionType 
                        v-bind:option="option"
                        v-bind:name="options.name"
                        v-bind:auto="options.auto"
                        @change-value=onChangeValue />
            </div>
        </fieldset>

        <ThePopup v-if="show" 
            @close="onClickClosePopup" 
            @copy="onClickCopyCode">
            <template v-slot:header>
                <h3>Exemples</h3>
            </template>
            <template v-slot:body>
                <pre>{{ exemple }}</pre>
            </template>
            <template v-slot:footer>
                ...
            </template>
        </ThePopup>
    </div>
</template>

<script>
import ThePopup from "./../ThePopup";
import TheCptOptionType from "./TheCptOptionType";

export default {
    name: "TheCptOptions",
    components : {
        ThePopup,
        TheCptOptionType
    },
    props: {
        options : Object
    },
    data() {
        return {
            show : false,
            exemple : "",
            active : false
        }
    },
    methods: {
        onChangeCheckOption(e) {
            this.$emit("check-option", {
                type : this.options.name,
                value : e.target.checked
            });
        },
        onChangeValue(e) {
            this.$log.debug(e);
        },
        onClickShowExample() {
            this.show = true;
            this.options.examples.forEach(ex => {
                this.exemple += ex;
            });
        },
        onClickClosePopup() {
            this.show = false;
        },
        onClickCopyCode() {
            var self = this;
            navigator.clipboard.writeText(this.exemple)
            .then(
                () => { self.$log.info("Copy to clipboard !");},
                () => { self.$log.error("Copy to clipboard not supported !"); }
            );
        },
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    /* Style the tab content */
    .tabcontent {
        padding: 0px 12px;
        border: 1px solid #ccc;
        border-left: none;
        height: 300px;
        overflow: auto;
    }

    /* row */
    .button-options {
        /* display: flex; */
        justify-content: space-around;
    }
    .button-options:after {
        content: "";
        display: table;
        clear: both;
    }

    .button-exemple {
        border-style: dotted;
        margin: 5px;
    }

    .check-option {
        padding: 10px;
    }

</style>
