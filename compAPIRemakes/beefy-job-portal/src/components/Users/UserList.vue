<template>
  <div class="row q-col-gutter-md q-mb-md">
    <div
      class="col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xl-2"
      v-for="user in users"
      :key="user.id"
    >
      <User :user="user">
        <template v-slot:links>
          <router-link :to="{ name: 'UserDetails', params: { id: user.id } }">
            <q-btn flat label="View Details" />
          </router-link>
        </template>
      </User>
    </div>
  </div>
</template>

<script setup>
import User from "./User.vue";
import { defineProps } from "vue";

const props = defineProps(["users"]);
</script>

<style>
</style>