<template>
  <v-card id="account-setting-card">
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
        <client-info
          :information-data="clientInfo"
          :mode="'show'"
        ></client-info>
      </v-tab-item>

      <v-tab-item>
        <sale-history :sales-data="null"></sale-history>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import { mdiAccountOutline, mdiCartPlus } from '@mdi/js'
import { ref, onMounted } from '@vue/composition-api'
import { GET_CUSTOMER } from '@/store/actions.type'
import store from '@/store'
import router from '@/router'
import CustomersService from '@/utils/services/customers.service'
import SaleHistory from './SaleHistory.vue'
import ClientInfo from './ClientInfo.vue'

export default {
  components: {
    SaleHistory,
    ClientInfo,
  },
  setup() {
    const { id } = router.history.current.params
    store.dispatch(GET_CUSTOMER, router.history.current.params.id)

    const tab = ref('')
    const clientInfo = ref({})

    onMounted(async () => {
      await CustomersService.find(id)
        .then(response => {
          console.log(response)
          clientInfo.value = response.data.data
        })
    })

    // tabs
    const tabs = [
      { title: 'Client Information', icon: mdiAccountOutline },
      { title: 'Sales history', icon: mdiCartPlus },
    ]

    return {
      tab,
      tabs,
      clientInfo,
      icons: {
        mdiAccountOutline,
        mdiCartPlus,
      },
    }
  },
}
</script>
