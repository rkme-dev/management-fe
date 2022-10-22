<template>
  <v-card id="purchase-order-list-card">
    <PurchaseOrderListTable></PurchaseOrderListTable>
  </v-card>
</template>
<script>
import PurchaseOrderListTable from './PurchaseOrderListTable.vue'

export default {
  components: {
    PurchaseOrderListTable,
  },
  setup() {
    return {}
  },
}
</script>
