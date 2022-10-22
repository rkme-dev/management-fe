<template>
  <v-card id="client-creation-card">
    <v-toolbar
      color="teal"
      dark
      outlined
    >
      <v-toolbar-title>Add New Client Information</v-toolbar-title>
    </v-toolbar>
    <client-info :mode="'create'"></client-info>
  </v-card>
</template>

<script>
import {mdiAccountOutline} from '@mdi/js'
import ClientInfo from './ClientInfo.vue'

export default {
  components: {
    ClientInfo,
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
