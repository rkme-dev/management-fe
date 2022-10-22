<template>
  <v-card id="purchase-order-creation-card">
    <v-toolbar
      color="teal"
      dark
      outlined
    >
      <v-toolbar-title>Add New Purchase Order</v-toolbar-title>
    </v-toolbar>
    <purchase-order-info :mode="'create'"></purchase-order-info>
  </v-card>
</template>

<script>
import { mdiAccountOutline } from '@mdi/js'
import PurchaseOrderInfo from './PurchaseOrderInfo.vue'

export default {
  components: {
    PurchaseOrderInfo,
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
