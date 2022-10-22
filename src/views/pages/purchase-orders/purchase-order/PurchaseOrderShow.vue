<template>
  <v-card id="purchase-order-info-card">
    <!-- tabs -->
    <v-tabs
      v-model="tab"
      show-arrows
    >
      <v-tab
        v-for="tab in tabs"
        :key="tab.icon"
      >
        <v-icon
          size="20"
          class="me-3"
        >
          {{ tab.icon }}
        </v-icon>
        <span>{{ tab.title }}</span>
      </v-tab>
    </v-tabs>

    <!-- tabs item -->
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <purchase-order-info
          :information-data="purchaseOrderInfo"
          :mode="'show'"
        ></purchase-order-info>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import { mdiAccountOutline, mdiCartPlus } from '@mdi/js'
import { ref, onMounted } from '@vue/composition-api'
import { GET_PRODUCT } from '@/store/actions.type'
import store from '@/store'
import router from '@/router'
import PurchaseOrdersService from '@/utils/services/purchase-orders.service'
import PurchaseOrderInfo from './PurchaseOrderInfo.vue'

export default {
  components: {
    PurchaseOrderInfo,
  },
  setup() {
    const { id } = router.history.current.params
    store.dispatch(GET_PRODUCT, router.history.current.params.id)

    const tab = ref('')
    const purchaseOrderInfo = ref({})

    onMounted(async () => {
      await PurchaseOrdersService.find(id)
        .then(response => {
          console.log(response)
          purchaseOrderInfo.value = response.data.data
        })
    })

    // tabs
    const tabs = [
      { title: 'Purchase Order Information', icon: mdiAccountOutline },
    ]

    return {
      tab,
      tabs,
      purchaseOrderInfo,
      icons: {
        mdiAccountOutline,
        mdiCartPlus,
      },
    }
  },
}
</script>
