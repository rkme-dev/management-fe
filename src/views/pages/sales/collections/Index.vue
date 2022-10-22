<template>
  <v-card id="sales-orders-list-card">
    <CollectionListTable></CollectionListTable>
  </v-card>
</template>
<script>
import CollectionListTable from '@/views/pages/sales/collections/CollectionListTable.vue'

export default {
  components: { CollectionListTable },
  CollectionListTable: {
    CollectionListTable,
  },
  setup() {
    return {}
  },
}
</script>
