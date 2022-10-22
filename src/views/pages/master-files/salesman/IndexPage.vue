<template>
  <v-card id="user-list-card">
    <salesman-list-table></salesman-list-table>
  </v-card>
</template>
<script>
import SalesmanListTable from './SalesmanListTable.vue'

export default {
  components: {
    SalesmanListTable,
  },
  setup() {
    return {}
  },
}
</script>
