<template>
  <v-card id="user-list-card">
    <document-list-table></document-list-table>
  </v-card>
</template>
<script>
import DocumentListTable from './DocumentListTable.vue'

export default {
  components: {
    DocumentListTable,
  },
  setup() {
    return {}
  },
}
</script>
