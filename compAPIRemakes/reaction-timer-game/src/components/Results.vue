<template>
    <!-- displays the score -->
  <p>Reaction Time: {{ score }}</p>

  <!-- displays the result with the appropriate theme applied depending on the score/result -->
  <div :class="props.theme">
    {{ resultText }}
  </div>
</template>

<script setup>
// imports ---------------------
import { ref, onMounted } from 'vue';

const props = defineProps([
    'resultText',
    'theme',
    'score'
])

// methods ---------------------
// onMounted = ()=>{

// }




</script>

<style>

/* styles are dependent on theme applied after the results are gotten (after the user clicks the block) */
.fast {
  color: green;
  text-transform: uppercase;
}
.slow {
  color: orange;
}
.crap {
  color: red;
}
.fast,
.slow,
.crap {
  margin: 40px;
  padding: 20px;
  border: 1px solid lightgray;
  text-decoration: underline;
}
button{
    background-color: cadetblue;
    border-color: white;
    color: white;
    padding: 10px;
    border-radius: 10px;
}
</style>