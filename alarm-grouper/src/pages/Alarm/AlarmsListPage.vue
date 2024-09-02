<template>
  <q-layout view="lhr lpR lfr">
    <q-page-container>
      <div>
        <h4 class="q-my-lg">All Alarms</h4>
      </div>
      <div v-if="alarms.length">
        <AlarmList :alarms="alarms" />
      </div>
      <div v-else>
        There are no alarms. Use the button to add an alarm
      </div>
    </q-page-container>

  </q-layout>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import AlarmList from 'src/components/Alarm/AlarmList.vue';
import { useAlarmStore } from 'src/stores/AlarmStore';
import { onMounted } from 'vue';

const alarmStore = useAlarmStore()
alarmStore.getAlarms()

const {alarms} = storeToRefs(alarmStore)

onMounted(()=>{
  console.log("alarms:", alarms)
})

</script>

<style lang="scss" scoped>
</style>
