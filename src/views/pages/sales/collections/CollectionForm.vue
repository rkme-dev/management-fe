<template>
  <v-card>
    <v-card-title class="pa-6">
      {{ mode }} Collection
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
                  {{ icons.mdiInformation }}
                </v-icon>
                <div class="ms-3">
                  <p class="text-base font-weight-medium mb-1">
                    Information
                  </p>
                </div>
              </div>
            </v-alert>
          </v-col>
          <v-col
            cols="6"
            class="pr-8 pl-8"
          >
            <v-menu
              v-model="formData.dateModal"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              :disabled="formData.status === 'Posted'"
              max-width="290px"
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="datePosted"
                  label="Date"
                  persistent-hint
                  :prepend-icon="icons.mdiCalendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>

              <v-date-picker
                v-model="datePosted"
                no-title
                color="primary"
                @input="formData.dateModal = false"
              ></v-date-picker>
            </v-menu>
          </v-col>
          <v-col
            cols="3"
            class="pr-8 pl-8"
          >
            <v-text-field
                v-if="formData.id !== undefined"
                v-model="formData.collection_order_number"
                outlined
                readonly
                dense
                hide-details="auto"
                label="Collection Number"
            ></v-text-field>
          </v-col>
          <v-col
            cols="3"
            class="pr-8 pl-8"
          >
            <v-select
              v-model="formData.document_id"
              :items="documents"
              item-text="title"
              item-value="id"
              label="Document"
              :disabled="formData.status === 'Posted'"
              :error-messages="errors.document_id"
              outlined
              dense
              hide-details="auto"
            ></v-select>
          </v-col>
          <v-col
            cols="4"
            class="pl-8"
          >
            <v-text-field
              v-model="formData.customer_name"
              outlined
              readonly
              :error-messages="errors.customer_id"
              dense
              hide-details="auto"
              label="Customer"
            ></v-text-field>
          </v-col>
          <v-col
            cols="2"
          >
            <v-btn
              v-if="mode == 'Create'"
              class="md4"
              color="primary"
              x-small
              dark
              @click="showCustomerModal"
            >
              Get Customer
              <v-icon>
                {{ icons.mdiAccountPlusOutline }}
              </v-icon>
            </v-btn>
          </v-col>
          <v-col
            cols="3"
            class="pr-8 pl-8"
          >
            <v-select
              v-model="formData.type"
              :items="types"
              label="Customer Type"
              disabled
              :error-messages="errors.type"
              readonly
              outlined
              dense
              hide-details="auto"
            ></v-select>
          </v-col>
          <v-col
            cols="3"
            class="pr-8 pl-8"
          >
            <v-text-field
              v-model="formData.area"
              outlined
              dense
              :disabled="formData.status === 'Posted'"
              :error-messages="errors.area"
              hide-details="auto"
              label="Area"
            ></v-text-field>
          </v-col>
          <v-col
            cols="3"
            class="pr-8 pl-8"
          >
            <v-select
              v-model="formData.term_id"
              :items="terms"
              :disabled="formData.status === 'Posted'"
              label="Term"
              item-text="code"
              item-value="id"
              :error-messages="errors.term_id"
              outlined
              dense
              hide-details="auto"
            ></v-select>
          </v-col>
          <v-col
            cols="3"
            class="pr-8 pl-8"
          >
            <v-select
              v-model="formData.vat_id"
              :items="vats"
              item-text="code"
              item-value="id"
              :disabled="formData.status === 'Posted'"
              label="Vat"
              :error-messages="errors.vat_id"
              outlined
              dense
              hide-details="auto"
            ></v-select>
          </v-col>
          <v-col
            cols="3"
            class="pr-8 pl-8"
          >
            <v-select
              v-model="formData.salesman_id_1"
              :items="salesmans"
              item-text="salesman_name"
              item-value="id"
              :disabled="formData.status === 'Posted'"
              label="Agent 1"
              :error-messages="errors.salesman_id_1"
              outlined
              dense
              hide-details="auto"
            ></v-select>
          </v-col>
          <v-col
            cols="3"
            class="pr-8 pl-8"
          >
            <v-select
              v-model="formData.salesman_id_2"
              :items="salesmans"
              item-text="salesman_name"
              item-value="id"
              :disabled="formData.status === 'Posted'"
              label="Agent 2"
              :error-messages="errors.salesman_id_2"
              outlined
              dense
              hide-details="auto"
            ></v-select>
          </v-col>
          <v-col
            cols="6"
            class="pr-8 pl-8"
          >
            <v-textarea
              v-model="formData.address"
              outlined
              :disabled="formData.status === 'Posted'"
              rows="2"
              dense
              :error-messages="errors.address"
              hide-details="auto"
              label="Address"
            ></v-textarea>
          </v-col>
          <v-col
            cols="3"
            class="pr-8 pl-8"
          >
            <v-textarea
              v-model="formData.remarks"
              outlined
              :disabled="formData.status === 'Posted'"
              rows="2"
              dense
              :error-messages="errors.remarks"
              hide-details="auto"
              label="Remarks"
            ></v-textarea>
          </v-col>
          <v-col
            cols="3"
            class="pr-8 pl-8"
          >
            <v-text-field
              v-model="formData.promo_code"
              outlined
              :disabled="formData.status === 'Posted'"
              dense
              :error-messages="errors.promo_code"
              hide-details="auto"
              label="Promo Code"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row class="mt-10">
          <v-col cols="12">
            <v-alert
              color="info"
              text
              style="margin-bottom: -10px"
            >
              <div class="d-flex align-start">
                <v-icon color="info">
                  {{ icons.mdiCardOff }}
                </v-icon>
                <div class="ms-3">
                  <p class="text-base font-weight-medium mb-1">
                    Sales DR
                  </p>
                </div>
              </div>
            </v-alert>
          </v-col>
          <v-col
            v-if="formData.customer_id"
            cols="12"
          >
            <sales-dr-table
              :customer-id="formData.customer_id"
              :data="salesDrList"
              :status="formData.status"
              @removeDr="removeDr"
              @showModal="toggleDrModal"
              @totalPayment="totalPaymentCheck"
            >
            </sales-dr-table>
          </v-col>
        </v-row>
        <v-row class="mt-10">
          <v-col
            cols="12"
          >
            <v-alert
              color="success"
              text
              style="margin-bottom: -10px"
            >
              <div class="d-flex align-start">
                <v-icon color="success">
                  {{ icons.mdiCurrencySign }}
                </v-icon>
                <div class="ms-3">
                  <p class="text-base font-weight-medium mb-1">
                    Payments
                  </p>
                </div>
              </div>
            </v-alert>
          </v-col>
          <v-col
            v-if="paymentWarning"
            cols="12"
          >
            <v-alert
              color="error"
              text
              style="margin-bottom: -10px"
            >
              <div class="d-flex align-start">
                <v-icon color="error">
                  {{ icons.mdiInformation }}
                </v-icon>
                <div class="ms-3">
                  <p class="text-base font-weight-medium mb-1">
                    There is still remaining amount payment needed.
                  </p>
                </div>
              </div>
            </v-alert>
          </v-col>
          <v-col
            v-if="totalPaidWarning"
            cols="12"
          >
            <v-alert
              color="error"
              text
              style="margin-bottom: -10px"
            >
              <div class="d-flex align-start">
                <v-icon color="error">
                  {{ icons.mdiInformation }}
                </v-icon>
                <div class="ms-3">
                  <p class="text-base font-weight-medium mb-1">
                    Your total paid amount is greater than amount to pay.
                  </p>
                </div>
              </div>
            </v-alert>
          </v-col>
          <v-col
            v-if="formData.customer_id"
            cols="12"
          >
            <collection-payment
              :total-amount="totalAmount"
              :payments="payments"
              :collection-status="formData.status"
              :total-paid="totalPaid"
              @toggleModal="togglePaymentModal"
              @editPayment="editPayment"
              @removePayment="removePayment"
            ></collection-payment>
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="auto"
            class="d-flex"
          >
            <v-btn
              v-if="formData.status !== 'Posted'"
              color="primary"
              class="me-3 mt-4"
              @click="submit"
            >
              <v-icon>
                {{ icons.mdiContentSave }}
              </v-icon>
              {{ mode == 'Create' ? 'Create' : 'Update' }}
            </v-btn>
            <v-btn
              v-if="formData.status === 'For Review'"
              color="success"
              class="me-3 mt-4"
              @click="postOrder"
            >
              <v-icon>
                {{ icons.mdiFinance }}
              </v-icon>
              Post
            </v-btn>
            <v-btn
              v-if="formData.status === 'Posted' && formData.has_deposit === 0"
              color="error"
              class="me-3 mt-4"
              @click="unpostOrder"
            >
              <v-icon>
                {{ icons.mdiFinance }}
              </v-icon>
              Unpost
            </v-btn>
            <v-btn
              outlined
              class="me-3 mt-4"
              type="reset"
              color="info"
              @click.prevent="cancel"
            >
              <v-icon>
                {{ icons.mdiProgressClose }}
              </v-icon>
              Close
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
      <v-dialog
        v-model="drListModal"
        hide-overlay
        fullscreen
        transition="dialog-bottom-transition"
      >
        <dr-list-selection
          :customer-id="formData.customer_id"
          :existing-selected-dr="salesDrList"
          @selectedDrs="selectedDrs"
          @cancel="drListModal = false"
        >
        </dr-list-selection>
      </v-dialog>
      <v-dialog
        v-model="customerModal"
        fullscreen
        hide-overlay
        width="1100px"
        height="500px"
        transition="dialog-bottom-transition"
      >
        <customer-form
          :mode="'Selecting'"
          @submit="onSelectCustomer"
          @clicked="cancel"
        ></customer-form>
      </v-dialog>
      <v-dialog
        v-model="paymentModal"
        persistent
        width="1100"
        transition="dialog-bottom-transition"
      >
        <payment-form
          :total-amount="totalPaymentAmount"
          :data="paymentData"
          :mode="paymentModeData"
          @submit="onSelectCustomer"
          @clicked="cancel"
          @toggleModal="togglePaymentModal"
          @editPayment="editPayment"
          @addedPayment="addedPayment"
        ></payment-form>
      </v-dialog>
    </v-card-text>
  </v-card>
</template>

<script>
import {
  computed, onUnmounted, ref, toRef, watch,
} from '@vue/composition-api'
import {
  mdiAccountPlusOutline, mdiCardOff, mdiCurrencySign,
  mdiInformation,
} from '@mdi/js'
import CustomerForm from '@/views/pages/master-files/customers/CustomerForm.vue'
import store from '@/store'
import DrListSelection from '@/views/pages/sales/collections/DrListSelection.vue'
import SalesDrTable from './SalesDrTable.vue'
import CollectionPayment from './CollectionPayment.vue'
import PaymentForm from './PaymentForm.vue'

export default {
  name: 'CollectionForm',
  components: {
    CustomerForm,
    SalesDrTable,
    CollectionPayment,
    DrListSelection,
    PaymentForm,
  },
  props: {
    mode: {
      type: String,
      required: true,
      default: (() => 'Create'),
    },
    data: {
      type: Object,
      required: false,
      default: null,
    },
  },
  setup(props, { emit }) {
    store.dispatch('TermStore/list')
    store.dispatch('VatStore/list')
    store.dispatch('SalesmanStore/list')
    store.dispatch('DocumentStore/list')

    const modeData = toRef(props, 'mode')
    const datePosted = ref(new Date().toISOString().substr(0, 10))
    const dataProp = toRef(props, 'data')
    const customerModal = ref(false)
    const drListModal = ref(false)
    const paymentModal = ref(false)
    const paymentData = ref({})
    const paymentModeData = ref("Create")
    const showScanner = ref(false)
    const salesDrList = ref([])
    const formData = ref({
      dateModal: false,
      customer_name: null,
      customer_id: 0,
      date_posted: null,
      collection_order_number: null,
      document_id: null,
      address: null,
      remarks: null,
      area: null,
      salesman_id_1: null,
      salesman_id_2: null,
      term_id: null,
      vat_id: null,
    })
    const paymentWarning = ref(false)
    const totalPaidWarning = ref(false)
    const totalAmount = ref(0)
    const payments = ref([])
    const paymentsReinitialize = () => {
      if (formData.value.payments?.length > 0) {
        payments.value = formData.value.payments.map(payment => {
          if (payment.payment_type.includes('CashPayment') === true) {
            // eslint-disable-next-line no-param-reassign
            payment.payment_type = 'Cash Payment'
          }

          if (payment.payment_type.includes('CheckPayment') === true) {
            // eslint-disable-next-line no-param-reassign
            payment.payment_type = 'Check Payment'
          }

          if (payment.payment_type.includes('OnlinePayment') === true) {
            // eslint-disable-next-line no-param-reassign
            payment.payment_type = 'Online Payment'
          }

          return payment
        })
      }
      calculateTotalPaid()
    }
    const totalPaid = ref(0)

    const calculateTotalPaid = () => {
      let total = 0

      payments.value.forEach((item, index) => {
        total += parseFloat(item.amount)
      });
      totalPaid.value = total
    }

    if (modeData.value === 'Edit') {
      formData.value = dataProp.value
      formData.value.customer_name = dataProp.value.customer.name
      formData.value.customer_id = dataProp.value.customer.id
      formData.value.type = dataProp.value.customer.type

      if (formData.value.sales_dr_payments?.length > 0) {
        salesDrList.value = []
        salesDrList.value = formData.value.sales_dr_payments.map(item => {
          item = item.sales_dr

          if (item.remaining_balance) {
            item.remaining_balance = parseFloat(item.remaining_balance)
          }

          return item
        })
      }

      paymentsReinitialize()

      store.dispatch('SalesDrStore/drListByCustomer', formData.value.customer.id)
    } else {
      formData.value = {
        dateModal: false,
        customer_name: null,
        customer_id: null,
        date_posted: null,
        collection_order_number: null,
        document_id: null,
        address: null,
        remarks: null,
        area: null,
        salesman_id_1: null,
        salesman_id_2: null,
        term_id: null,
        vat_id: null,
      }
    }

    if (formData.value.sales_dr_payments?.length > 0) {
      salesDrList.value = []

      salesDrList.value = formData.value.sales_dr_payments.map(item => {
        item.id = item.sales_dr.id
        item.sales_dr_number = item.sales_dr.sales_dr_number
        item.remaining_balance = parseFloat(item.sales_dr.remaining_balance)

        return item
      })
    }

    onUnmounted(async () => {
      paymentWarning.value = false
      totalPaidWarning.value = false

      salesDrList.value = []
      formData.value = {
        dateModal: false,
        customer_name: null,
        customer_id: null,
        date_posted: null,
        collection_order_number: null,
        document_id: null,
        address: null,
        remarks: null,
        area: null,
        salesman_id_1: null,
        salesman_id_2: null,
        term_id: null,
        vat_id: null,
      }
    })

    watch(dataProp, () => {
      if (modeData.value === 'Edit') {
        formData.value = dataProp.value
        formData.value.customer_name = dataProp.value.customer.name
        formData.value.customer_id = dataProp.value.customer.id
        formData.value.type = dataProp.value.customer.type
        if (formData.value.sales_dr_payments?.length > 0) {
          salesDrList.value = []
          salesDrList.value = formData.value.sales_dr_payments.map(item => {
            item.sales_dr_number = item.sales_dr.sales_dr_number
            item.remaining_balance = parseFloat(item.sales_dr.remaining_balance)

            return item
          })
        }

        paymentsReinitialize()

        store.dispatch('SalesDrStore/drListByCustomer', formData.value.customer.id)
      } else {
        formData.value = {
          dateModal: false,
          customer_name: null,
          customer_id: null,
          date_posted: null,
          collection_order_number: null,
          document_id: null,
          address: null,
          remarks: null,
          area: null,
          salesman_id_1: null,
          salesman_id_2: null,
          term_id: null,
          vat_id: null,
        }

        salesDrList.value = []
      }
    })

    const cancel = () => {
      emit('submit')
      window.location.reload()
    }

    const totalPaymentAmount = ref(0)

    const showCustomerModal = () => {
      customerModal.value = true
    }

    const onSelectCustomer = customer => {
      if (customer?.id) {
        formData.value.customer_name = customer.name
        formData.value.customer_id = customer.id
        formData.value.document_id = customer.document_id
        formData.value.address = customer.address
        formData.value.remarks = customer.remarks
        formData.value.area = customer.area
        formData.value.salesman_id_1 = customer.salesman_id_1
        formData.value.salesman_id_2 = customer.salesman_id_2
        formData.value.term_id = customer.term_id
        formData.value.vat_id = customer.vat_id
        formData.value.type = customer.type
        store.dispatch('SalesDrStore/drListByCustomer', customer.id)
      }

      customerModal.value = false
    }

    const toggleDrModal = () => {
      drListModal.value = !drListModal.value
    }

    const paymentTypesMapping = {
      cash_payment: 'Cash Payment',
      check_payment: 'Check Payment',
      online_payment: 'Online Payment',
    }

    const togglePaymentModal = (mode) => {
      paymentModal.value = !paymentModal.value
      paymentModeData.value = mode
    }
    const editPayment = (data, index) => {
      paymentData.value = data
      paymentData.value.index = index
      paymentModeData.value = "Edit";
      paymentData.value.mode = paymentModeData.value
      /**
       * Identify payment type in passed data
       */
      data.payment_type = paymentTypesMapping[data.type]
      paymentData.value.index = index

      togglePaymentModal(paymentModeData.value)
    }

    const selectedDrs = salesDrs => {
      salesDrList.value = []

      salesDrs.forEach(element => {
        element.remaining_balance = parseFloat(element.remaining_balance)
        element.amount_to_pay = 0

        formData.value.area = element.area ?? formData.value.area
        formData.value.term_id = element.term_id ?? formData.value.term_id
        formData.value.address = element.address ?? formData.value.address
        formData.value.remarks = element.remarks ?? formData.value.remarks
        formData.value.salesman_id_1 = element.salesman_id_1 ?? formData.value.salesman_id_1
        formData.value.salesman_id_2 = element.salesman_id_2 ?? formData.value.salesman_id_2
        formData.value.vat_id = element.vat_id ?? formData.value.vat_id
        formData.value.promo_code = element.promo_code ?? formData.value.promo_code

        salesDrList.value.push(element)
      })

      toggleDrModal()
    }

    const removeDr = item => {
      const index = salesDrList.value.find(dr => dr.id === item.id)

      salesDrList.value.splice(index, 1)
    }

    const removePayment = (item, index) => {
      payments.value.splice(index, 1)
    }

    const submit = () => {
      payments.value.forEach((payment, index) => {
        if (payment.payment_type === 'Cash Payment') {
          payments.value[index].type = 'cash_payment'
        }

        if (payment.payment_type === 'Check Payment') {
          payments.value[index].type = 'check_payment'
        }

        if (payment.payment_type === 'Online Payment') {
          payments.value[index].type = 'online_payment'
        }
      })

      if (modeData.value === 'Create' && totalPaymentAmount.value > 0) {
        paymentWarning.value = true

        return
      }

      if (totalPaid.value > totalAmount.value) {
        totalPaidWarning.value = true
        return
      }
      paymentWarning.value = false
      totalPaidWarning.value = false

      if (modeData.value === 'Create') {
        const payload = formData.value
        payload.amount = totalAmount.value
        payload.date_posted = datePosted.value
        payload.payment_items = payments.value
        payload.dr_items = salesDrList.value

        store.dispatch('CollectionStore/create', payload).then(
          response => {
            if (response.status === undefined) {
              emit('submit', response.data)
            }
          },
        )
      } else {
        const payload = formData.value
        payload.amount = totalAmount.value
        payload.date_posted = datePosted.value
        payload.payment_items = payments.value
        payload.dr_items = salesDrList.value

        store.dispatch('CollectionStore/update', payload).then(
          response => {
            if (response.status === undefined) {
              emit('submit', response.data)
            }
          },
        )
      }

    }

    watch(payments, value => {
      totalPaymentAmount.value = totalAmount.value ?? 0

      value.forEach(payment => {
        totalPaymentAmount.value = parseFloat(totalPaymentAmount.value) - parseFloat(payment.amount)
      })
      return payments
    })

    const postOrder = () => {
      store.dispatch('CollectionStore/postOrder', formData.value.id).then(
        response => {
          if (response.status === undefined) {
            emit('submit', response.data)
          }
        },
      )
    }

    const unpostOrder = () => {
      store.dispatch('CollectionStore/unpostOrder', formData.value.id).then(
        response => {
          if (response.status === undefined) {
            emit('submit', response.data)
          }
        },
      )
    }

    const addedPayment = payment => {
      togglePaymentModal('Create')
      if (payment.mode != "Edit") {
        payments.value.push(payment)
      } else {
        payments.value[payment.index] = payment
      }
      paymentsReinitialize()
    }

    const totalPaymentCheck = amount => {
      totalAmount.value = amount

      totalPaymentAmount.value = amount
    }

    const onInit = promise => {
      promise
        .then(console.log)
        .catch(console.error)
    }

    const onDecode = id => {
      store.dispatch('SalesDrStore/get', id)
      console.log(id)
    }

    const scannerOptions = (detectedCodes, ctx) => {
      for (const detectedCode of detectedCodes) {
        const [firstPoint, ...otherPoints] = detectedCode.cornerPoints

        ctx.strokeStyle = 'red'

        ctx.beginPath()
        ctx.moveTo(firstPoint.x, firstPoint.y)
        for (const { x, y } of otherPoints) {
          ctx.lineTo(x, y)
        }
        ctx.lineTo(firstPoint.x, firstPoint.y)
        ctx.closePath()
        ctx.stroke()
      }
    }

    return {
      totalPaymentAmount,
      paymentWarning,
      totalPaidWarning,
      totalPaymentCheck,
      postOrder,
      unpostOrder,
      removePayment,
      addedPayment,
      totalAmount,
      togglePaymentModal,
      editPayment,
      calculateTotalPaid,
      paymentTypesMapping,
      payments,
      paymentModal,
      paymentData,
      paymentModeData,
      totalPaid,
      removeDr,
      salesDrList,
      drListModal,
      selectedDrs,
      toggleDrModal,
      submit,
      cancel,
      errors: computed(() => store.state.CollectionStore.errors),
      formData,
      icons: {
        mdiInformation,
        mdiAccountPlusOutline,
        mdiCardOff,
        mdiCurrencySign,
      },
      showCustomerModal,
      datePosted,
      customerModal,
      onSelectCustomer,
      salesmans: computed(() => store.state.SalesmanStore.salesmans),
      terms: computed(() => store.state.TermStore.terms),
      vats: computed(() => store.state.VatStore.vats),
      documents: computed(() => store.state.DocumentStore.documents.filter(documentItem => {
        documentItem.title = `${documentItem.document_name}`

        if (documentItem.module === 'Collection') {
          if (documentItem.document_name === 'Collections') {
            formData.value.document_id = documentItem.id
          }

          if (modeData.value === 'Create' && (documentItem.is_active === 1 || documentItem.is_active === "Active")) {
            return documentItem
          }

          if (modeData.value === 'Edit') {
            return documentItem
          }
        }
      })),
      types: ref([
        'Regular',
        'Distributor',
      ]),
      onInit,
      onDecode,
      scannerOptions,
      showScanner,
    }
  },
}
</script>

<style scoped>

</style>
