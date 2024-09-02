<template>
  <q-page class="q-pa-md">
    <div v-if="error">{{ error }}</div>
    <div v-if="user">
      <q-breadcrumbs class="text-grey breadcrumb" active-color="purple">
      <template v-slot:separator>
        <q-icon
          size="1.2em"
          name="arrow_forward"
          color="purple"
        />
      </template>
      <q-breadcrumbs-el label="Home" icon="home" :to="{name: 'Home'}" />
      <q-breadcrumbs-el label="Users" icon="work" :to="{name: 'UserList'}" />
      <q-breadcrumbs-el icon="navigation">
        <label for="">{{ user.name }} ({{ user.id }})</label>
      </q-breadcrumbs-el>
    </q-breadcrumbs>
      <div class="header">
        <q-img :src="user.image" :ratio="16 / 9" style="height: 500px;"/>
        <h2>{{ user.name }}</h2>
        <h4>{{ user.email }}</h4>
        <div style="font-size: 3em;">
          <q-icon name="location_on" style/>
          <span class="text-subtitle1 text-inline" style="font-size: 0.8em;">{{ user.location }}</span>
        </div>
      </div>
      <hr>
      <div class="experienceLevel" v-if="user.experienceLevel">
        Experience: {{ user.experienceLevel }}
      </div>
      <div class="experienceLevel" v-if="user.experienceLevel">
        Experience Needed: {{ user.experienceLevel }}
      </div>
      <div class="skill-list" v-if="user.skills">
        skills: 
        <span class="pill" v-for="(skill, index) in user.skills" :key="index">
          {{ skill }}
        </span>
      </div>
      <br>
      <div class="profileComplete" v-if="user.profileComplete">
        Profile Preparation Status: {{ user.profileComplete }}%
      </div>
      
      
    </div>
  </q-page>
</template>

<script setup>
import getUser from 'src/composables/getUser.js';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

// Access the 'id' parameter from the URL
const id = route.params.id;

const { user, error, load } = getUser(id);

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
