<!-- classe generique -->
<template>
    <div v-if="isSection() === true" class="div-option-section">
        {{ option.name }}
    </div>
    <div v-else class="div-option">
        <button 
            type="button"
            class="button-option"
            :id="name + '.' + option.name"
            :title="option.description"
            v-on:click="onClickButtonOption($event)">
                {{ option.name }}
        </button>
        <div class="panel-option" :ref="name + '.' + option.name">
            <div v-if="option.type.names[0].toLowerCase() === 'string'">
                <input 
                    ref="type-option"
                    type="text" 
                    class="type-text-option" 
                    v-model="value"
                    @change="onChangeValue($event, false)" />
            </div>
            <div v-else-if="option.type.names[0].toLowerCase() === 'boolean'">
                <input 
                    ref="type-option"
                    type="checkbox" 
                    class="type-check-option" 
                    v-model="value"
                    @change="onChangeValue($event, false)" />
            </div>
            <div v-else-if="option.type.names[0].toLowerCase() === 'array'">
                <!-- <select v-model="options.select">
                    <option v-for="value in option.value" v-bind:key="value">
                        {{ value }}
                    </option>
                </select> -->
                <input 
                    ref="type-option"
                    type="text" 
                    class="type-array-option"
                    placeholder="[ ]"
                    v-model="value"
                    @change="onChangeValue($event, true)" />
            </div>
            <div v-else-if="option.type.names[0].toLowerCase() === 'array.<object>'">
                <input 
                    ref="type-option"
                    type="text" 
                    class="type-array-option"
                    placeholder="[{ }]"
                    v-model="value"
                    @change="onChangeValue($event, true)" />
            </div>
            <div v-else-if="option.type.names[0].toLowerCase() === 'number'">
                <input 
                    ref="type-option"
                    type="number" 
                    class="type-number-option" 
                    v-model="value"
                    @change="onChangeValue($event, false)" />
            </div>
            <div v-else-if="option.type.names[0].toLowerCase() === 'object'">
                <textarea 
                    ref="type-option"
                    v-model="value"
                    class="type-obj-option"
                    placeholder="{ }"
                    @change="onChangeValue($event, true)" ></textarea>
            </div>
            <div v-else-if="option.type.names[0].toLowerCase() === 'function'">
                <textarea 
                    ref="type-option"
                    v-model="value"
                    class="type-fct-option"
                    placeholder="{ }"
                    @change="onChangeValue($event, true)" ></textarea>
            </div>
            <div v-else>
                <textarea 
                    ref="type-option"
                    v-model="value"
                    class="type-obj-option"
                    placeholder="{ }"
                    @change="onChangeValue($event, true)" ></textarea>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: "TheCptOptionType",
    props: {
        option : Object,
        name : String,
        auto : Boolean
    },
    data() {
        return {
            value : null
        }
    },
    mounted() {
        this.$log.debug("default values", this.option.defaultvalue);
        if ("defaultvalue" in this.option) {
            var el = this.$refs["type-option"];
            if (el) {
                var value = this.option.defaultvalue;
                // hack...
                // ex. ""value"" -> "value"
                this.value = value;
                if (typeof value === "string" &&
                    value.indexOf('"') === 0 &&
                    value.lastIndexOf('"') === value.length -1) {
                        this.value = value.slice(1, -1);
                }
                switch (el.className) {
                    case "type-text-option":
                    case "type-number-option":
                        el.value = this.value;
                        if (!this.auto) {
                            this.onChangeValue(el, false);
                        }
                        break;
                    case "type-obj-option":
                    case "type-array-option":
                    case "type-fct-option":
                        el.value = this.value;
                         if (!this.auto) {
                            this.onChangeValue(el, true);
                        }
                        break;
                    case "type-check-option":
                        el.checked = this.value;
                         if (!this.auto) {
                            this.onChangeValue(el, false);
                        }
                        break;
                    default:
                        this.$log.warn("type de classe inconnu", el.className);
                }
            }
        }
    },
    methods: {
        /** computed */
        isSection() {
            return "section" in this.option && this.option.section;
        },
        /** event */
        onClickButtonOption(e) {
            var id = e.target.id; // ex. drawing.options.collapsed
            if (this.$refs[id].style.display === "none" || this.$refs[id].style.display === "") {
                this.$refs[id].style.display = "block";
            } else {
                this.$refs[id].style.display = "none";
            }
        },
        onChangeValue(e, convert) {
            // hack...
            if (this.value === null) {
                this.$log.error("Change value but it's null", this.option);
                return;
            }
            var data = (convert) ? this.value.replace(/'/g, '"') : this.value;
            this.option.value = data;
            // conversion string vers objet
            if (convert) {
                try {
                    this.option.value = JSON.parse(data);
                } catch (error) {
                    this.$log.error("Parsing error JSON.parse() :", this.option, error);
                }
            }
            this.$emit("change-value", {
                target : e,
                value : this.value, // string (brute)
                name : this.name,
                option : this.option
            });
        },
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

    .type-check-option,
    .type-text-option,
    .type-select-option,
    .type-array-option,
    .type-number-option,
    .type-fct-option,
    .type-obj-option {
        width: 100%;
        border: 1px solid #ccc;
        border-radius: 4px;
        box-sizing: border-box;
        resize: vertical;
    }

    .type-fct-option,
    .type-obj-option {
        padding: 5px;
    }
    .type-check-option {
        margin: 14px;
    }
    .type-check-option,
    .type-text-option,
    .type-select-option,
    .type-array-option,
    .type-number-option {
        padding: 12px;
    }

    .div-option-section {

    }

    .div-option {
        width: 100%;
        display: inline-block;
    }

    /* col-75% */
    .panel-option {
        display: none;
        float: left;
        width: 50%;
    }

    /* col-25% */
    .button-option {
        float: left;
        width: 50%;
        padding: 12px 12px 12px 0;
        overflow-wrap: break-word;
    }

    .button-option:hover {
        background-color: #3796AD;
    }

    @media screen and (max-width: 750px) {
        .button-option, .panel-option {
            width: 100%;
            margin-top: 0;
        }
    }
</style>
