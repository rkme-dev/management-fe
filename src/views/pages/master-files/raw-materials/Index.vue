<template>
    <v-card id="raw-materials-list-card">
      <raw-materials-list-table></raw-materials-list-table>
    </v-card>
</template>
<script>
  import RawMaterialsListTable from './RawMaterialsListTable.vue'
  
  export default {
    components: {
      RawMaterialsListTable,
    },
    setup() {
      return {}
    },
  }
</script>
  