<template>
  <v-card id="sales-orders-list-card">
    <list-table></list-table>
  </v-card>
</template>
<script>
import ListTable from './ListTable.vue'

export default {
  components: { ListTable },
  setup() {
    return {}
  },
}
</script>
