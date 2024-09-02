<template>
  <h1>{{ title }}</h1>
  <!-- this app needs two modals (create a modal component) -->

  <div v-if="showModal">
    <Modal theme="sale" @close="toggleModal">
      <!-- two button links are passed to be displayed in the modal (child component) -->
      <template v-slot:links>
        <a href="#">sign up now</a>
        <a href="#">more info</a>
      </template>
      <h1>Ninja Giveaway</h1>
      <p>Grab your ninja swag for half price</p>
    </Modal>
  </div>
  <div v-if="showModal2">
    <Modal theme="nostock" @close="toggleModal2">
      <!-- link to close the modal is passed to the modal(child component) -->
      <template v-slot:links>
        <a href="#" @click="toggleModal2">Close Modal</a>
      </template>
      <h1>Out of stock</h1>
      <p>Try to find another product</p>
    </Modal>
  </div>

  <button @click="toggleModal">showModal</button>
  <button @click="toggleModal2">showModal2</button>
</template>
<script setup>
// imports -------------------
import Modal from "./components/Modal.vue";
import { ref } from "vue";

// properties ---------------
const title = ref("Remake of Modal Project with Composition API"),
  header = ref("Sign up for the GIVEAWAY!"),
  text = ref("Grab an item now for half off"),
  showModal = ref(false),
  showModal2 = ref(false);

// methods --------------------
const toggleModal = () => {
  showModal.value = !showModal.value;
};
const toggleModal2 = () => {
  showModal2.value = !showModal2.value;
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
