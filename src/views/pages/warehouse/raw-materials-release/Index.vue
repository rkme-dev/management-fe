<template>
  <v-card id="user-list-card">
    <RawMaterialListTable></RawMaterialListTable>
  </v-card>
</template>
<script>
import RawMaterialListTable from './ReleaseListTable.vue'

export default {
  components: {
    RawMaterialListTable,
  },
  setup() {
    return {}
  },
}
</script>
