<template>
  <v-card id="sales-orders-list-card">
    <DrListTable></DrListTable>
  </v-card>
</template>
<script>
import DrListTable from './DrsListTable.vue'

export default {
  components: {
    DrListTable,
  },
  setup() {
    return {}
  },
}
</script>
