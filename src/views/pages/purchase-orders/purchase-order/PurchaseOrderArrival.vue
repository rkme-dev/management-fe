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

    <v-tabs-items v-model="tab">
      <v-tab-item>
        <v-alert
          v-show="showAlert"
          dense
          text
          type="success"
        >
          Successfully marked a purchase order as <strong>Arrived</strong>r. You will be
          automatically
          redirected in a bit.
        </v-alert>
        <v-form class="multi-col-validation">
          <v-card-text class="pt-5">
            <v-row>
              <v-col cols="12">
                <v-card-text class="">
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
                          <th class="text-left">
                            <span class="white--text">
                              Actual Quantity
                            </span>
                          </th>

                          <th class="text-left">
                            <span class="white--text">
                              Number of Box
                            </span>
                          </th>
                          <th class="text-left">
                            <span class="white--text">
                              Pieces per box
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
                          <td>
                            <span
                              v-show="orderItems[key].total_box && orderItems[key].pieces_per_box"
                              class="white--text"
                            >
                              {{ parseInt(orderItems[key].total_box * orderItems[key].pieces_per_box) }}
                            </span>
                          </td>
                          <td>
                            <span class="white--text">
                              {{ orderItems[key].total_box }}
                            </span>
                          </td>
                          <td>
                            <span class="white--text">
                              {{ orderItems[key].pieces_per_box }}
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
                class=""
              >
                <card-supplier-details
                  :supplier-data="supplier"
                  :supplier-disabled="true"
                />
              </v-col>
              <v-col
                cols="6"
              >
                <v-textarea
                  v-model="optionsLocal.description"
                  outlined
                  dense
                  label="Description"
                  readonly
                />
              </v-col>

              <v-col
                cols="12"
                class="mt-10 mb-6"
              >
                <h2 class="font-weight-black mb-2 text-uppercase">
                  Payment Details
                </h2>
                <v-divider />
              </v-col>
              <v-col
                cols="6"
              >
                <v-text-field
                  :value="optionsLocal.total_amount_payable"
                  outlined
                  dense
                  class="text-green"
                  label="Total amount"
                  readonly
                ></v-text-field>
              </v-col>
              <v-col
                cols="6"
              >
                <v-text-field
                  :value="optionsLocal.total_peso_paid_amount"
                  outlined
                  dense
                  class="text-green"
                  label="Total Amount paid in PHP"
                  readonly
                ></v-text-field>
              </v-col>
              <v-col
                cols="7"
              >
                <v-text-field
                  :value="optionsLocal.paid_date"
                  outlined
                  dense
                  class="text-green"
                  label="Paid at"
                  readonly
                  type="datetime-local"
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                class="mb-6"
              >
                <h2 class="font-weight-black mb-2 text-uppercase">
                  Shipping Details
                </h2>
                <v-divider />
              </v-col>

              <v-col
                cols="6"
              >
                <v-text-field
                  v-model="optionsLocal.container_number"
                  outlined
                  dense
                  label="Container Number"
                  readonly
                ></v-text-field>
              </v-col>
              <v-col
                cols="6"
              >
                <v-text-field
                  v-model="optionsLocal.courier_name"
                  outlined
                  dense
                  label="Courier Name"
                  readonly
                ></v-text-field>
              </v-col>
              <v-col
                cols="6"
              >
                <v-text-field
                  v-model="optionsLocal.courier_number"
                  outlined
                  dense
                  label="Courier Number"
                  readonly
                ></v-text-field>
              </v-col>

              <v-col
                cols="6"
              >
                <v-text-field
                  v-model="optionsLocal.eta"
                  outlined
                  dense
                  label="Estimated Date and Time of Arrival"
                  readonly
                  type="datetime-local"
                />
              </v-col>
            </v-row>
          </v-card-text>

          <v-card-text class="mt-10">
            <v-btn
              v-if="permissions.canMarkAsArrived"
              outlined
              class="mr-3"
              color="primary"
              @click="save"
            >
              Mark as arrived
            </v-btn>
            <v-btn
              v-if="permissions.canPrintPurchaseOrder"
              outlined
              class="mr-3"
              type="reset"
              @click.prevent="redirectPrint"
            >
              Print Purchase Order
            </v-btn>
            <v-btn
              v-if="permissions.canPrintBarcode"
              outlined
              class="mr-3"
              type="reset"
              @click.prevent="redirectBarcodePrint"
            >
              Barcode Print
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
  computed, onMounted, ref, watch,
} from '@vue/composition-api'
import router from '@/router'
import store from '@/store'
import { ARRIVAL_PURCHASE_ORDER, GET_PURCHASE_ORDER, GET_SUPPLIER } from '@/store/actions.type'
import PurchaseOrderLogs from '@/views/pages/purchase-orders/purchase-order/logs/PurchaseOrderLogs'
import PurchaseOrderPaymentLogs
from '@/views/pages/purchase-orders/purchase-order/logs/PurchaseOrderPaymentLogs'
import CardSupplierDetails from '@/views/pages/purchase-orders/component/CardSupplierDetails.vue'
import { mdiBookInformationVariant, mdiClipboardListOutline, mdiCurrencyUsd } from '@mdi/js'
import PurchaseOrdersService from '@/utils/services/purchase-orders.service'

export default {
  components: {
    PurchaseOrderPaymentLogs,
    PurchaseOrderLogs,
    CardSupplierDetails,
  },
  setup() {
    const { id } = router.history.current.params
    const errors = computed(() => store.getters.errors)
    const optionsLocal = ref({})
    const supplier = ref({})
    const orderItems = ref({})
    const showAlert = ref(false)
    const barcodeUrl = ref('')
    const tab = ref('')
    const permissions = {
      canMarkAsArrived: store.getters['AuthStore/hasAbility']('mark as arrived-purchase order'),
      canPrintPurchaseOrder: store.getters['AuthStore/hasAbility']('print-purchase order'),
      canPrintBarcode: store.getters['AuthStore/hasAbility']('print barcode-purchase order'),
    }

    const goBack = () => {
      router.push('/purchase-orders')
    }

    const resolveFormSuccess = () => {
      showAlert.value = true
      setTimeout(() => {
        goBack()
      }, 1000)
    }

    const save = () => {
      const currentForm = optionsLocal.value
      currentForm.id = router.history.current.params.id

      store.dispatch(ARRIVAL_PURCHASE_ORDER, currentForm).then(data => {
        if (data != null) {
          resolveFormSuccess()
        }
      })
    }

    const redirectPrint = () => {
      window.open(`https://management-api-v1.herokuapp.com/print-purchase-order/${id}`, '_blank')
    }

    const redirectBarcodePrint = () => {
      window.open(barcodeUrl.value, '_blank')
    }

    const currency = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    })

    // tabs
    const tabs = [
      { title: 'Purchase Order Information', icon: mdiBookInformationVariant },
      { title: 'Purchase Order Logs', icon: mdiClipboardListOutline },
      { title: 'Purchase Order Payment Logs', icon: mdiCurrencyUsd },
    ]

    onMounted(async () => {
      await PurchaseOrdersService.find(id)
        .then(response => {
          const { data } = response.data

          optionsLocal.value = {
            paid_date: data.order.updated_at,
            date_paid: data.order.payment_logs[data.order.payment_logs.length - 1].created_at,
            total_peso_paid_amount: data.total_peso_paid_amount,
            description: data.order.description,
            courier_number: data.order.courier_number,
            courier_name: data.order.courier_name,
            container_number: data.order.container_number,
            total_amount_payable: currency.format(data.order.total_amount_payable),
            fx_number: data.order.fx_id,
            eta: data.order.eta,
            total: currency.format(data.order.total),
            paid_amount: data.order.paid_amount,
            items: {},
          }

          supplier.value = data.supplier
          orderItems.value = data.items
          barcodeUrl.value = `http://enco.api/print-purchase-order-barcode/${id}?count=${data.order.total_quantity}`
        })
    })

    return {
      id,
      tab,
      tabs,
      permissions,
      optionsLocal,
      goBack,
      save,
      showAlert,
      errors,
      supplier,
      orderItems,
      redirectPrint,
      redirectBarcodePrint,
    }
  },
}
</script>
<style>
.text-green input {
  color: chartreuse !important;
}

</style>
