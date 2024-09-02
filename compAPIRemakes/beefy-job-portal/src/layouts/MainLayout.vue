<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          <div class="absolute-center">
            <q-icon name="public"></q-icon>
            <a href="/" class="app-title"> Beefy Job Portal</a>
          </div>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      class="bg-primary"
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
        class="text-white"
          header
        >
          Navigation Links
        </q-item-label>

        <NavLinks
        class="text-white"
          v-for="link in linksList"
          :key="link.title"
          v-bind="link"
        />

      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import NavLinks from 'src/components/NavLinks.vue'


defineOptions({
  name: 'MainLayout'
})

const linksList = [
  {
    title: 'Jobs',
    icon: 'work',
    link: '/jobs'
  },
  {
    title: 'Companies',
    icon: 'apartment',
    link: '/companies'
  },
  {
    title: 'Settings',
    icon: 'settings',
    link: '/settings'
  },
  {
    title: 'Users',
    icon: 'group',
    link: '/users'
  }
]

const leftDrawerOpen = ref(false)

function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>


<style scoped>
.app-title{
  text-decoration: none;
  color: white;
}
</style>