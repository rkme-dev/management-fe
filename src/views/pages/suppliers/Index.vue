<template>
  <v-card id="suppliers-list-card">
    <suppliers-list-table></suppliers-list-table>
  </v-card>
</template>
<script>
import SuppliersListTable from './SuppliersListTable.vue'

export default {
  components: {
    SuppliersListTable,
  },
  setup() {
    return {}
  },
}
</script>
