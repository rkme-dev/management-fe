<template>
  <v-row>
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
              Items
            </p>
          </div>
        </div>
      </v-alert>
    </v-col>
    <v-col
      cols="12"
    >
      <v-data-table
        :headers="headers"
        :items="orderItems"
        :items-per-page="5"
      >
        <template v-slot:top>
          <v-toolbar
            flat
          >
            <v-card-text>
              <v-row>
                <v-col
                  class="mt-4"
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
            <v-dialog
              v-model="itemFormModal"
              width="1200px"
              height="500px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  v-show="isDisabled === false"
                  elevation="10"
                  color="success"
                  dark
                  class="mb-2"
                  @click="createItem"
                >
                  Add Item
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">{{ formTitle }} Item</span>
                </v-card-title>
                <v-card-text>
                  <v-form>
                    <v-row>
                      <v-col cols="12">
                        <v-alert
                          color="primary"
                          text
                          style="margin-bottom: -10px"
                        >
                          <div class="d-flex align-start">
                            <v-icon color="primary">
                              {{ icons.mdiTextBoxPlus }}
                            </v-icon>
                            <div class="ms-3">
                              <p class="text-base font-weight-medium mb-1">
                                Item
                              </p>
                            </div>
                          </div>
                        </v-alert>
                      </v-col>
                      <v-col
                        cols="4"
                      >
                        <v-select
                          v-model="currentItem.product_id"
                          :items="products"
                          item-text="name"
                          item-value="id"
                          label="Item"
                          clearable
                          @change="test"
                        >
                        </v-select>
                      </v-col>
                      <v-col
                        cols="4"
                      >
                        <v-select
                          v-model="currentItem.unit"
                          :items="filteredUnits"
                          item-text="name"
                          item-value="name"
                          label="Unit"
                          outlined
                          dense
                          clearable
                          hide-details="auto"
                          @change="test"
                        ></v-select>
                      </v-col>
                      <v-col
                        cols="4"
                      >
                        <v-currency-field
                          v-model="currentItem.quantity"
                          outlined
                          dense
                          type="number"
                          :decimal-length="0"
                          hide-details="auto"
                          label="Quantity"
                        ></v-currency-field>
                      </v-col>
                      <v-col
                        cols="4"
                      >
                        <v-currency-field
                          v-model="currentItem.price"
                          outlined
                          prefix="PHP"
                          dense
                          class="text-green"
                          hide-details="auto"
                          label="Price"
                        ></v-currency-field>
                      </v-col>
                      <v-col
                        cols="4"
                      >
                        <v-currency-field
                          v-model="currentItem.total_amount"
                          disabled
                          outlined
                          prefix="PHP"
                          class="text-green"
                          dense
                          hide-details="auto"
                          label="Total Amount"
                        ></v-currency-field>
                      </v-col>
                      <v-col cols="12"></v-col>
                      <v-col cols="12"></v-col>

                      <v-col cols="4"></v-col>
                      <v-col
                        v-if="currentItem.unit"
                        cols="4"
                        class="pr-16 pl-12 mt-n2"
                      >
                        Total Item Inventory (per {{ currentItem.unit }}):
                      </v-col>
                      <v-col
                        cols="4"
                        class="pr-16 pl-12 mt-n4"
                      >
                        <v-currency-field
                          v-if="currentItem.unit"
                          v-model="currentItem.actual_balance"
                          class="shrink text-green"
                          single-line
                          readonly
                          :decimal-length="0"
                          outlined
                          dense
                          label="Actual Balance"
                        >
                        </v-currency-field>
                      </v-col>
                      <v-col cols="4"></v-col>
                      <v-col
                        v-if="currentItem.unit"
                        cols="4"
                        class="pr-16 pl-12 mt-n4"
                      >
                        Total Available Item Inventory (per {{ currentItem.unit }}):
                      </v-col>
                      <v-col
                        cols="4"
                        class="pr-16 pl-12 mt-n4"
                      >
                        <v-currency-field
                          v-if="currentItem.unit"
                          v-model="currentItem.reserved_balance"
                          class="shrink text-green"
                          single-line
                          readonly
                          :decimal-length="0"
                          outlined
                          dense
                          label="Reserved Balance"
                        >
                        </v-currency-field>
                      </v-col>
                      <v-col cols="4"></v-col>
                      <v-col
                        v-if="currentItem.unit"
                        cols="4"
                        class="pr-16 pl-12 mt-n2"
                      >
                        Total Reserved Items (per {{ currentItem.unit }}):
                      </v-col>
                      <v-col
                        cols="4"
                        class="pr-16 pl-12 mt-n2"
                      >
                        <v-currency-field
                          v-if="currentItem.unit"
                          v-model="currentItem.reserved"
                          class="shrink text-green"
                          single-line
                          readonly
                          :decimal-length="0"
                          outlined
                          dense
                          label="Reserved Balance"
                        >
                        </v-currency-field>
                      </v-col>
                      <v-col
                        v-if="formTitle != 'Edit'"
                        cols="12"
                        class="d-flex mt-n8"
                      >
                        <v-btn
                          v-if="currentItem.quantity && currentItem.price && currentItem.product_id"
                          color="primary"
                          class="me-3 mt-4"
                          @click="addItem(false)"
                        >
                          Submit
                        </v-btn>
                        <v-btn
                          v-if="currentItem.quantity && currentItem.price && currentItem.product_id"
                          color="info"
                          class="me-3 mt-4"
                          @click="addItem(true)"
                        >
                          Submit And Add Item Again
                        </v-btn>
                        <v-btn
                          outlined
                          class="me-3 mt-4"
                          type="reset"
                          @click.prevent="cancel"
                        >
                          Cancel
                        </v-btn>
                      </v-col>
                      <v-col
                        v-else
                        cols="12"
                        class="d-flex mt-n8"
                      >
                        <v-btn
                          v-if="currentItem.quantity && currentItem.price && currentItem.product_id"
                          color="primary"
                          class="me-3 mt-4"
                          @click="updateItem"
                        >
                          Update
                        </v-btn>
                        <v-btn
                          outlined
                          class="me-3 mt-4"
                          type="reset"
                          @click.prevent="cancel"
                        >
                          Cancel
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-form>
                </v-card-text>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template #[`item.total_amount`]="{item}">
          <div class="d-flex justify-center text-green text--primary">
            <span class="text-green">{{ item.total_amount }}</span>
          </div>
        </template>
        <template v-slot:item.actions="{ item, index }">
          <v-icon
            v-if="isDisabled === false"
            class="mr-2"
            small
            @click="editItem(item, index)"
          >
            {{ icons.mdiAccountEdit }}
          </v-icon>
          <v-icon
            v-if="isDisabled === false"
            small
            @click="deleteItem(item)"
          >
            {{ icons.mdiDeleteCircle }}
          </v-icon>
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
        <template v-slot:footer="{ item }">
          <v-row class="mb-2 mt-2">
            <v-col
              cols="6"
              class="mt-10"
            >
            </v-col>
            <v-col
              cols="3"
              class="mt-7"
              style="color: forestgreen;"
            >
              Total Amount:
            </v-col>
            <v-col
              cols="2"
              class="ml-n16"
            >
              <v-currency-field
                v-model="salesOrderTotalAmount"
                class="text-green"
                prefix="PHP"
                disabled
              >
              </v-currency-field>
            </v-col>
          </v-row>
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
  computed, ref, toRef, toRefs, watch,
} from '@vue/composition-api'
import store from '@/store'

export default {
  name: 'OrderItems',
  props: {
    disabled: {
      type: Boolean,
      required: false,
      default: (() => false),
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
    store.dispatch('UnitPackingStore/list')
    const isDisabled = toRef(props, 'disabled')
    const modeData = toRef(props, 'mode')
    const itemFormModal = ref(false)
    const formData = ref({})
    const formTitle = ref('Add')
    const orderItems = ref([])
    const products = computed(() => store.state.FinishProductStore.list)
    const units = computed(() => store.state.UnitPackingStore.list)
    const filteredUnits = ref([])

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

    const product = ref({
      name: null,
      slug: null,
      sku: null,
    })
    const totalAmount = ref(0)
    const itemsProp = toRef(props, 'items')

    const salesOrderTotalAmount = ref(0)

    if (modeData.value === 'Edit') {
      salesOrderTotalAmount.value = 0

      orderItems.value = itemsProp.value.map(orderItem => {
        const productRaw = products.value.find(item => item.id === orderItem.product_id)

        salesOrderTotalAmount.value = parseFloat(salesOrderTotalAmount.value) + parseFloat(orderItem.total_amount)
        // eslint-disable-next-line no-param-reassign
        orderItem.name = productRaw?.name
        // eslint-disable-next-line no-param-reassign
        orderItem.slug = productRaw?.slug
        // eslint-disable-next-line no-param-reassign
        orderItem.sku = productRaw?.sku

        return orderItem
      })

      emit('totalAmount', salesOrderTotalAmount.value)
    }

    watch(salesOrderTotalAmount, value => {
      emit('totalAmount', value)
    })
    watch(itemsProp, () => {
      salesOrderTotalAmount.value = 0

      orderItems.value = itemsProp.value.map(orderItem => {
        const productRaw = products.value.find(item => item.id === orderItem.product_id)

        salesOrderTotalAmount.value = parseFloat(salesOrderTotalAmount.value) + parseFloat(orderItem.total_amount)

        // eslint-disable-next-line no-param-reassign
        orderItem.name = productRaw?.name
        // eslint-disable-next-line no-param-reassign
        orderItem.slug = productRaw?.slug
        // eslint-disable-next-line no-param-reassign
        orderItem.sku = productRaw?.sku

        return orderItem
      })
    })

    watch(orderItems, () => {
      salesOrderTotalAmount.value = 0

      orderItems.value.forEach(orderItem => {
        salesOrderTotalAmount.value = parseFloat(salesOrderTotalAmount.value) + parseFloat(orderItem.total_amount)
      })

      if (orderItems.value.length === 0) {
        salesOrderTotalAmount.value = 0
      }
    })

    watch(currentItem.value, () => {
      if (currentItem.value.product_id) {
        const productRaw = products.value.find(item => item.id === currentItem.value.product_id)
        product.value.name = productRaw.name
        product.value.slug = productRaw.slug
        product.value.sku = productRaw.sku

        filteredUnits.value = units.value.filter(unit => {
          if (unit.id === productRaw.unit_id) {
            return unit
          }

          productRaw.units.forEach(productUnit => {
            if (unit.id === productUnit.id) {
              return unit
            }
          })
        })
      }

      if (currentItem.value.quantity && currentItem.value.price) {
        totalAmount.value = parseFloat(currentItem.value.quantity * currentItem.value.price)
      } else {
        totalAmount.value = 0
      }
    })

    watch(totalAmount, () => {
      currentItem.value.total_amount = totalAmount.value
    })

    watch(product.value, () => {
      currentItem.value.name = product.value.name
      currentItem.value.slug = product.value.slug
      currentItem.value.sku = product.value.sku
    })

    const createItem = () => {
      formTitle.value = 'Add'
      currentItem.value.product_id = null
      currentItem.value.quantity = null
      currentItem.value.price = null
      currentItem.value.total_amount = 0
      currentItem.value.unit = null
      currentItem.value.name = null
      currentItem.value.sku = null
      currentItem.value.slug = null
      itemFormModal.value = true
    }

    const addItem = addAgain => {
      orderItems.value.push({
        product_id: currentItem.value.product_id,
        quantity: currentItem.value.quantity,
        price: currentItem.value.price,
        total_amount: currentItem.value.total_amount,
        unit: currentItem.value.unit,
        name: currentItem.value.name,
        sku: currentItem.value.sku,
        slug: currentItem.value.slug,
      })

      emit('totalAmount', salesOrderTotalAmount.value)
      emit('addItem', orderItems.value)

      itemFormModal.value = false

      // Manually set each property to null and don't assign a completely new object it will ruin the watch component
      setTimeout(() => {
        filteredUnits.value = []
        currentItem.value.product_id = null
        currentItem.value.quantity = null
        currentItem.value.price = null
        currentItem.value.unit = null
        currentItem.value.total_amount = 0
        product.value.name = null
        product.value.sku = null
        product.value.slug = null
      }, 500)

      if (addAgain === true) {
        setTimeout(() => {
          itemFormModal.value = true
        }, 500)
      }
    }

    const editItem = (item, index) => {
      formTitle.value = 'Edit'
      const itemRefs = toRefs(item)
      currentItem.value.index = index
      currentItem.value.product_id = itemRefs.product_id
      currentItem.value.quantity = itemRefs.quantity
      currentItem.value.price = itemRefs.price
      currentItem.value.total_amount = itemRefs.total_amount
      currentItem.value.unit = itemRefs.unit
      currentItem.value.name = itemRefs.name
      currentItem.value.sku = itemRefs.sku
      currentItem.value.slug = itemRefs.slug
      itemFormModal.value = true
    }

    const updateItem = () => {
      orderItems.value[currentItem.value.index] = {
        product_id: currentItem.value.product_id,
        quantity: currentItem.value.quantity,
        price: currentItem.value.price,
        total_amount: currentItem.value.total_amount,
        unit: currentItem.value.unit,
        name: currentItem.value.name,
        sku: currentItem.value.sku,
        slug: currentItem.value.slug,
      }

      emit('totalAmount', salesOrderTotalAmount.value)
      emit('addItem', orderItems.value)

      itemFormModal.value = false
    }

    const deleteItem = item => {
      const index = orderItems.value.findIndex(orderItem => (orderItem.product_id === item.product_id && orderItem.total_amount === item.total_amount))
      orderItems.value.splice(index, 1)
      emit('addItem', orderItems.value)
      emit('totalAmount', salesOrderTotalAmount.value)
    }

    const test = () => {
      if (currentItem.value.unit) {
        const productRaw = products.value.find(item => item.id === currentItem.value.product_id)

        const productUnit = productRaw.units.find(unit => unit.name === currentItem.value.unit)

        currentItem.value.actual_balance = productUnit.pivot.actual_balance ?? 0
        currentItem.value.reserved_balance = productUnit.pivot.reserved_balance ?? 0
        currentItem.value.reserved = parseFloat(productUnit.pivot.actual_balance ?? 0) - parseFloat(productUnit.pivot.reserved_balance ?? 0)
      }
    }

    const cancel = () => {
      itemFormModal.value = false
      currentItem.value.product_id = null
      currentItem.value.quantity = null
      currentItem.value.price = null
      currentItem.value.unit = null
      currentItem.value.total_amount = 0
      product.value.name = null
      product.value.sku = null
      product.value.slug = null
    }

    return {
      test,
      filteredUnits,
      isDisabled,
      salesOrderTotalAmount,
      addItem,
      cancel,
      formTitle,
      currentItem,
      orderItems,
      deleteItem,
      formData,
      itemFormModal,
      totalAmount,
      products,
      headers: [
        {
          text: 'Item Code',
          sortable: true,
          value: 'sku',
        },
        {
          text: 'Name',
          value: 'name',
        },
        {
          text: 'Quantity',
          value: 'quantity',
        },
        {
          text: 'Unit',
          value: 'unit',
        },
        {
          text: 'Price',
          value: 'price',
        },
        {
          text: 'Total Amount',
          value: 'total_amount',
        },
        {
          text: 'Actions',
          value: 'actions',
        },
      ],
      userData: [
        {
          id: 1,
          full_name: 'Test',
          email: 'test@gmail.com',
          experience: 'test',
          age: 23,
        },
      ],
      icons: {
        mdiAccountEdit,
        mdiDeleteCircle,
        mdiInformation,
        mdiTextBoxPlus,
      },
      createItem,
      editItem,
      updateItem,
    }
  },
}
</script>

<style>
.text-green input {
  color: #009900 !important;
}
</style>
