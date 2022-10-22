<template>
  <v-flex>
    <v-dialog
      v-model="dialog"
      width="900px"
      fullscreen
      max-width="900px"
      max-height="900px"
      height="500px"
      transition="dialog-bottom-transition"
    >
      <sales-order-form
        mode="Create"
        @submit="salesOrder"
      ></sales-order-form>
    </v-dialog>

    <v-dialog
      v-model="drDialog"
      width="900px"
      fullscreen
      max-width="900px"
      max-height="900px"
      height="500px"
      transition="dialog-bottom-transition"
    >
      <sales-dr-form
        mode="Create"
        @submit="salesDR"
      ></sales-dr-form>
    </v-dialog>

    <v-btn
      @click="salesOrder"
    >
      Create Sales Order
    </v-btn>
    <v-btn
      @click="salesDR"
    >
      Create Sales DR
    </v-btn>
  </v-flex>
</template>

<script>
import SalesOrderForm from '@/views/pages/sales/orders/SalesOrderForm.vue'
import SalesDrForm from '@/views/pages/sales/drs/SalesDrForm.vue'
import { ref } from '@vue/composition-api'

export default {
  name: 'Index',
  components: {
    SalesOrderForm,
    SalesDrForm,
  },
  setup() {
    const dialog = ref(false)
    const drDialog = ref(false)

    const salesOrder = () => {
      dialog.value = !dialog.value
    }

    const salesDR = () => {
      drDialog.value = !drDialog.value
    }

    return {
      drDialog,
      dialog,
      salesOrder,
      salesDR,
    }
  },
}
</script>

<style scoped>

</style>
