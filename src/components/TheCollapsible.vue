<!-- classe generique -->
<template>
    <button :id="name" type="button" class="collapsible">{{ title }}</button>
</template>

<script>

export default {
    name: "TheCollapsible",
    props: {
        name: String,
        title: String
    },
    mounted() {
        var el = document.getElementById(this.name);

        // collapse ?
        var nextEl = el.nextElementSibling;
        if (this.$attrs.active === "true" ) {
            nextEl.style.display = "block";
            el.classList.toggle("active");
        }else {
            nextEl.style.display = "none";
        }
        
        el.addEventListener("click", function() {
            this.classList.toggle("active");
            var netxEl = this.nextElementSibling;
            if (netxEl.style.display === "block") {
                netxEl.style.display = "none";
            } else {
                netxEl.style.display = "block";
            }
        });
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    /* Style the button that is used to open and close the collapsible content */
    .collapsible {
        background-color: #eee;
        color: #444;
        cursor: pointer;
        padding: 18px;
        margin-bottom: 5px;
        margin-top: 5px;
        width: 100%;
        border: none;
        text-align: left;
        outline: none;
        font-size: 15px;
    }

    /* Add a background color to the button if it is clicked on (add the .active class with JS), and when you move the mouse over it (hover) */
    .active, .collapsible:hover {
        background-color: #ccc;
    }

    .collapsible:after {
        content: '\02795'; /* Unicode character for "plus" sign (+) */
        font-size: 13px;
        color: white;
        float: right;
        margin-left: 5px;
    }

    .active:after {
        content: "\2796"; /* Unicode character for "minus" sign (-) */
    }
</style>
