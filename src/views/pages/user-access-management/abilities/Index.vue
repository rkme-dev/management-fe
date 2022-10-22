<template>
  <v-card id="role-list-card">
    <AbilityListTable></AbilityListTable>
  </v-card>
</template>
<script>
import AbilityListTable from './AbilityListTable.vue'

export default {
  components: {
    AbilityListTable,
  },
  setup() {
    return {}
  },
}
</script>
