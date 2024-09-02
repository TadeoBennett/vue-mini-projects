<template>
  <q-layout view="lHh Lpr lFf" class="q-pa-lg">
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

        <q-toolbar-title class="">
          <div class="flex">
            <router-link :to="{ path: '/' }" class="home-link">
              <div class="row no-wrap items-center">
                <div class="col-auto q-ml-sm">
                  <img src="/images/fish.png" alt="" width="40" />
                </div>
                <div class="col-auto q-ml-sm">Alarm Grouper</div>
              </div>
            </router-link>
          </div>
        </q-toolbar-title>

        <div>
          <q-btn flat round dense icon="notifications_active" />
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      :breakpoint="767"
      :width="275"
      class="bg-primary"
    >
      <q-list>
        <q-item-label header>
          <div class="row no-wrap items-center q-gutter-sm">
            <div>
              <q-icon
              name="menu"
              class="toggleSidebarMenu"
              @click="toggleLeftDrawer">
            </q-icon>
            </div>
            <q-separator vertical inset />
            <router-link :to="{ name: 'Home' }" class="home-link">
              <div class="row no-wrap items-center">
                <div class="col-auto q-ml-sm">
                  <img src="/images/fish.png" alt="" width="40" />
                </div>
                <div class="col-auto q-ml-sm">Alarm Grouper</div>
              </div>
            </router-link>
          </div>
        </q-item-label>

        <EssentialLink
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
import { ref } from "vue";
import EssentialLink from "components/EssentialLink.vue";

defineOptions({
  name: "MainLayout",
});

const linksList = [
  {
    title: "Home",
    caption: "",
    icon: "home",
    link: "/",
  },
  {
    title: "About",
    caption: "Learn about this app's dev",
    icon: "info",
    link: "/about",
  },
  {
    title: "Categories",
    caption: "Manage your alarm categories",
    icon: "category",
    link: "/categories",
  },
  {
    title: "All Alarms",
    caption: "Manage your alarms",
    icon: "alarm",
    link: "/alarms",
  },
  {
    title: "Active Alarms",
    caption: "Manage your active alarms",
    icon: "alarm_on",
    link: "/alarms/active",
  },
  {
    title: "Sounds",
    caption: "Manage your alarm sounds",
    icon: "graphic_eq",
    link: "/sounds",
  }
];

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
