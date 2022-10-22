<template>
  <v-card id="department-list-card">
    <DepartmentListTable></DepartmentListTable>
  </v-card>
</template>
<script>
import DepartmentListTable from './DepartmentListTable.vue'

export default {
  components: {
    DepartmentListTable,
  },
  setup() {
    return {}
  },
}
</script>
