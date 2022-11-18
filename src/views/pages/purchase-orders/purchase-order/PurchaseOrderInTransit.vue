<template>
  <v-card
    flat
    class=""
  >
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
          Successfully marked purchase order as <strong>In Transit</strong>. You will be
          automatically
          redirected in a bit.
        </v-alert>
        <v-form class="multi-col-validation">
          <v-card-text class="pt-5">
            <v-row>
              <v-col cols="6">
                <v-img
                  class="mt-10"
                  aspect-ratio="1.7"
                  max-height="250"
                  contain
                  lazy-src="https://cdn.openpr.com/V/5/V531717180_g.jpg"
                  src="https://cdn.openpr.com/V/5/V531717180_g.jpg"
                ></v-img>
              </v-col>
              <v-col cols="6">
                <v-card-text class="mt-10">
                  <v-simple-table
                    fixed-header
                  >
                    <v-subheader>
                      Subheader
                    </v-subheader>
                    <template v-slot:default>
                      <thead>
                        <tr>
                          <th class="text-left">
                            <span class="white--text">
                              Material Name
                            </span>
                          </th>
                          <th class="text-left">
                            <span class="white--text">
                              Requested Quantity
                            </span>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="(item, key) in orderItems"
                          :key="item.name"
                        >
                          <td>
                            <span class="white--text">
                              {{ item.name }}
                            </span>
                          </td>
                          <td>
                            <span class="white--text">
                              {{ item.quantity }}
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
                </v-card-text>
              </v-col>
              <v-col
                cols="12"
                class="mt-10"
              >
                <card-supplier-details
                  :supplier-data="supplier"
                  :supplier-disabled="true"
                />
              </v-col>
              <v-col
                cols="12"
                class="mt-6"
              >
                <h2 class="font-weight-black mb-2 text-uppercase">
                  Payment Details
                </h2>
                <v-divider />
              </v-col>
              <v-col cols="3">
                <span class="white--text font-weight-semibold">
                  Remaining Balance
                </span>
              </v-col>
              <v-col cols="4">
                <span class="text--accent-4 font-weight-medium error--text">
                  ${{ formatPrice(balanceToPay) }}
                </span>
              </v-col>
              <v-col cols="4">
                <span class="text--accent-4 font-weight-light">
                </span>
              </v-col>
              <v-col cols="3">
                <span class="white--text text--accent-4 font-weight-semibold">
                  Current Paid Amount
                </span>
              </v-col>
              <v-col cols="3">
                <span class="white--text text--accent-4 font-weight-semibold">
                  USD Amount
                </span>
              </v-col>
              <v-col cols="4">
                <span class="white--text text--accent-4 font-weight-semibold">
                  PHP Amount
                </span>
              </v-col>
              <v-col cols="3">
                <span class="text--accent-4 font-weight-semibold">
                </span>
              </v-col>
              <v-col
                cols="3"
                class="mt-n5"
              >
                <span class="text--accent-4 font-weight-medium success--text">
                  {{ optionsLocal.total_usd_paid_amount }}
                </span>
              </v-col>
              <v-col
                cols="4"
                class="mb-6 mt-n5"
              >
                <span class="text--accent-4 font-weight-medium success--text">
                  {{ optionsLocal.total_peso_paid_amount }}
                </span>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-divider />
              </v-col>
              <v-col cols="4">
                <v-text-field
                  v-model="conversionRate"
                  prefix="PHP"
                  outlined
                  dense
                  class="text-green"
                  label="Philippine Peso per USD"
                  hide-details="auto"
                  :error-messages="errors.conversion_rate"
                  @input="moneyFormat('')"
                ></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-text-field
                  v-model="pesoPercentageToPay"
                  color="success"
                  prefix="PHP"
                  outlined
                  readonly
                  dense
                  class="text-green"
                  label="PHP Amount to be paid"
                  hide-details="auto"
                  @input="moneyFormat('')"
                ></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-text-field
                  v-model="dollarPercentageToPay"
                  color="success"
                  prefix="PHP"
                  outlined
                  readonly
                  dense
                  class="text-green"
                  label="USD Amount to be paid"
                  hide-details="auto"
                  @input="moneyFormat('')"
                ></v-text-field>
              </v-col>
              <v-col
                cols="4"
              >
                <v-text-field
                  v-model="optionsLocal.fx_number"
                  outlined
                  dense
                  label="FX Number"
                  hide-details="auto"
                  :error-messages="errors.fx_number"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col
                cols="12"
                class="mt-6"
              >
                <h2 class="font-weight-black mb-2 text-uppercase">
                  Other Expenses
                </h2>
                <v-divider />
              </v-col>
              <v-col>
                <div
                  v-for="index in expenseRow"
                  :key="index"
                >
                  <purchase-order-expenses
                    :item-number="index"
                    @addExpensesRow="handleAddExpense"
                    @expenseAdded="attachExpense"
                  />
                </div>
              </v-col>
            </v-row>
          </v-card-text>

          <v-card-text class="mt-10">
            <v-btn
              v-if="canMarkAsInTransitPO"
              outlined
              class="mr-3"
              color="primary"
              @click="save"
            >
              Mark as In Transit
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
      <v-tab-item>
        <purchase-order-payment-logs :order-id="id"></purchase-order-payment-logs>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import {
  computed, nextTick, ref, watch, onMounted,
} from '@vue/composition-api'
import router from '@/router'
import store from '@/store'
import {
  IN_TRANSIT_PURCHASE_ORDER,
} from '@/store/actions.type'
import PurchaseOrdersService from '@/utils/services/purchase-orders.service'
import { mdiBookInformationVariant, mdiClipboardListOutline, mdiCurrencyUsd } from '@mdi/js'
import PurchaseOrderLogs from '@/views/pages/purchase-orders/purchase-order/logs/PurchaseOrderLogs.vue'
import PurchaseOrderPaymentLogs
from '@/views/pages/purchase-orders/purchase-order/logs/PurchaseOrderPaymentLogs.vue'
import CardSupplierDetails from '@/views/pages/purchase-orders/component/CardSupplierDetails.vue'
import PurchaseOrderExpenses from '@/views/pages/purchase-orders/component/PurchaseOrderExpenses.vue'

export default {
  components: {
    PurchaseOrderPaymentLogs,
    PurchaseOrderLogs,
    CardSupplierDetails,
    PurchaseOrderExpenses,
  },
  setup() {
    const { id } = router.history.current.params
    const conversionRate = ref()
    const errors = computed(() => store.getters.errors)
    const optionsLocal = ref({})
    const details = ref({})
    const supplier = ref({})
    const showAlert = ref(false)
    const orderItems = ref([])
    const tab = ref('')
    const price = ref('')
    const dollarPercentageToPay = ref(0.00)
    const pesoPercentageToPay = ref(0.00)
    const balanceToPay = ref('')
    const expenseRow = ref(1)
    const attachedExpenses = ref({})
    const canMarkAsInTransitPO = store.getters['AuthStore/hasAbility']('mark in transit-purchase order')

    onMounted(async () => {
      await PurchaseOrdersService.find(id)
        .then(response => {
          const { data } = response.data
          optionsLocal.value = {
            total_peso_paid_amount: data.total_peso_paid_amount,
            total_usd_paid_amount: data.total_usd_paid_amount,
            description: data.order.description,
            fx_number: data.order.fx_id,
            eta: data.order.eta,
            total: data.order.total,
            paid_amount: data.order.paid_amount,
            items: {},
            conversion_rate: null,
          }

          details.value = optionsLocal.value

          balanceToPay.value = data.balance_amount
          price.value = balanceToPay.value

          supplier.value = data.supplier
          orderItems.value = data.items
        })
    })

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
      conversionRate.value = parseFloat(conversionRate.value).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
    })

    const formatPrice = value => parseFloat(value)
      .toFixed(2)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')

    watch(conversionRate, value => {
      const localConversionRate = parseFloat(value).toFixed(2)
      optionsLocal.value.conversion_rate = localConversionRate
      // eslint-disable-next-line radix
      dollarPercentageToPay.value = parseInt(balanceToPay.value).toFixed(2).toString()
      // eslint-disable-next-line radix
      pesoPercentageToPay.value = parseInt(dollarPercentageToPay.value * localConversionRate).toFixed(2).toString()

      pesoPercentageToPay.value = formatPrice(pesoPercentageToPay.value)
      dollarPercentageToPay.value = formatPrice(dollarPercentageToPay.value)
    }, true)

    const goBack = () => {
      router.push('/purchase-orders')
    }

    const resolveFormSuccess = () => {
      showAlert.value = true
      setTimeout(() => {
        goBack()
      }, 1000)
    }

    watch(
      price,
      value => {
        const result = formatPrice(value)
        // eslint-disable-next-line no-return-assign
        nextTick(() => price.value = result)
      },
      { immediate: true },
    )

    const save = () => {
      const currentForm = optionsLocal.value
      currentForm.id = router.history.current.params.id
      currentForm.usd_conversion = dollarPercentageToPay.value
      currentForm.peso_conversion = pesoPercentageToPay.value
      currentForm.paid_amount = price.value

      if (attachedExpenses.value !== null) {
        currentForm.expenses = attachedExpenses.value
      }

      store.dispatch(IN_TRANSIT_PURCHASE_ORDER, currentForm).then(data => {
        if (data != null) {
          resolveFormSuccess()
        }
      })
    }

    // tabs
    const tabs = [
      { title: 'Purchase Order Information', icon: mdiBookInformationVariant },
      { title: 'Purchase Order Logs', icon: mdiClipboardListOutline },
      { title: 'Purchase Order Payment Logs', icon: mdiCurrencyUsd },
    ]

    const handleAddExpense = () => {
      if (expenseRow.value < 5) expenseRow.value += 1
    }

    const attachExpense = (item, index) => {
      attachedExpenses.value[index] = item
    }

    return {
      conversionRate,
      moneyFormat,
      canMarkAsInTransitPO,
      id,
      tabs,
      tab,
      optionsLocal,
      orderItems,
      goBack,
      save,
      showAlert,
      errors,
      price,
      formatPrice,
      dollarPercentageToPay,
      pesoPercentageToPay,
      balanceToPay,
      supplier,
      handleAddExpense,
      attachExpense,
      expenseRow,
      attachedExpenses,
      details,
    }
  },
}
</script>
<style>
.text-green input {
  color: #009900 !important;
}

</style>
