<template>
  <v-card id="clients-list-card">
    <ClientsListTable></ClientsListTable>
  </v-card>
</template>
<script>
import ClientsListTable from './ClientsListTable.vue'

export default {
  components: {
    ClientsListTable,
  },
  setup() {
    return {}
  },
}
</script>
