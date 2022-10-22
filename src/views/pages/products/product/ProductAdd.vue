<template>
  <v-card id="client-creation-card">
    <v-toolbar
      color="teal"
      dark
      outlined
    >
      <v-toolbar-title>Add New Raw Material</v-toolbar-title>
    </v-toolbar>
    <product-info :mode="'create'"></product-info>
  </v-card>
</template>

<script>
import { mdiAccountOutline } from '@mdi/js'
import ProductInfo from './ProductInfo.vue'

export default {
  components: {
    ProductInfo,
  },
  setup() {
    return {
      icons: {
        mdiAccountOutline,
      },
    }
  },
}
</script>
