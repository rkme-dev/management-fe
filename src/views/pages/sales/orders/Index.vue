<template>
  <v-card id="sales-orders-list-card">
    <OrdersListTable></OrdersListTable>
  </v-card>
</template>
<script>
import OrdersListTable from './OrdersListTable.vue'

export default {
  components: {
    OrdersListTable,
  },
  setup() {
    return {}
  },
}
</script>
