<template>
    <v-card id="stock-requests">
      <stock-request-table />
    </v-card>
  </template>
  <script>
  import StockRequestTable from './StockRequestTable.vue'
  
  export default {
    components: {
      StockRequestTable,
    },
  }
  </script>
  