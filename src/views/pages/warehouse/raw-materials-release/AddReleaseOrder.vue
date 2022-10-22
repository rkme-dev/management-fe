<template>
  <v-card id="release-order-creation-card">
    <v-toolbar
      color="teal"
      dark
      outlined
    >
      <v-toolbar-title>Add New Purchase Order</v-toolbar-title>
    </v-toolbar>
    <release-form />
  </v-card>
</template>

<script>
import { mdiAccountOutline } from '@mdi/js'
import ReleaseForm from './ReleaseForm.vue'

export default {
  components: {
    ReleaseForm,
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
