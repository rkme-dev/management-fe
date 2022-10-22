<template>
  <v-card id="branches">
    <branch-table />
  </v-card>
</template>
<script>
import BranchTable from './BranchTable.vue'

export default {
  components: {
    BranchTable,
  },
  setup() {
    return {}
  },
}
</script>
