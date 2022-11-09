<template>
  <v-row class="">
    <v-col cols="12">
      <v-alert
        color="success"
        text
        style="margin-bottom: -30px"
      >
        <div class="d-flex align-start">
          <v-icon color="success">
            {{ icons.mdiInformation }}
          </v-icon>
          <div class="ms-3">
            <p class="text-base font-weight-medium mb-1">
              Sales Order Items
            </p>
          </div>
        </div>
      </v-alert>
    </v-col>
    <v-col
      class=""
      cols="12"
    >
      <v-data-table
        v-model="selectedOrderItems"
        :headers="headers"
        :items="orderItems"
        :items-per-page="20"
        :search="search"
        item-key="order_item_id"
        show-select
      >
        <template v-slot:item.data-table-select="{ item, isSelected, select }">
          <v-simple-checkbox
            :value="isSelected"
            :disabled="disabled"
            :ripple="false"
            @input="select($event)"
          ></v-simple-checkbox>
        </template>
        <template v-slot:top>
          <v-toolbar
            flat
          >
            <v-card-text>
              <v-row class="mt-10">
                <v-col
                  cols="4"
                >
                  <v-text-field
                    v-model="search"
                    :append-icon="icons.mdiMagnify"
                    label="Search"
                    single-line
                    hide-details
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="4"
                >
                </v-col>
                <v-col
                  class=""
                  cols="4"
                >
                  <v-currency-field
                    v-model="salesOrderTotalAmount"
                    outlined
                    class="text-green"
                    disabled
                    dense
                    hide-details="auto"
                    label="Sales Order Total Amount"
                  ></v-currency-field>
                </v-col>
                <v-col
                  cols="4"
                  offset-md="4"
                >
                </v-col>
              </v-row>
            </v-card-text>
          </v-toolbar>
        </template>
        <template #item.price="{ item }">
          <v-currency-field
            v-model="item.price"
            prefix="PHP"
            class="text-green"
            disabled
          >
          </v-currency-field>
        </template>
        <template #item.total_amount="{ item }">
          <v-currency-field
            v-model="item.total_amount"
            prefix="PHP"
            class="text-green"
            disabled
          >
          </v-currency-field>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon
            small
            @click="deleteItem(item)"
          >
            {{ icons.mdiDeleteCircle }}
          </v-icon>
        </template>
      </v-data-table>
    </v-col>
  </v-row>
</template>

<script>
import {
  mdiAccountEdit,
  mdiDeleteCircle,
  mdiInformation,
  mdiTextBoxPlus,
} from '@mdi/js'
import {
  computed, ref, toRef, watch,
} from '@vue/composition-api'
import store from '@/store'

export default {
  name: 'SaleOrderItems',
  props: {
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
    mode: {
      type: String,
      required: false,
      default: (() => 'Create'),
    },
    customerId: {
      type: Number,
      required: false,
      default: null,
    },
    items: {
      type: Array,
      required: false,
      default: null,
    },
  },
  setup(props, { emit }) {
    store.dispatch('ProductStore/list')
    const search = ref()
    const modeData = toRef(props, 'mode')
    const customerIdData = toRef(props, 'customerId')
    const formData = ref({})
    const formTitle = ref('Add Item')
    const existingSalesOrderItems = toRef(props, 'items')
    const orderItems = computed(() => {
      if (modeData.value === 'Create') {
        return store.state.SalesOrderStore.items?.filter(item => item.has_dr === 0)
      }

      return store.state.SalesOrderStore.items
    })
    const products = computed(() => store.state.ProductStore.list)
    const selectedOrderItems = ref([])
    const currentItem = ref({
      product_id: null,
      quantity: null,
      price: null,
      total_amount: 0,
      unit: null,
      name: null,
      sku: null,
      slug: null,
    })

    const salesOrderTotalAmount = ref(0)
    const orderItemIds = ref([])

    store.dispatch('SalesOrderStore/resetOrderItems')

    watch(customerIdData, () => {
      salesOrderTotalAmount.value = 0
      selectedOrderItems.value = []

      if (customerIdData.value === null) {
        store.dispatch('SalesOrderStore/resetOrderItems')
      }
    })

    watch(orderItems, () => {
      salesOrderTotalAmount.value = 0

      selectedOrderItems.value = []

      if (existingSalesOrderItems.value) {
        existingSalesOrderItems.value.forEach(item => {
          const findItem = orderItems.value.find(orderItem => orderItem.order_item_id === item.sales_order_item_id)

          if (findItem) {
            selectedOrderItems.value.push(findItem)
          }
        })
      }
    })

    watch(selectedOrderItems, () => {
      orderItemIds.value = []

      if (selectedOrderItems.value.length > 0) {
        salesOrderTotalAmount.value = 0

        selectedOrderItems.value.forEach(orderItem => {
          if (orderItem) {
            orderItemIds.value.push(orderItem.order_item_id)
            salesOrderTotalAmount.value = parseFloat(salesOrderTotalAmount.value) + parseFloat(orderItem?.total_amount)
          }
        })
      } else {
        salesOrderTotalAmount.value = 0
      }

      emit('totalAmount', salesOrderTotalAmount.value)
      emit('orderItemIds', orderItemIds.value)
    })

    return {
      search,
      selectedOrderItems,
      salesOrderTotalAmount,
      formTitle,
      currentItem,
      orderItems,
      formData,
      products,
      headers: [
        { text: 'Date', sortable: true, value: 'date_posted' },
        { text: 'SO No', value: 'sales_order_number', sortable: true },
        { text: 'Product Name', value: 'product_name', sortable: true },
        { text: 'Quantity', value: 'quantity', sortable: true },
        { text: 'Unit', value: 'unit', sortable: true },
        { text: 'Price', value: 'price', sortable: true },
        { text: 'Amount', value: 'total_amount', sortable: true },
      ],
      icons: {
        mdiAccountEdit,
        mdiDeleteCircle,
        mdiInformation,
        mdiTextBoxPlus,
      },
    }
  },
}
</script>

<style>
.text-green input {
  color: chartreuse !important;
}
</style>
