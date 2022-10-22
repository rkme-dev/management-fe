<template>
  <v-card id="user-list-card">
    <list-table></list-table>
  </v-card>
</template>
<script>
import ListTable from './ListTable.vue'

export default {
  components: {
    ListTable,
  },
  setup() {
    return {}
  },
}
</script>
