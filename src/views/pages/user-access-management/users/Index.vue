<template>
  <v-card id="user-list-card">
    <UserListTable></UserListTable>
  </v-card>
</template>
<script>
import UserListTable from './UserListTable.vue'

export default {
  components: {
    UserListTable,
  },
  setup() {
    return {}
  },
}
</script>
