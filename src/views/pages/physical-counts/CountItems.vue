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
        :items="countItems"
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
                    v-model="physicalCountTotalAmount"
                    outlined
                    class="text-green"
                    disabled
                    dense
                    hide-details="auto"
                    label="Physical Count Total Amount"
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
                  v-if="isDisabled === false"
                  elevation="10"
                  color="success"
                  dark
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  Add Item
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">{{ formTitle }}</span>
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
                        ></v-select>
                      </v-col>
                      <v-col
                        cols="4"
                      >
                        <v-text-field
                          v-model="currentItem.brand"
                          outlined
                          dense
                          type="text"
                          hide-details="auto"
                          label="Brand"
                        ></v-text-field>
                      </v-col>
                       <v-col
                        cols="4"
                      >
                        <v-text-field
                          v-model="currentItem.group_1"
                          outlined
                          dense
                          type="text"
                          hide-details="auto"
                          label="Group 1"
                        ></v-text-field>
                      </v-col>
                       <v-col
                        cols="4"
                      >
                        <v-text-field
                          v-model="currentItem.group_2"
                          outlined
                          dense
                          type="text"
                          hide-details="auto"
                          label="Group 2"
                        ></v-text-field>
                      </v-col>
                      <v-col
                        cols="4"
                      >
                        <v-text-field
                          v-model="currentItem.quantity"
                          outlined
                          dense
                          type="number"
                          min="0"
                          step="1"
                          onfocus="this.previousValue = this.value"
                          onkeydown="this.previousValue = this.value"
                          oninput="validity.valid || (value = this.previousValue)"
                          hide-details="auto"
                          label="Quantity"
                        ></v-text-field>
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
                      <v-col
                        cols="12"
                        class="d-flex"
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
        <template v-slot:item.actions="{ item }">
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
  name: 'CountItems',
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
    const formTitle = ref('Add Item')
    const countItems = ref([])
    const products = computed(() => store.state.FinishProductStore.list)
    const units = computed(() => store.state.UnitPackingStore.list)
    const filteredUnits = ref([])
    const currentItem = ref({
      product_id: null,
      quantity: null,
      price: null,
      total_amount: 0,
      unit: null,
      brand: null,
      group_1: null,
      group_2: null,
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

    const physicalCountTotalAmount = ref(0)

    if (modeData.value === 'Edit') {
      physicalCountTotalAmount.value = 0
      
      countItems.value = itemsProp.value.map(countItem => {
        const productRaw = products.value.find(item => item.id === countItem.product_id)

        physicalCountTotalAmount.value = parseFloat(physicalCountTotalAmount.value) + parseFloat(countItem.total_amount)
        
        // eslint-disable-next-line no-param-reassign
        countItem.name = productRaw?.name
        // eslint-disable-next-line no-param-reassign
        countItem.slug = productRaw?.slug
        // eslint-disable-next-line no-param-reassign
        countItem.sku = productRaw?.sku

        return countItem
      })

      emit('totalAmount', physicalCountTotalAmount.value)
    }

    watch(physicalCountTotalAmount, value => {
      emit('totalAmount', value)
    })
    watch(itemsProp, () => {
      if (modeData.value === 'Edit') {
        physicalCountTotalAmount.value = 0

        countItems.value = itemsProp.value.map(countItem => {
          const productRaw = products.value.find(item => item.id === countItem.product_id)

          physicalCountTotalAmount.value = parseFloat(physicalCountTotalAmount.value) + parseFloat(countItem.total_amount)

          // eslint-disable-next-line no-param-reassign
          countItem.name = productRaw?.name
          // eslint-disable-next-line no-param-reassign
          countItem.slug = productRaw?.slug
          // eslint-disable-next-line no-param-reassign
          countItem.sku = productRaw?.sku

          return countItem
        })
      } else if (modeData.value === 'Create' && itemsProp.value.length === 0) {
        countItems.value = []
      }
    })

    watch(countItems, () => {
      physicalCountTotalAmount.value = 0

      countItems.value.forEach(countItem => {
        physicalCountTotalAmount.value = parseFloat(physicalCountTotalAmount.value) + parseFloat(countItem.total_amount)
      })

      if (countItems.value.length === 0) {
        physicalCountTotalAmount.value = 0
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

    const addItem = addAgain => {
      countItems.value.push({
        product_id: currentItem.value.product_id,
        quantity: currentItem.value.quantity,
        price: currentItem.value.price,
        total_amount: currentItem.value.total_amount,
        unit: currentItem.value.unit,
        brand: currentItem.value.brand,
        group_1: currentItem.value.group_1,
        group_2: currentItem.value.group_2,
        name: currentItem.value.name,
        sku: currentItem.value.sku,
        slug: currentItem.value.slug,
      })

      emit('totalAmount', physicalCountTotalAmount.value)
      emit('addItem', countItems.value)

      itemFormModal.value = false

      // Manually set each property to null and don't assign a completely new object it will ruin the watch component
      setTimeout(() => {
        filteredUnits.value = []
        currentItem.value.product_id = null
        currentItem.value.quantity = null
        currentItem.value.price = null
        currentItem.value.total_amount = 0
        currentItem.value.unit = null
        currentItem.value.brand = null
        currentItem.value.group_1 = null
        currentItem.value.group_2 = null
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

    const deleteItem = item => {
      const index = countItems.value.findIndex(countItem => (countItem.product_id === item.product_id && countItem.total_amount === item.total_amount))
      countItems.value.splice(index, 1)
      emit('addItem', countItems.value)
      emit('totalAmount', physicalCountTotalAmount.value)
    }

    const cancel = () => {
      itemFormModal.value = false
      currentItem.value.product_id = null
      currentItem.value.quantity = null
      currentItem.value.price = null
      currentItem.value.total_amount = 0
      currentItem.value.unit = null
      currentItem.value.brand = null
      currentItem.value.group_1 = null
      currentItem.value.group_2 = null
      product.value.name = null
      product.value.sku = null
      product.value.slug = null
    }

    return {
      filteredUnits,
      isDisabled,
      physicalCountTotalAmount,
      addItem,
      cancel,
      formTitle,
      currentItem,
      countItems,
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
    }
  },
}
</script>

<style>
.text-green input {
  color: chartreuse !important;
}
</style>
