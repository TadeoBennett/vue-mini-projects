<template>
  <div class="alarm-list" >
    <div class="row q-col-gutter-md q-mb-md">
      <AlarmCard :alarm="alarm" v-for="(alarm, index) in alarms" :key="index">

      </AlarmCard>
    </div>
  </div>
</template>

<script setup>
import AlarmCard from './AlarmCard.vue';


const props = defineProps([
  'alarms'
])
</script>

<style>

</style>

