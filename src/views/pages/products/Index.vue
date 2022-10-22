<template>
  <v-card id="products-list-card">
    <ProductsListTable></ProductsListTable>
  </v-card>
</template>
<script>
import ProductsListTable from './ProductsListTable.vue'

export default {
  components: {
    ProductsListTable,
  },
  setup() {
    return {}
  },
}
</script>
