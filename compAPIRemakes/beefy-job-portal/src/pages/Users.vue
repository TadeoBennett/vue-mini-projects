<template>
  <q-page class="q-pa-md">
    <h3>Seeing Users</h3>
    <!-- display the error if there was an error getting the users -->
    <div v-if="error">There was a problem getting your results: {{ error }}</div>

    <!-- display the userlist if there are users -->
    <div v-if="users.length">
      <UserList :users="users">

      </UserList>
    </div>
    <div v-else>
      <PageLoader :loadMessage="loadMessage" v-if="showLoader">

      </PageLoader>
    </div>
  </q-page>
</template>

<script setup>

import { onMounted, ref } from "vue";
import UserList from 'src/components/Users/UserList.vue'
import getUsers from "../composables/getUsers"
import PageLoader from 'src/components/PageLoader.vue';

const loadMessage = ref('Loading users. Please give us a moment.');
const showLoader = ref(true)
const { users, error, load } = getUsers();
// load()

onMounted(() => {
  // Load users and manage loading state

  load().then(() => {
     if(error.value){
      console.log("FETCH REQUEST ERROR: " + error.value)
      showLoader.value = false
     }else{
      showLoader.value = false
     }
  }).catch(() => {
     console.log("error getting users from load")// Stop loading if an error occurs
  });
});

</script>

<style scoped>
.q-card-img-top {
  max-height: 150px;
  object-fit: cover;
}
</style>
