<template>
  <v-card id="user-list-card">
    <term-list-table></term-list-table>
  </v-card>
</template>
<script>
import TermListTable from './TermListTable.vue'

export default {
  components: {
    TermListTable,
  },
  setup() {
    return {}
  },
}
</script>
