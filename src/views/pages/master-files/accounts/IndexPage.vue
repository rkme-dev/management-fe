<template>
  <v-card id="user-list-card">
    <account-list-table></account-list-table>
  </v-card>
</template>
<script>
import AccountListTable from './AccountListTable.vue'

export default {
  components: {
    AccountListTable,
  },
  setup() {
    return {}
  },
}
</script>
