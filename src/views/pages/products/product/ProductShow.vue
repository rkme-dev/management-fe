<template>
  <v-card id="product-info-card">
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
        <product-info
          :information-data="productInfo"
          :mode="'show'"
        ></product-info>
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
import ProductsService from '@/utils/services/products.service'
import ProductInfo from './ProductInfo.vue'

export default {
  components: {
    ProductInfo,
  },
  setup() {
    const { id } = router.history.current.params
    store.dispatch(GET_PRODUCT, router.history.current.params.id)

    const tab = ref('')
    const productInfo = ref({})

    onMounted(async () => {
      await ProductsService.find(id)
        .then(response => {
          console.log(response)
          productInfo.value = response.data.data
        })
    })

    // tabs
    const tabs = [
      { title: 'Product Information', icon: mdiAccountOutline },
    ]

    return {
      tab,
      tabs,
      productInfo,
      icons: {
        mdiAccountOutline,
        mdiCartPlus,
      },
    }
  },
}
</script>
