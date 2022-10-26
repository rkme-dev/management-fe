<template>
  <v-card>
    <v-card-title class="pa-6">
      Create Collection
    </v-card-title>
    <v-card-text>
      <v-progress-circular
          v-if="loading"
          :size="190"
          :width="7"
          color="primary"
          indeterminate
      ></v-progress-circular>
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
                v-model="formData.collection_order_number"
                outlined
                :error-messages="errors.collection_order_number"
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
                v-model="formData.customer.name"
                outlined
                readonly
                :error-messages="errors.customer_id"
                dense
                hide-details="auto"
                label="Customer"
            ></v-text-field>
          </v-col>
          <v-col
              cols="3"
              class="pr-8 pl-8"
          >
            <v-select
                v-model="formData.customer.type"
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
                disabled
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
                disabled
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
                disabled
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
                disabled
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
                disabled
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
                disabled
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
                disabled
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
                disabled
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
              v-if="formData.customer.id"
              cols="12"
          >
          <v-data-table
            :items="salesDrs"
            :headers="headers"
          >
            <template #item.created_at="{ item }">
              {{ dateFormat1(item.created_at) }}
            </template>
            <template #item.remaining_balance="{ item }">
              <v-currency-field
                  v-model="item.remaining_balance"
                  prefix="PHP"
                  class="text-green"
                  disabled
              >
              </v-currency-field>
            </template>
            <template #item.amount_to_pay="{ index, item }">
              <v-currency-field
                  v-if="item.remaining_balance != 0.00"
                  v-model="item.amount_to_pay"
                  clearable
                  :max="item.remaining_balance"
                  label="Enter Amount to Pay*"
                  prefix="PHP"
                  class="text-green"
                  @change="calculateAmountToPay"
              >
              </v-currency-field>
            </template>
          </v-data-table>
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
              v-if="formData.remaining_balance == 0.00"
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
                    There is 0 remaining balance.
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
              cols="12"
              v-if="formData.remaining_balance > 0"
          >
            <collection-payment
                :total-amount="totalAmountToPay"
                :payments="payments"
                @toggleModal="togglePaymentModal"
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
                :disabled="formData.remaining_balance == 0.00"
                color="primary"
                class="me-3 mt-4"
                @click="submit"
            >
              <v-icon>
                {{ icons.mdiContentSave }}
              </v-icon>
              Create
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
          v-model="paymentModal"
          hide-overlay
          width="1100px"
          height="700px"
          transition="dialog-bottom-transition"
      >
        <payment-form
            :total-amount="totalPaymentAmount"
            @submit=""
            @toggleModal="togglePaymentModal"
            @addedPayment="addedPayment"
        ></payment-form>
      </v-dialog>
    </v-card-text>
  </v-card>
</template>

<script>
import { dateFormat1 } from '@/utils/time'
import store from '@/store'
import {computed, onMounted} from '@vue/composition-api'
import {mdiInformation} from "@mdi/js";
import {ref, watch} from "@vue/composition-api/dist/vue-composition-api";
import SalesDrService from "@/service/SalesDrService";
import CollectionPayment from "@/views/pages/sales/collections/CollectionPayment";
import PaymentForm from "@/views/pages/sales/collections/PaymentForm";
import router from "@/router";

export default {
  name: 'CollectionByQR',
  components: {
    CollectionPayment,
    PaymentForm,
  },
  props: {

  },
  setup(props, context) {
    const payments = ref([])
    const totalAmountToPay = ref(0)
    const salesDrService = new SalesDrService()
    const datePosted = ref(new Date().toISOString().substr(0, 10))
    const drId = context.root.$route.params.id
    const formData = ref({
      customer: {
        name: '',
      },
      created_at: null,
      sales_dr_number: null,
      document: {
        name: '',
      },
      amount: 0,
      remaining_balance: 0,
    })
    const loading = computed(() => store.state.SalesDrStore.loading)
    const errors = computed(() => store.state.CollectionStore.errors)
    const salesDrs = ref([])
    const headers = [
      {
        text: 'Date',
        align: 'start',
        sortable: false,
        value: 'created_at',
      },
      { text: 'Sales DR No', value: 'sales_dr_number' },
      { text: 'Document', value: 'document_name' },
      { text: 'Remaining Balance', value: 'remaining_balance' },
      { text: 'Amount To Pay', value: 'amount_to_pay' },
    ]
    const paymentWarning = ref(false)
    const paymentModal = ref(false)
    const totalPaymentAmount = ref(0)

    const initialize = () => {
      salesDrService.get(drId).then(response => {
        formData.value = response.data

        salesDrs.value.push({
          id: formData.value.id,
          created_at: formData.value.created_at,
          sales_dr_number: formData.value.sales_dr_number,
          document_name: formData.value.document?.document_name,
          amount: formData.value.amount,
          remaining_balance: parseFloat(formData.value.remaining_balance),
          amount_to_pay: 0,
        })
      })
    }

    const calculateAmountToPay = () => {
      totalAmountToPay.value = salesDrs.value[0].amount_to_pay
      totalPaymentAmount.value = salesDrs.value[0].amount_to_pay
    }

    onMounted(async () => {
      await store.dispatch('TermStore/list')
      await store.dispatch('VatStore/list')
      await store.dispatch('SalesmanStore/list')
      await store.dispatch('DocumentStore/list')

      await initialize()
    })

    const togglePaymentModal = () => {
      paymentModal.value = !paymentModal.value
    }

    const removePayment = (item, index) => {
      payments.value.splice(index, 1)
    }

    const addedPayment = payment => {
      togglePaymentModal()
      payments.value.push(payment)
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

        totalPaymentAmount.value = parseFloat(totalPaymentAmount.value) - parseFloat(payment.amount)
      })

      if (totalPaymentAmount.value > 0) {
        paymentWarning.value = true

        return
      }

      paymentWarning.value = false

      const payload = formData.value
      payload.amount = totalAmountToPay.value
      payload.date_posted = datePosted.value
      payload.payment_items = payments.value
      payload.dr_items = salesDrs.value

      store.dispatch('CollectionStore/create', payload).then(
          response => {
            if (response.status === undefined) {
              router.replace('/collections')
            }
          },
      )
    }

    const cancel = () => {
      router.replace('/collections')
    }

    watch(payments, value => {
      totalPaymentAmount.value = totalAmountToPay.value ?? 0

      value.forEach(payment => {
        totalPaymentAmount.value = parseFloat(totalPaymentAmount.value) - parseFloat(payment.amount)
      })
    })

    return {
      cancel,
      submit,
      addedPayment,
      paymentModal,
      togglePaymentModal,
      removePayment,
      totalAmountToPay,
      payments,
      calculateAmountToPay,
      dateFormat1,
      paymentWarning,
      salesDrs,
      headers,
      datePosted,
      errors,
      loading,
      formData,
      icons: {
        mdiInformation,
      },
      totalPaymentAmount,
      salesmans: computed(() => store.state.SalesmanStore.salesmans),
      terms: computed(() => store.state.TermStore.terms),
      vats: computed(() => store.state.VatStore.vats),
      documents: computed(() => store.state.DocumentStore.documents.filter(documentItem => {
        if (documentItem.module === 'Collection') {
          documentItem.title = `${documentItem.document_name}`

          return documentItem
        }
      })),
      types: ref([
        'Regular',
        'Distributor',
      ]),
    }
  }
}
</script>

<style scoped>

</style>
