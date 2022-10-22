<template>
  <v-card id="user-list-card">
    <vat-list-table></vat-list-table>
  </v-card>
</template>
<script>
import VatListTable from './VatListTable.vue'

export default {
  components: {
    VatListTable,
  },
  setup() {
    return {}
  },
}
</script>
