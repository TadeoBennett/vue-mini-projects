<template>
    <div class="block" v-if="showBlock" @click="stopTimer">
        Click Me
    </div>
</template>

<script setup>
// imports --------------------
import { onMounted, ref, defineEmits } from 'vue';


// properties -----------------
const showBlock = ref(false)           //controls when the block component is shown
const timer = ref(null)                //a timer to control the countdown of the delay
const reactionTime = ref(null)         //saves the reactionTime to be sent back as the score to the results block

// methods -------------------
const props = defineProps([
    'delay'
])
onMounted(()=>{
    console.log("block mounted with delay of " + props.delay)

    // set what happens when the timer ends
    setTimeout(()=>{
        showBlock.value = true  //the Block component gets displayed
        startTimer()
    }, props.delay) //set the timeout duration as the delay     

})

const startTimer = ()=>{
    console.log("delay ended. starting reaction timer")
    timer.value = setInterval(()=>{      //interval runs this function every 10milliseconds
        reactionTime.value += 10         //timing the reaction time in steps of 10 milli seo=conds
    },10)
}

const emit = defineEmits(['stopTimer'])
const stopTimer = () => {
    clearInterval(timer.value)                               //clear the interval of the timer     
    console.log("going to parent. stopped timer with speed: " + reactionTime.value)
    emit('stopTimer', reactionTime.value)
}

</script>

<style>
.block{
    width: 400px;
    border-radius: 20px;
    background: #0faf87;
    color: white;
    text-align: center;
    padding: 100px 0;
    margin: 0 auto;
    margin-top: 40px;
}
</style>