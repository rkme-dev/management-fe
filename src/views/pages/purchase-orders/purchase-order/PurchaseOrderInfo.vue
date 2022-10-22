<template>
  <v-card
    flat
    class="pa-3 mt-2"
  >
    <v-alert
      v-show="showAlert"
      dense
      text
      type="success"
    >
      Successfully <strong>{{ mode }}d</strong> a purchase order. You will be automatically
      redirected in a bit.
    </v-alert>
    <v-form class="multi-col-validation">
      <v-card-text class="pt-5">
        <v-row>
          <v-col>
            <div
              v-for="index in productRow"
              :key="index"
            >
              <purchase-order-add-selector
                @selectedProduct="attachProducts"
                @addProductRow="handleAddProductRow"
                :product-dropdown="productDropdown"
                :item-number="index"
                :form-submit="formSubmitted"
              />
            </div>
          </v-col>
          <v-col
            cols="12"
          >
            <v-text-field
              v-model="optionsLocal.description"
              dense
              label="Description"
              :readonly="mode === 'show'"
              hide-details="auto"
              :error-messages="errors.description"
              :persistent-placeholder="mode === 'show'"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-text class="mt-10">
        <v-simple-table
          fixed-header
          height="300px"
        >
          <v-subheader>
            Subheader
          </v-subheader>
          <template v-slot:default>
            <thead>
            <tr>
              <th class="text-left">
                Name
              </th>
              <th class="text-left">
                Quantity In Stock
              </th>
            </tr>
            </thead>
            <tbody>
            <tr
              v-for="item in productDropdown"
              :key="item.name"
            >
              <td>{{ item.name }}</td>
              <td>{{ item.in_stock }}</td>
            </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card-text>

      <v-card-text>
        <v-btn
          v-show="mode === 'create' || mode === 'update'"
          outlined
          class="mt-3 mr-3"
          color="primary"
          @click="save"
        >
          {{ buttonLabel }}
        </v-btn>
        <v-btn
          outlined
          class="mt-3"
          type="reset"
          @click.prevent="goBack"
        >
          Back to List
        </v-btn>
      </v-card-text>
    </v-form>
  </v-card>
</template>

<script>
import {computed, ref, watch} from '@vue/composition-api'
import router from '@/router'
import store from '@/store'
import {
  CREATE_PURCHASE_ORDER,
  UPDATE_PURCHASE_ORDER,
  GET_PRODUCTS, GET_SUPPLIERS
} from '@/store/actions.type'
import PurchaseOrderAddSelector
  from '@/views/pages/purchase-orders/component/PurchaseOrderAddSelector'

export default {
  components: {PurchaseOrderAddSelector},
  props: {
    informationData: {
      type: Object,
      default: () => ({
        name: '',
        sku: '',
        description: '',
        in_stock: '',
        total: '',
        paid_amount: '',
        supplier: null,
        supplier_id: null,
      }),
    },
    mode: {
      type: String,
    },
  },
  setup(props) {
    const buttonLabel = props.mode === 'create' ? 'Save' : 'Update'
    const showAlert = ref(false)
    const selectedSupplier = ref('')
    const hasSelectedProduct = ref(false)
    const attachedProducts = ref([])
    const selectedProductIds = ref([])
    const productRow = ref(1)
    const productDropdown = ref([])
    const formSubmitted = ref(false)
    const errors = computed(() => store.getters.errors)
    const optionsLocal = computed(() => props.informationData)
    const products = computed(() => store.getters.products)
    const suppliers = computed(() => store.getters.suppliers)

    store.dispatch(GET_SUPPLIERS)

    const goBack = () => {
      router.push('/purchase-orders')
    }

    const attachProducts = (item, index) => {
      attachedProducts.value[index - 1] = item
      selectedProductIds.value[index - 1] = item.product_id

      if (selectedProductIds.value.length) {
        // add disable property to previous selected items
        productDropdown.value = productDropdown.value.map(product => {
          return {
            ...product,
            disabled: selectedProductIds.value.includes(product.id) ? true : false,
          }
        })
      }

      hasSelectedProduct.value = true
    }

    const resolveFormSuccess = () => {
      showAlert.value = true
      setTimeout(() => {
        goBack()
      }, 1000)
    }

    const handleAddProductRow = () => {
      if (productRow.value < 5) productRow.value += 1
    }

    const save = () => {
      const currentForm = optionsLocal.value
      currentForm.items = attachedProducts.value

      if (currentForm.items === null) {
        return
      }
      const form = currentForm
      formSubmitted.value = true

      console.log(form)

      if (props.mode === 'update') {
        store.dispatch(UPDATE_PURCHASE_ORDER, form).then(data => {
          if (data != null) {
            resolveFormSuccess()
          }
        })
      }

      if (props.mode === 'create') {
        store.dispatch(CREATE_PURCHASE_ORDER, form).then(data => {
          if (data != null) {
            resolveFormSuccess()
          }
        })
      }
    }

    watch(
      products,
      () => {
        productDropdown.value = products.value
      },
      {immediate: true}
    )

    store.dispatch(GET_PRODUCTS)

    return {
      selectedSupplier,
      hasSelectedProduct,
      optionsLocal,
      showAlert,
      errors,
      buttonLabel,
      productRow,
      productDropdown,
      goBack,
      save,
      attachProducts,
      handleAddProductRow,
      suppliers,
      formSubmitted
    }
  },
}
</script>
