<template>
  <v-row class="">
    <v-overlay :value="loading">
      <div class="text-center">
        <v-progress-circular
          :size="150"
          color="primary"
          indeterminate
        ></v-progress-circular>
      </div>
    </v-overlay>
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
      v-if="filteredOrderItems.length > 0"
      class=""
      cols="12"
    >
      <v-data-table
        v-show="filteredOrderItems.length > 0"
        :key="updateKey"
        v-model="selectedOrderItems"
        :headers="headers"
        item-key="order_item_id"
        :items="filteredOrderItems"
        :footer-props="{
          'items-per-page-options': [10, 20, 30, 40, 50]
        }"
        :items-per-page="10"
        :search="search"
        show-select
        fixed-header
        show-expand
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
              <v-row class="mt-2">
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
                  cols="2"
                >
                </v-col>
                <v-col
                  cols="2"
                >
                  <v-btn
                    v-if="selectedOrderItems.length>0"
                    color="info"
                    @click="clear"
                  >
                    <v-icon
                      large
                    >
                      {{ icons.mdiFormatClear }}
                    </v-icon>
                    Clear
                  </v-btn>
                </v-col>
                <v-col
                  cols="2"
                >
                  <v-btn
                    color="success"
                    @click="submit"
                  >
                    <v-icon
                      large
                    >
                      {{ icons.mdiHeadCheck }}
                    </v-icon>
                    Create DR on selected items
                  </v-btn>
                </v-col>
              </v-row>
            </v-card-text>
          </v-toolbar>
        </template>
        <template #item.date_posted="{ item }">
          {{ dateFormat2(item.date_posted) }}
        </template>
        <template #item.customer_name="{ item }">
          <p style="color: green">
            {{ item.customer_name }}
          </p>
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
        <template v-slot:footer.prepend>
          <v-col cols="8"></v-col>
          <v-col
            class=""
            cols="4"
          >
            <v-currency-field
              v-model="selectedSalesOrderTotalAmount"
              outlined
              class="text-green"
              disabled
              dense
              hide-details="auto"
              label="Selected Sales Order Total Amount"
            ></v-currency-field>
          </v-col>
          <v-col
            cols="4"
            offset-md="4"
          >
          </v-col>
        </template>
      </v-data-table>
    </v-col>
    <v-col
      v-if="filteredOrderItems.length === 0"
      class=""
      cols="12"
    >
      <v-data-table
        :key="updateKey"
        v-model="selectedOrderItems"
        :headers="headers"
        item-key="order_item_id"
        :items="orderItems"
        :search="search"
        :footer-props="{
          'items-per-page-options': [10, 20, 30, 40, 50]
        }"
        :items-per-page="10"
        fixed-header
        show-select
        show-expand
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
              <v-row class="mt-2">
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
                  cols="2"
                >
                  <v-btn
                    v-if="selectedOrderItems.length>0"
                    color="info"
                    @click="clear"
                  >
                    <v-icon
                      large
                    >
                      {{ icons.mdiFormatClear }}
                    </v-icon>
                    Clear
                  </v-btn>
                </v-col>
                <v-col
                  cols="2"
                >
                  <v-btn
                    v-if="selectedOrderItems.length>0"
                    color="success"
                    @click="submit"
                  >
                    <v-icon
                      large
                    >
                      {{ icons.mdiHeadCheck }}
                    </v-icon>
                    Submit
                  </v-btn>
                </v-col>
              </v-row>
            </v-card-text>
          </v-toolbar>
        </template>
        <template #item.date_posted="{ item }">
          {{ dateFormat2(item.date_posted) }}
        </template>
        <template #item.customer_name="{ item }">
          <p style="color: green">
            {{ item.customer_name }}
          </p>
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
        <template v-slot:footer.prepend>
          <v-col cols="8"></v-col>
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
        </template>
      </v-data-table>
    </v-col>
    <v-col cols="6"></v-col>
    <v-col cols="2">
    </v-col>
  </v-row>
</template>

<script>
import {
  mdiAccountEdit,
  mdiDeleteCircle, mdiFormatClear, mdiHeadCheck,
  mdiInformation,
  mdiTextBoxPlus, mdiValveClosed,
} from '@mdi/js'
import {
  computed, onMounted, ref, toRef, watch,
} from '@vue/composition-api'
import store from '@/store'
import { dateFormat2 } from '@/utils/time'
import SalesOrderService from '@/service/SalesOrderService'
import router from '@/router'

export default {
  name: 'OrderItemsSelection',
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
    items: {
      type: Array,
      required: false,
      default: null,
    },
  },
  setup(props, { emit }) {
    store.dispatch('ProductStore/list')
    const salesOrderService = new SalesOrderService()
    const search = ref()
    const formData = ref({})
    const formTitle = ref('Add Item')
    const existingSalesOrderItems = toRef(props, 'items')
    const orderItems = ref([])
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
    const customer = ref({})
    const filteredOrderItems = ref([])
    const originalOrderItems = ref([])
    const selectedSalesOrderTotalAmount = ref(0)
    const salesOrderTotalAmount = ref(0)
    const orderItemIds = ref([])

    const loading = ref(false)

    onMounted(async () => {
      loading.value = true
      await salesOrderService.allOrderItems(true)
        .then(response => {
          const items = response.data.map(item => {
            item.customer_name = item.customer.name
            salesOrderTotalAmount.value = parseFloat(salesOrderTotalAmount.value) + parseFloat(item?.total_amount)

            return item
          })
          orderItems.value = items
          originalOrderItems.value = items
          loading.value = false
        })
    })

    // store.dispatch('SalesOrderStore/resetOrderItems')
    //
    // watch(customerIdData, () => {
    //   salesOrderTotalAmount.value = 0
    //   selectedOrderItems.value = []
    //
    //   if (customerIdData.value === null) {
    //     store.dispatch('SalesOrderStore/resetOrderItems')
    //   }
    // })

    watch(orderItems, () => {
      selectedSalesOrderTotalAmount.value = 0

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

    const updateKey = ref(0)

    const filter = (customerId = null) => {
      const result = []

      if (customerId !== null) {
        originalOrderItems.value.forEach(item => {
          if (item.customer.id === customerId) {
            result.push(item)
          }
        })

        filteredOrderItems.value = result
      } else {
        filteredOrderItems.value = []
      }

      updateKey.value += 1
    }

    watch(selectedOrderItems, () => {
      orderItemIds.value = []

      if (selectedOrderItems.value.length > 0) {
        selectedSalesOrderTotalAmount.value = 0

        selectedOrderItems.value.forEach(orderItem => {
          filter(orderItem.customer.id)
          customer.value = orderItem.customer

          if (orderItem) {
            orderItemIds.value.push(orderItem.order_item_id)
            selectedSalesOrderTotalAmount.value = parseFloat(selectedSalesOrderTotalAmount.value) + parseFloat(orderItem?.total_amount)
          }
        })
      } else {
        filter()
        selectedSalesOrderTotalAmount.value = 0
        customer.value = {}
      }
    })

    const submit = () => {
      store.dispatch('SalesDrStore/setOrderItemsForCreation', {
        totalAmount: selectedSalesOrderTotalAmount.value,
        orderItems: selectedOrderItems.value,
        customer: customer.value,
      })

      router.push('sales-drs/create')
    }

    const clear = () => {
      selectedOrderItems.value = []
    }

    const close = () => {
      emit('close')
    }

    return {
      close,
      loading,
      clear,
      updateKey,
      dateFormat2,
      submit,
      search,
      selectedOrderItems,
      selectedSalesOrderTotalAmount,
      salesOrderTotalAmount,
      formTitle,
      currentItem,
      orderItems,
      filteredOrderItems,
      formData,
      products,
      headers: [
        {
          text: 'Date', sortable: true, value: 'date_posted', width: '160px',
        },
        {
          text: 'Customer', sortable: true, value: 'customer_name', width: '210px',
        },
        {
          text: 'SO No', value: 'sales_order_number', sortable: true, width: '220px',
        },
        {
          text: 'Product Name', value: 'product_name', sortable: true, width: '220px',
        },
        {
          text: 'Quantity', value: 'quantity', sortable: true, width: '160px',
        },
        {
          text: 'Unit', value: 'unit', sortable: true, width: '160px',
        },
        {
          text: 'Price', value: 'price', sortable: true, width: '160px',
        },
        {
          text: 'Amount', value: 'total_amount', sortable: true, width: '210px',
        },
      ],
      icons: {
        mdiValveClosed,
        mdiHeadCheck,
        mdiFormatClear,
        mdiAccountEdit,
        mdiDeleteCircle,
        mdiInformation,
        mdiTextBoxPlus,
      },
    }
  }
  ,
}
</script>

<style>
.text-green input {
  color: #009900 !important;
}
</style>
