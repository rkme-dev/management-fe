<template>
  <v-card id="purchase-order-list-card">
    <PhysicalCountListTable />
  </v-card>
</template>
<script>
import PhysicalCountListTable from './PhysicalCountListTable.vue'

export default {
  components: {
    PhysicalCountListTable,
  },
  setup() {
    return {}
  },
}
</script>