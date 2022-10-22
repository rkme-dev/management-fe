<template>
  <v-card id="client-creation-card">
    <v-toolbar
      color="teal"
      dark
    >
      <v-toolbar-title>Update Client Information</v-toolbar-title>
    </v-toolbar>
    <client-info
      :information-data="clientInfo"
      :mode="'update'"
    ></client-info>
  </v-card>
</template>

<script>
import { mdiAccountOutline } from '@mdi/js'
import router from '@/router'
import store from '@/store'
import { GET_CUSTOMER } from '@/store/actions.type'
import { onMounted, ref } from '@vue/composition-api/dist/vue-composition-api'
import CustomersService from '@/utils/services/customers.service'
import ClientInfo from './ClientInfo.vue'

export default {
  components: {
    ClientInfo,
  },
  setup() {
    const { id } = router.history.current.params
    store.dispatch(GET_CUSTOMER, router.history.current.params.id)

    const clientInfo = ref({})

    onMounted(async () => {
      await CustomersService.find(id)
        .then(response => {
          clientInfo.value = response.data.data
        })
    })

    return {
      clientInfo,
      icons: {
        mdiAccountOutline,
      },
    }
  },
}
</script>
