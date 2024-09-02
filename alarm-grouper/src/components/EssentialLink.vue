<template>
  <q-item
    clickable
    tag="a"
    class="text-white"
    :to="props.link"
  >
    <q-item-section
      v-if="props.icon"
      avatar
    >
      <q-icon :name="props.icon" />
    </q-item-section>

    <q-item-section class="nav-link-item">
      <q-item-label>{{ props.title }}</q-item-label>
      <q-item-label class="nav-link-caption" caption>{{ props.caption }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<style>


</style>

<script setup>
defineOptions({
  name: 'EssentialLink'
})

const props = defineProps({
  title: {
    type: String,
    required: true
  },

  caption: {
    type: String,
    default: ''
  },

  link: {
    type: String,
    default: '#'
  },

  icon: {
    type: String,
    default: ''
  }
})
</script>
