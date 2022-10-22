<template>
  <div>
    <v-card
      id="client-creation-card"
      class="mb-3"
    >
      <v-card class="pa-3 mt-2">
        <v-card-title>Edit Warehouse Branch</v-card-title>
        <warehouse-form :warehouse="warehouse" />
      </v-card>
    </v-card>
  </div>
</template>

<script>
import store from '@/store'
import { computed, onMounted } from '@vue/composition-api/dist/vue-composition-api'
import WarehouseForm from './WarehouseForm.vue'

export default {
  name: 'CreateWarehouse',
  components: {
    WarehouseForm,
  },
  setup(props, context) {
    const warehouseId = context.root.$route.params.id

    onMounted(async () => {
      await store.dispatch('WarehouseStore/getWarehouse', warehouseId)
    })

    const warehouse = computed(() => store.state.WarehouseStore.warehouse)

    return {
      warehouse,
    }
  },
}
</script>

<style scoped>

</style>
