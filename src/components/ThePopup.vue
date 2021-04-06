<!-- classe generique -->
<template>
    <transition name="modal">
        <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-container">
                    <div class="modal-close" @click="$emit('close')">&times;</div>

                    <div class="modal-header">
                        <slot name="header">
                        default header
                        </slot>
                    </div>

                    <div class="modal-body">
                        <slot name="body">
                        default body
                        </slot>
                    </div>

                    <div class="modal-footer">
                        <slot name="footer">
                        default footer
                        </slot>
                        <button class="modal-default-button" @click="$emit('close')">
                            Fermer
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    name: "ThePopup"
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 450px;
  height: 60%;
  margin: 0px auto;
  padding: 20px 30px;
  overflow: scroll;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header {
  margin-top: 0;
  color: #3796AD;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  display: block;
  background: #3796AD;
  margin-top: 1rem;
}

.modal-close {
  position: fixed;
  top: 10px;
  right: 10px;
  color: #aaa;
  font-size: 28px;
  font-weight: bold;
}

.modal-close:hover,
.modal-close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>
