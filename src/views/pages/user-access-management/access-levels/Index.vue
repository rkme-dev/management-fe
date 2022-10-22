<template>
  <v-card id="department-list-card">
    <AccessLevelListTable></AccessLevelListTable>
  </v-card>
</template>
<script>
import AccessLevelListTable from './AccessLevelListTable.vue'

export default {
  components: {
    AccessLevelListTable,
  },
  setup() {
    return {}
  },
}
</script>
