<template>
    <q-card class="my-card" flat bordered
    :style="{ backgroundColor: card.color }"
    >
      <q-card-section horizontal>

        <!-- <slot name="dashContent">

        </slot> -->
        <q-card-section class="q-pt-xs">
          <div class="text-h5 q-mt-sm q-mb-xs">{{ card.title }}</div>

          <q-separator class="q-mb-sm"></q-separator>
          <div class="text-overline text-dark text-weight-bolder dashcard-value">
            {{ card.value }}
          </div>
        </q-card-section>

        <!-- <q-card-section class="col-5 flex flex-center">
          <q-img
            class="rounded-borders"
            src="https://cdn.quasar.dev/img/parallax2.jpg"
          />
        </q-card-section> -->
      </q-card-section>

      <q-separator />

      <q-card-actions>
        <q-btn flat color="primary">
          <q-icon name="visibility" class="q-mr-sm"> </q-icon>
          Take a look
        </q-btn>
      </q-card-actions>
    </q-card>
</template>

<script setup>

const props = defineProps([
  'card'
])


</script>

<!-- Notice lang="scss" -->
<style lang="scss">
.red-1{
  background-color: $red-1;
}
</style>
