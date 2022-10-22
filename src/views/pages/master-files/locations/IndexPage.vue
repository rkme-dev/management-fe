<template>
  <v-card id="user-list-card">
    <location-list-table></location-list-table>
  </v-card>
</template>
<script>
import LocationListTable from './LocationListTable.vue'

export default {
  components: {
    LocationListTable,
  },
  setup() {
    return {}
  },
}
</script>
