<template>
  <v-card id="user-list-card">
    <finish-product-list-table></finish-product-list-table>
  </v-card>
</template>
<script>
import FinishProductListTable from './FinishProductListTable.vue'

export default {
  components: {
    FinishProductListTable,
  },
  setup() {
    return {}
  },
}
</script>
