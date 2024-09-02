<template>
  <div class="q-pa-md">
    <div class="heading text-center q-mb-lg">
      <h2 class="text-h2 text-weight-bolder q-mb-sm">
        WELCOME TO THE JOB PORTAL
      </h2>
      <span class="text-subtitle1">
        Getting hired made easier
      </span>
    </div>
    <q-carousel
    v-model:fullscreen="isFullscreen"
    thumbnails
      swipable
      arrows
      animated
      v-model="slide"
      height="400px"
    >
      <q-carousel-slide @click="toggleFullscreen" name="first" img-src="https://cdn.quasar.dev/img/mountains.jpg">
        <div class="absolute-full flex flex-center column custom-caption">
          <div class="text-h4">Find Jobs and Send Applications</div>
          <div class="text-subtitle1">The cool UI does it all man</div>
        </div>
      </q-carousel-slide>
      <q-carousel-slide @click="toggleFullscreen" name="second" img-src="https://cdn.quasar.dev/img/parallax1.jpg">
        <div class="absolute-full flex flex-center column custom-caption">
          <div class="text-h4">Hire Candidates</div>
          <div class="text-subtitle1">find the best person for the role</div>
        </div>
      </q-carousel-slide>
      <q-carousel-slide @click="toggleFullscreen" name="third" img-src="https://cdn.quasar.dev/img/parallax2.jpg">
        <div class="absolute-full flex flex-center column custom-caption">
          <div class="text-h4">Find Companies</div>
          <div class="text-subtitle1">Search for the best companies</div>
        </div>
      </q-carousel-slide>
    </q-carousel>
  </div>
</template>

<script setup>
import { is } from 'quasar';
import { ref } from 'vue'

const slide = ref("first")
const isFullscreen = ref(false)

const toggleFullscreen = () =>{
  isFullscreen.value = !isFullscreen.value
}

// export default {
//   setup () {
//     return {
//       slide: ref('first')
//     }
//   }
// }
</script>

<style scoped>
.custom-caption {
  text-align: center;
  padding: 20px;
  color: white;
  background-color: rgba(0, 0, 0, .3);
}
</style>
