<template>
  <v-card id="user-list-card">
    <unit-packing-list-table></unit-packing-list-table>
  </v-card>
</template>
<script>
import UnitPackingListTable from './UnitPackingListTable.vue'

export default {
  components: {
    UnitPackingListTable,
  },
  setup() {
    return {}
  },
}
</script>
