<template>
  <v-card id="role-list-card">
    <RoleListTable></RoleListTable>
  </v-card>
</template>
<script>
import RoleListTable from './RoleListTable.vue'

export default {
  components: {
    RoleListTable,
  },
  setup() {
    return {}
  },
}
</script>
