<template>
  <q-card>
    <q-img :src="job.image" alt="Company Logo" class="q-card-img-top" />
    <q-card-section>
      <div class="text-h6">{{ job.title }}</div>
      <div class="text-subtitle2">{{ job.company }}</div>
      <div class="text-subtitle1">{{ job.location }}</div>
      <p>
        <i>{{ snippet }}</i>
      </p>
    </q-card-section>
    <q-card-actions align="center">
      <div class="actions">
        <slot name="links"></slot>
      </div>
    </q-card-actions>
  </q-card>
</template>

<script setup>
import { defineProps, computed } from "vue";

const props = defineProps(["job"]);

const snippet = computed(() => {
  return props.job.details.substring(0, 50) + "...";
});
</script>

<style>
</style>