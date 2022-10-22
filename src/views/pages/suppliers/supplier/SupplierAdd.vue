<template>
  <v-card id="client-creation-card">
    <v-toolbar
      color="teal"
      dark
      outlined
    >
      <v-toolbar-title>Add New Supplier</v-toolbar-title>
    </v-toolbar>
    <supplier-info :mode="'create'"></supplier-info>
  </v-card>
</template>

<script>
import { mdiAccountOutline } from '@mdi/js'
import SupplierInfo from './SupplierInfo.vue'

export default {
  components: {
    SupplierInfo,
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
