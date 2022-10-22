<template>
  <v-card
    flat
    class=""
  >
    <!-- tabs -->
    <v-tabs
      v-model="tab"
      show-arrows
      grow
    >
      <v-tab
        v-for="tab in tabs"
        :key="tab.icon"
      >
        <v-icon
          size="30"
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
        <v-alert
          v-show="showAlert"
          dense
          text
          type="success"
        >
          Successfully <strong>approved</strong> a purchase order. You will be automatically
          redirected in a bit.
        </v-alert>
        <v-form class="multi-col-validation">
          <v-card-text class="pt-5">
            <v-row>
              <v-col
                cols="12"
                class=""
              >
              </v-col>
              <!--              <v-col cols="12">-->
              <!--                <v-card-text class="mt-10">-->
              <!--                  <v-subheader class="font-weight-black">-->
              <!--                    Raw Materials In Stock-->
              <!--                  </v-subheader>-->
              <!--                  <v-simple-table-->
              <!--                    fixed-header-->
              <!--                  >-->
              <!--                    <template v-slot:default>-->
              <!--                      <thead>-->
              <!--                        <tr>-->
              <!--                          <th class="text-left">-->
              <!--                            Name-->
              <!--                          </th>-->
              <!--                          <th class="text-left">-->
              <!--                            Quantity In Stock-->
              <!--                          </th>-->
              <!--                        </tr>-->
              <!--                      </thead>-->
              <!--                      <tbody>-->
              <!--                        <tr-->
              <!--                          v-for="item in products"-->
              <!--                          :key="item.name"-->
              <!--                        >-->
              <!--                          <td>{{ item.name }}</td>-->
              <!--                          <td>{{ item.in_stock }}</td>-->
              <!--                        </tr>-->
              <!--                      </tbody>-->
              <!--                    </template>-->
              <!--                  </v-simple-table>-->
              <!--                </v-card-text>-->
              <!--              </v-col>-->

              <!--              <v-col cols="12">-->
              <!--                <v-select-->
              <!--                  v-model="optionsLocal.supplier"-->
              <!--                  placeholder="Select a Supplier"-->
              <!--                  label="Supplier *"-->
              <!--                  item-text="name"-->
              <!--                  item-value="id"-->
              <!--                  dense-->
              <!--                  :items="suppliers"-->
              <!--                  :error-messages="errors.supplier_id"-->
              <!--                  return-object-->
              <!--                ></v-select>-->
              <!--              </v-col>-->
              <v-col
                cols="12"
                class=""
              >
                <card-supplier-details
                  :suppliers="suppliers"
                  :supplier-data="optionsLocal.supplier"
                  @getData="getSupplier"
                />
              </v-col>
              <v-col cols="12">
                <v-card-text class="px-0">
                  <v-simple-table
                    fixed-header
                  >
                    <template v-slot:default>
                      <thead>
                        <tr>
                          <th class="text-left">
                            Material Name
                          </th>
                          <th class="text-left">
                            Requested Quantity
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="(item, key) in orderItems"
                          :key="item.name"
                        >
                          <td>{{ item.name }}</td>
                          <td>
                            <v-text-field
                              v-model="item.quantity"
                              hide-details="auto"
                              dense
                              label="Quantity"
                            ></v-text-field>
                          </td>
                        </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
                </v-card-text>
              </v-col>
              <v-col
                cols="7"
              >
                <v-textarea
                  v-model="optionsLocal.description"
                  outlined
                  dense
                  label="Description"
                  hide-details="auto"
                ></v-textarea>
              </v-col>
              <v-col
                cols="12"
                class=" mb-6"
              >
                <card-downpayment-details
                  @getDownpayment="getDownpayment"
                />
              </v-col>
            </v-row>
          </v-card-text>

          <v-card-text class="mt-10">
            <v-btn
              v-if="canApprovePO"
              outlined
              class="mr-3"
              color="primary"
              @click="save"
            >
              Approve
            </v-btn>
            <v-btn
              outlined
              type="reset"
              @click.prevent="goBack"
            >
              Back to List
            </v-btn>
          </v-card-text>
        </v-form>
      </v-tab-item>
      <v-tab-item>
        <purchase-order-logs :order-id="id"></purchase-order-logs>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import {
  computed, ref, onMounted,
} from '@vue/composition-api'
import router from '@/router'
import store from '@/store'
import {
  APPROVE_PURCHASE_ORDER,
  GET_PRODUCTS,
  GET_SUPPLIERS,
} from '@/store/actions.type'
import PurchaseOrdersService from '@/utils/services/purchase-orders.service'
import { mdiBookInformationVariant, mdiClipboardListOutline } from '@mdi/js'
import PurchaseOrderLogs from '@/views/pages/purchase-orders/purchase-order/logs/PurchaseOrderLogs.vue'
import CardSupplierDetails from '@/views/pages/purchase-orders/component/CardSupplierDetails.vue'
import CardDownpaymentDetails from '@/views/pages/purchase-orders/component/CardDownpaymentDetails.vue'

export default {
  components: {
    PurchaseOrderLogs,
    CardSupplierDetails,
    CardDownpaymentDetails,
  },
  setup() {
    const { id } = router.history.current.params
    const errors = computed(() => store.getters.errors)
    const products = computed(() => store.getters.products)
    const suppliers = computed(() => store.getters.suppliers)
    const selectedItemTrigger = ref([])
    const orderItems = ref([])
    const showAlert = ref(false)
    const optionsLocal = ref({
      fx_number: '',
      eta: '',
      items: {},
      total: 0,
      percentage: 0,
      description: '',
      paid_amount: '',
      balance: 0,
      supplier: {},
    })
    const tab = ref('')
    const dollarPercentageToPay = ref('')
    const pesoPercentageToPay = ref('')

    const canApprovePO = store.getters['AuthStore/hasAbility']('approve-purchase order')

    const getSupplier = supplier => {
      optionsLocal.value.supplier.id = supplier.supplier_id
    }

    const downpaymentDetailForm = ref({})

    const getDownpayment = downpaymentDetails => {
      downpaymentDetailForm.value = downpaymentDetails
    }

    onMounted(async () => {
      await PurchaseOrdersService.find(id)
        .then(response => {
          const { data } = response.data
          optionsLocal.value = {
            description: data.order.description,
            fx_number: data.order.fx_id,
            supplier: {},
            items: {},
          }

          orderItems.value = data.items
        })
    })

    store.dispatch(GET_PRODUCTS)
    store.dispatch(GET_SUPPLIERS)

    const goBack = () => {
      router.push('/purchase-orders')
    }

    const resolveFormSuccess = () => {
      showAlert.value = true
      setTimeout(() => {
        goBack()
      }, 1000)
    }

    const debounce = (func, timeout = 500) => {
      let timer

      return (...args) => {
        clearTimeout(timer)
        timer = setTimeout(() => {
          func.apply(this, args)
        }, timeout)
      }
    }

    const moneyFormat = debounce(field => {
      if (field) {
        optionsLocal.value[field] = parseFloat(optionsLocal.value[field]).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
      }
    })

    const save = () => {
      let currentForm = optionsLocal.value
      currentForm.id = router.history.current.params.id
      currentForm.supplier_id = currentForm.supplier.id
      currentForm.raw_materials = []

      orderItems.value.forEach(item => {
        currentForm.raw_materials.push({
          id: item.id,
          quantity: item.quantity,
        })
      })

      currentForm = { ...currentForm, ...downpaymentDetailForm.value }

      store.dispatch(APPROVE_PURCHASE_ORDER, currentForm).then(data => {
        if (data != null) {
          resolveFormSuccess()
        }
      })
    }

    const tabs = [
      { title: 'Information', icon: mdiBookInformationVariant },
      { title: 'Logs', icon: mdiClipboardListOutline },
    ]

    return {
      getDownpayment,
      getSupplier,
      canApprovePO,
      id,
      tab,
      tabs,
      selectedItemTrigger,
      products,
      optionsLocal,
      goBack,
      save,
      showAlert,
      errors,
      orderItems,
      dollarPercentageToPay,
      pesoPercentageToPay,
      suppliers,
      moneyFormat,
    }
  }
  ,
}
</script>
