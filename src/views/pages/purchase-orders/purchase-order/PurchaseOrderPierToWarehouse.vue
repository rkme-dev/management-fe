<template>
  <v-card
    flat
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
          Successfully marked purchase order as moving from <strong>Pier to Warehouse</strong>. You will be automatically
          redirected in a bit.
        </v-alert>
        <v-form class="multi-col-validation">
          <v-card-text class="pt-5">
            <v-row>
              <v-col cols="12">
                <v-card-text>
                  <v-alert
                    v-show="hasRawMaterialError"
                    dense
                    text
                    type="error"
                  >
                    Total Box field and Pieces per box field is required.
                  </v-alert>

                  <v-simple-table>
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
                              <v-text-field
                                v-model.number="orderItems[key].total_box"
                                dense
                                :rules="onlyWhole"
                                type="number"
                                label="Box count *"
                                hide-details="auto"
                              ></v-text-field>
                            </span>
                          </td>
                          <td>
                            <span class="white--text">
                              <v-text-field
                                v-model.number="orderItems[key].pieces_per_box"
                                dense
                                :rules="onlyWhole"
                                type="number"
                                label="Pieces per box *"
                                hide-details="auto"
                              ></v-text-field>
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
                cols="12"
                class="mt-10 mb-6"
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
                  :readonly="mode === 'show'"
                  hide-details="auto"
                  :persistent-placeholder="mode === 'show'"
                  :error-messages="errors.container_number"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="optionsLocal.eta"
                  outlined
                  dense
                  label="Estimated Date and Time of Arrival"
                  :readonly="mode === 'show'"
                  hide-details="auto"
                  :persistent-placeholder="mode === 'show'"
                  type="datetime-local"
                  :error-messages="errors.eta"
                ></v-text-field>
              </v-col>
              <v-col
                cols="6"
              >
                <v-text-field
                  v-model="optionsLocal.courier_name"
                  outlined
                  dense
                  label="Shipping Company"
                  :readonly="mode === 'show'"
                  hide-details="auto"
                  :persistent-placeholder="mode === 'show'"
                  :error-messages="errors.courier_name"
                ></v-text-field>
              </v-col>
              <v-col
                cols="6"
              >
                <v-text-field
                  v-model="optionsLocal.courier_number"
                  outlined
                  dense
                  label="Shipping Info"
                  :readonly="mode === 'show'"
                  hide-details="auto"
                  :persistent-placeholder="mode === 'show'"
                  :error-messages="errors.courier_number"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>

          <v-card-text class="mt-10">
            <v-btn
              v-if="canMarkAaPierToWarehouse"
              outlined
              class="mr-3"
              color="primary"
              @click="save"
            >
              Mark as Pier to Warehouse
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
  computed, ref, watch, onMounted,
} from '@vue/composition-api'
// eslint-disable-next-line import/no-cycle
import router from '@/router'
import store from '@/store'
import {
  PIER_TO_WAREHOUSE_PURCHASE_ORDER,
} from '@/store/actions.type'
import PurchaseOrdersService from '@/utils/services/purchase-orders.service'
import {
  mdiBookInformationVariant, mdiClipboardListOutline, mdiCurrencyUsd, mdiBarcode,
} from '@mdi/js'
import PurchaseOrderLogs from '@/views/pages/purchase-orders/purchase-order/logs/PurchaseOrderLogs.vue'
import PurchaseOrderPaymentLogs
from '@/views/pages/purchase-orders/purchase-order/logs/PurchaseOrderPaymentLogs.vue'
import CardSupplierDetails from '@/views/pages/purchase-orders/component/CardSupplierDetails.vue'

export default {
  components: {
    PurchaseOrderPaymentLogs,
    PurchaseOrderLogs,
    CardSupplierDetails,
  },
  setup() {
    const hasRawMaterialError = ref(false)
    const { id } = router.history.current.params
    const errors = computed(() => store.getters.errors)
    const onlyWhole = computed(() => [
      v => /^\d+$/.test(v) || 'This field only accept whole numbers'])
    const optionsLocal = ref({})
    const supplier = ref({})
    const showAlert = ref(false)
    const orderItems = ref([])
    const tab = ref('')
    const canMarkAaPierToWarehouse = store.getters['AuthStore/hasAbility']('mark pier to warehouse-purchase order')

    watch(errors, value => {
      console.log(value)
    })
    onMounted(async () => {
      await PurchaseOrdersService.find(id)
        .then(response => {
          const { data } = response.data
          optionsLocal.value = {
            description: data.order.description,
            fx_number: data.order.fx_id,
            eta: data.order.eta,
            total: data.order.total,
            paid_amount: data.order.paid_amount,
            items: {},
          }
          supplier.value = data.supplier
          orderItems.value = response.data.data.items.map(item => ({
            id: item.id,
            name: item.name,
            quantity: item.quantity,
            actual_quantity: item.actual_quantity,
            total_box: item.total_box,
            pieces_per_box: item.pieces_per_box,
          }))
        })
    })

    // watch(orderItems, value => {
    //   orderItems.value.forEach((item, index) => {
    //     if (item.pieces_per_box && item.total_box) {
    //       // eslint-disable-next-line radix
    //       orderItems.value[index].actual_quantity = parseInt(item.pieces_per_box * item.total_box)
    //     } else {
    //       orderItems.value[index].actual_quantity = 0
    //     }
    //   })
    // }, true)

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

      currentForm.raw_materials = []

      orderItems.value.forEach(item => {
        if (item.total_box === '0' || item.pieces_per_box === '0') {
          hasRawMaterialError.value = true
        } else {
          currentForm.raw_materials.push({
            id: item.id,
            total_box: item.total_box,
            pieces_per_box: item.pieces_per_box,
            actual_quantity: item.actual_quantity,
          })
        }
      })

      if (currentForm.raw_materials.length === orderItems.value.length) {
        store.dispatch(PIER_TO_WAREHOUSE_PURCHASE_ORDER, currentForm).then(data => {
          if (data != null) {
            resolveFormSuccess()
          }
        })
      } else {
        window.scrollTo(0, 0)
      }
    }

    // tabs
    const tabs = [
      { title: 'Purchase Order Information', icon: mdiBookInformationVariant },
      { title: 'Purchase Order Logs', icon: mdiClipboardListOutline },
      { title: 'Purchase Order Payment Logs', icon: mdiCurrencyUsd },
    ]

    return {
      id,
      mode: 'edit',
      hasRawMaterialError,
      canMarkAaPierToWarehouse,
      tabs,
      tab,
      optionsLocal,
      orderItems,
      goBack,
      save,
      showAlert,
      errors,
      supplier,
      onlyWhole
    }
  },
}
</script>
