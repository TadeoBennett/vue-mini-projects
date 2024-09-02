<template>
  <div class="row q-col-gutter-md q-mb-md">
    <div
      class="col-xs-12 col-sm-6 col-md-4 col-lg-3"
      v-for="(card, index) in getDashCards"
      :key="index"
    >
      <DashCard :card="card">
        <!-- You can add custom slot content here if needed -->
      </DashCard>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useDashStore } from "src/stores/DashCardStore"; // Ensure this path is correct
import DashCard from "./DashCard.vue";
import { storeToRefs } from "pinia";

const dashStore = useDashStore();
const { getDashCards } = storeToRefs(dashStore); // Renaming for clarity

onMounted(() => {
  console.log("dashStore: ", dashStore);
  console.log("dash cards: ", getDashCards);
});
</script>

<style>

</style>
