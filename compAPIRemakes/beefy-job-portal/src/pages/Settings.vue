<template>
  <div class="q-pa-md">
    Change to dark mode?
    <q-checkbox v-model="val" @click="toggleDark" />
  </div>
</template>

<script setup>
import { useQuasar } from "quasar";

const $q = useQuasar();

// get status
console.log($q.dark.isActive); // true, false

// get configured status
console.log($q.dark.mode); // "auto", true, false

// set status
$q.dark.set(true); // or false or "auto"

const toggleDark = () => {
  // toggle
  $q.dark.toggle();
};
</script>

<style>
</style>