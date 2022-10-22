<template>
  <v-card id="product-creation-card">
    <v-toolbar
      color="teal"
      dark
    >
      <v-toolbar-title>Supplier Information</v-toolbar-title>
    </v-toolbar>
    <product-info
      :information-data="productInfo"
      :mode="'update'"
    ></product-info>
  </v-card>
</template>

<script>
import { mdiAccountOutline } from '@mdi/js'
import router from '@/router'
import store from '@/store'
import { GET_SUPPLIER } from '@/store/actions.type'
import { onMounted, ref } from '@vue/composition-api/dist/vue-composition-api'
import ProductsService from '@/utils/services/products.service'
import SuppliersService from '@/utils/services/suppliers.service'
import ProductInfo from './SupplierInfo.vue'

export default {
  components: {
    ProductInfo,
  },
  setup() {
    const { id } = router.history.current.params
    store.dispatch(GET_SUPPLIER, router.history.current.params.id)

    const productInfo = ref({})

    onMounted(async () => {
      await SuppliersService.find(id)
        .then(response => {
          productInfo.value = response.data.data
        })
    })

    return {
      productInfo,
      icons: {
        mdiAccountOutline,
      },
    }
  },
}
</script>
