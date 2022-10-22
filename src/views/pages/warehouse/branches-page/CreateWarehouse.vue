<template>
  <div>
    <v-card
      id="client-creation-card"
      class="mb-3"
    >
      <v-card class="pa-3 mt-2">
        <v-card-title>Create Warehouse Branch</v-card-title>
        <warehouse-form />
      </v-card>
    </v-card>
  </div>
</template>

<script>
import WarehouseForm from './WarehouseForm.vue'

export default {
  name: 'CreateWarehouse',
  components: {
    WarehouseForm,
  },
}
</script>

<style scoped>

</style>
