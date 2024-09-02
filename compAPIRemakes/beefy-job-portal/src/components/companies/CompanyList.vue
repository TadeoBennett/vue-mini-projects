<template>
  <div class="row q-col-gutter-md q-mb-md">
        <div
          class="col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xl-2"
          v-for="job in jobs"
          :key="job.id"
        >
          <q-card>
            <q-img
              :src="job.image"
              alt="Company Logo"
              class="q-card-img-top"
            />
            <q-card-section>
              <div class="text-h6">{{ job.title }}</div>
              <div class="text-subtitle2">{{ job.company }}</div>
              <p>{{ job.description }}</p>
            </q-card-section>
            <q-card-actions align="right">
              <q-btn flat label="View Details" @click="goToJobDetail(job.id)" />
            </q-card-actions>
          </q-card>
        </div>
      </div>
</template>

<script setup>

import { ref } from 'vue';

const props = defineProps([
    'jobs'
])


</script>

<style>

</style>