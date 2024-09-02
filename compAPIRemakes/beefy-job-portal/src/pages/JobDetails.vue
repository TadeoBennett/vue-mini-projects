<template>
  <q-page class="q-pa-md">
    <div v-if="error">{{ error }}</div>
    <div v-if="job">
      <q-breadcrumbs class="text-grey breadcrumb" active-color="purple">
      <template v-slot:separator>
        <q-icon
          size="1.2em"
          name="arrow_forward"
          color="purple"
        />
      </template>
      <q-breadcrumbs-el label="Home" icon="home" :to="{path: '/'}" />
      <q-breadcrumbs-el label="Jobs" icon="work" :to="{name: 'JobList'}" />
      <q-breadcrumbs-el icon="navigation">
        <label for="">{{ job.title }} ({{ job.id }})</label>
      </q-breadcrumbs-el>
    </q-breadcrumbs>
      <div class="header">
        <q-img :src="job.image" :ratio="16 / 9" style="height: 500px;"/>
        <h2>{{ job.title }}</h2>
        <h4>{{ job.company }}</h4>
        <div style="font-size: 3em;">
          <q-icon name="location_on" style/>
          <span class="text-subtitle1 text-inline" style="font-size: 0.8em;">{{ job.location }}</span>
        </div>
      </div>
      <hr>
      <div class="type" v-if="job.type">
        Type: {{ job.type }}
      </div>
      <div class="salary" v-if="job.salary">
        salary: {{ job.salary }}
      </div>
      <div class="postedDate" v-if="job.postedDate">
        Posted Date: {{ job.postedDate }}
      </div>
      <div class="experienceLevel" v-if="job.experienceLevel">
        Experience Needed: {{ job.experienceLevel }}
      </div>
      <div class="skill-list" v-if="job.skills">
        skills: 
        <span class="pill" v-for="(skill, index) in job.skills" :key="index">
          {{ skill }}
        </span>
      </div>
      <br>
      <div class="details" v-if="job.details">
        Details: {{ job.details }}
      </div>
      
      
    </div>
  </q-page>
</template>

<script setup>
import getJob from 'src/composables/getJob.js';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

// Access the 'id' parameter from the URL
const id = route.params.id;

const { job, error, load } = getJob(id);

onMounted(() => {
  load();
  console.log("mounted the details page");
});

</script>

<style>
.pill{
  background: lightblue;
  padding: 6px 13px 6px 13px;
  margin: 0 3px 0px 3px;
  border-radius: 10px;

}
.skill-list{
  margin-top: 5px;
}

.breadcrumb{
  margin-top: 10px;
  margin-bottom: 20px;
  font-size: 1.5em;
}

</style>
