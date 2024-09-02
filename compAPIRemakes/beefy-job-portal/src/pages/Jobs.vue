<template>
  <q-page class="q-pa-md">
    <h3>Seeing Jobs</h3>
    <!-- display the error if there was an error getting the jobs -->
    <div v-if="error">There was a problem getting your results: {{ error }}</div>

    <!-- display the joblist if there are jobs -->
    <div v-if="jobs.length">
      <JobList :jobs="jobs">

      </JobList>
    </div>
    <div v-else>
      <PageLoader :loadMessage="loadMessage" v-if="showLoader">

      </PageLoader>
    </div>
  </q-page>
</template>

<script setup>

import { onMounted, ref } from "vue";
import JobList from 'src/components/Jobs/JobList.vue'
import getJobs from "../composables/getJobs"
import PageLoader from 'src/components/PageLoader.vue';

const loadMessage = ref('Loading jobs. Please give us a moment.');
const showLoader = ref(true)
const { jobs, error, load } = getJobs();
// load()

onMounted(() => {
  // Load jobs and manage loading state

  load().then(() => {
     if(error.value){
      console.log("FETCH REQUEST ERROR: " + error.value)
      showLoader.value = false
     }else{
      showLoader.value = false
     }
  }).catch(() => {
     console.log("error getting jobs from load")// Stop loading if an error occurs
  });
});

</script>

<style scoped>
.q-card-img-top {
  max-height: 150px;
  object-fit: cover;
}
</style>
