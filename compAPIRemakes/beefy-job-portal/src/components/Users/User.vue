<template>
  <q-card>
    <q-img :src="user.image" alt="Company Logo" class="q-card-img-top" />
    <q-card-section>
      <div class="text-h6">{{ user.name }}</div>
      <div class="text-subtitle2">{{ user.experienceLevel }}</div>
      <p>{{ user.gender }}</p>
    </q-card-section>
    <q-card-actions align="right">
      <div class="actions">
        <slot name="links"></slot>
      </div>
    </q-card-actions>
  </q-card>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps(["user"]);
</script>

<style>
</style>