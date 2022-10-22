<template>
  <v-card id="purchase-order-update-card">
    <v-toolbar
      color="teal"
      dark
    >
      <v-toolbar-title>Update Purchase Order Information</v-toolbar-title>
    </v-toolbar>
    <purchase-order-info
      :information-data="purchaseOrderInfo"
      :mode="'update'"
    ></purchase-order-info>
  </v-card>
</template>

<script>
import { mdiAccountOutline } from '@mdi/js'
import router from '@/router'
import store from '@/store'
import { GET_PURCHASE_ORDER } from '@/store/actions.type'
import { onMounted, ref } from '@vue/composition-api/dist/vue-composition-api'
import PurchaseOrdersService from '@/utils/services/purchase-orders.service'
import PurchaseOrderInfo from './PurchaseOrderInfo.vue'

export default {
  components: {
    PurchaseOrderInfo,
  },
  setup() {
    const { id } = router.history.current.params
    store.dispatch(GET_PURCHASE_ORDER, router.history.current.params.id)

    const purchaseOrderInfo = ref({})

    onMounted(async () => {
      await PurchaseOrdersService.find(id)
        .then(response => {
          purchaseOrderInfo.value = response.data.data
        })
    })

    return {
      purchaseOrderInfo,
      icons: {
        mdiAccountOutline,
      },
    }
  },
}
</script>
