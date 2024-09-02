<template>
  <h1>LETS TEST YOUR REFLEXES</h1>
  <div v-if="!isPlaying">
    <button @click="startGame">
        Click to begin
    </button>
  </div>
  <div v-else>
    Click the block as soon as it appears. Be ready!
  </div>

  <Block v-if="isPlaying" :delay="delay" @stopTimer="endGame"></Block>
  <!-- only the display when the showResults is true (after the user clicked the Block) -->
  <Results v-if="showResults" :theme="theme" :resultText="resultText" :score="score"></Results >
</template>

<script setup>
// imports ------------------------
import Block from './components/Block.vue';  
import Results from './components/Results.vue';
import {ref} from 'vue'


// properties ---------------------
const isPlaying = ref(false),       //checks if the user is still playing
  delay = ref(null),                //tracks the time for the block to be displayed
  score = ref(null),                 //saves the reaction time of the user
  showResults = ref(false),
  theme = ref(""),
  resultText = ref("")

// methods -------------------------
const startGame = () => {
  //start the timer for the game
  delay.value = 2000 + Math.random() * 5000
  isPlaying.value = true;
  showResults.value = false;
  console.log("started game; delay time ("+ delay.value + ") sent to block component")
}

const endGame = (reactionTime) =>{
  isPlaying.value = false
  score.value = reactionTime
  
  // now lets set the theme based on the score
  setThemeAndResultText(score.value)

  // display the Results component
  showResults.value = true
}

const setThemeAndResultText = (score)=>{
  if (score <= 260) {
    theme.value = "fast"
    resultText.value = "Blazing Fast. Nice!"
  }else if (score <= 320) {
    theme.value = 'slow'
    resultText.value = "Not bad tho"
  }else{
    theme.value = "crap"
    resultText.value = "Needs lots of training"
  }
}


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
