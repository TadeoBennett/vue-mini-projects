<template>
</template>

<script setup>
import { useQuasar } from "quasar";
import { ref, onBeforeUnmount, onMounted } from "vue";

const $q = useQuasar();

const props = defineProps([
  'loadMessage'
])

const startLoading = ()=> {
  $q.loading.show({
    message: props.loadMessage || 'Loading results. This may take a moment...',
  });
}

const stopLoading = () => {
  $q.loading.hide();
}

onMounted(()=>{
  console.log("mounting the loader...")
  startLoading()
})

onBeforeUnmount(() => {
  console.log("unmounting the loader...")
  stopLoading();
});
</script>
<style>
</style>