<template>
  <v-card id="supplier-info-card">
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
        <supplier-info
          :information-data="supplierInfo"
          :mode="'show'"
        ></supplier-info>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import { mdiAccountOutline, mdiCartPlus } from '@mdi/js'
import { ref, onMounted } from '@vue/composition-api'
import { GET_SUPPLIER } from '@/store/actions.type'
import store from '@/store'
import router from '@/router'
import SuppliersService from '@/utils/services/suppliers.service'
import SupplierInfo from './SupplierInfo.vue'

export default {
  components: {
    SupplierInfo,
  },
  setup() {
    const { id } = router.history.current.params
    store.dispatch(GET_SUPPLIER, router.history.current.params.id)

    const tab = ref('')
    const supplierInfo = ref({})

    onMounted(async () => {
      await SuppliersService.find(id)
        .then(response => {
          console.log(response)
          supplierInfo.value = response.data.data
        })
    })

    // tabs
    const tabs = [
      { title: 'Supplier Information', icon: mdiAccountOutline },
    ]

    return {
      tab,
      tabs,
      supplierInfo,
      icons: {
        mdiAccountOutline,
        mdiCartPlus,
      },
    }
  },
}
</script>
