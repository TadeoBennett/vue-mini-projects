<template>
  <div class="row q-col-gutter-md q-mb-md">
    <div
      class="col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xl-2"
      v-for="job in jobs"
      :key="job.id"
    >
      <Job :job="job">
        <template v-slot:links>
          <router-link :to="{ name: 'JobDetails', params: { id: job.id } }">
            <q-btn flat label="Apply Now" />
            <q-btn flat label="View Details" />
          </router-link>
        </template>
      </Job>
    </div>
  </div>
</template>

<script setup>
import Job from "./Job.vue";
import { defineProps } from "vue";

const props = defineProps(["jobs"]);
</script>

<style>
</style>