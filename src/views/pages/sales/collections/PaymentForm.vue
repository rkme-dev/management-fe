<template>
  <v-card class="pa-2">
    <v-card-text>
      <v-row v-if="totalAmountToPay <= 0 && mode != 'Edit'">
        <v-col
          cols="12"
        >
          <v-alert
            color="primary"
            text
            style="margin-bottom: -10px"
          >
            <div class="d-flex align-start">
              <v-icon color="primary">
                {{ icons.mdiCurrencySign }}
              </v-icon>
              <div class="ms-3">
                <p class="text-base font-weight-medium mb-1">
                  Total Amount to Pay was already covered.
                </p>
              </div>
            </div>
          </v-alert>
        </v-col>
      </v-row>
      <v-row v-if="mode == 'Edit' || totalAmountToPay > 0">
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
                  {{ mode != 'Edit' ? 'Add': 'Update'}} Payment
                </p>
              </div>
            </div>
          </v-alert>
        </v-col>
      </v-row>
      <v-row class="mt-2" v-if="mode == 'Edit' || totalAmountToPay > 0">
        <v-col
          cols="3"
        >
          <label for="firstnameHorizontalIcons">Payment Type</label>
        </v-col>
        <v-col
          cols="4"
          class="mr-16"
        >
          <v-select
            v-model="formData.type"
            :items="types"
            item-text="title"
            item-value="value"
            label="Payment Type"
            outlined
            dense
            clearable
            hide-details="auto"
            @change="onChangeOfPaymentType"
          ></v-select>
        </v-col>
      </v-row>
      <v-row v-if="formData.type">
        <v-col
          cols="3"
        >
          <label for="firstnameHorizontalIcons">Account</label>
        </v-col>
        <v-col
          cols="4"
          class="mr-16"
        >
          <v-select
            v-model="formData.account_id"
            :items="accounts"
            item-text="account_title"
            item-value="id"
            label="Account"
            outlined
            :error-messages="errors.account_id"
            dense
            clearable
            hide-details="auto"
          ></v-select>
        </v-col>
      </v-row>
      <v-row v-if="formData.type === 'cash_payment'">
        <v-col
          cols="3"
        >
          <label for="firstnameHorizontalIcons">Date</label>
        </v-col>
        <v-col
          cols="4"
          class="pr-8 pl-8 ml-n4"
        >
          <v-menu
            v-model="formData.paymentDate"
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
              @input="formData.paymentDate = false"
            ></v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="3"></v-col>
        <v-col
          cols="3"
          class="mt-n4"
        >
          <label for="firstnameHorizontalIcons">Amount </label>
        </v-col>
        <v-col cols="3">
          <v-currency-field
            v-if="mode != 'Edit'"
            v-model="formData.amount"
            :max="totalAmountToPay"
            prefix="PHP"
            :error-messages="errors.amount"
            class="text-green mt-n8"
          >
          </v-currency-field>

          <v-currency-field
            v-else
            v-model="formData.amount"
            prefix="PHP"
            class="text-green mt-n8"
          >
          </v-currency-field>
        </v-col>
        <v-col cols="3">
          <v-btn
            class="mt-n8"
            small
            color="success"
            @click.prevent="copyTotalAmount"
          >
            Copy Total Amount
          </v-btn>
        </v-col>
        <v-col cols="3">
          <v-currency-field
            v-model="totalAmountToPay"
            prefix="PHP"
            disabled=""
            class="text-green ml-n12  mt-n8"
          >
          </v-currency-field>
        </v-col>
      </v-row>
      <v-row v-if="formData.type === 'online_payment'">
        <v-col
          cols="3"
        >
          <label for="firstnameHorizontalIcons">Date</label>
        </v-col>
        <v-col
          cols="4"
          class="pr-8 pl-8 ml-n4"
        >
          <v-menu
            v-model="formData.paymentDate"
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
              @input="formData.paymentDate = false"
            ></v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="3"></v-col>
        <v-col
          cols="3"
          class="mt-n4"
        >
          <label for="firstnameHorizontalIcons">Mode of Transfer</label>
        </v-col>
        <v-col cols="4">
          <v-text-field
            v-model="formData.mode_of_transfer"
            :error-messages="errors.mode_of_transfer"
            class="mt-n8"
          >
          </v-text-field>
        </v-col>
        <v-col cols="4"></v-col>
        <v-col
          cols="3"
          class="mt-n4"
        >
          <label for="firstnameHorizontalIcons">Transaction Number</label>
        </v-col>
        <v-col cols="4">
          <v-text-field
            v-model="formData.transaction_number"
            :error-messages="errors.transaction_number"
            class="mt-n8"
          >
          </v-text-field>
        </v-col>
        <v-col cols="4"></v-col>
        <v-col
          cols="3"
          class="mt-n4"
        >
          <label for="firstnameHorizontalIcons">Amount </label>
        </v-col>
        <v-col cols="4">
          <v-currency-field
            v-model="formData.amount"
            :max="totalAmountToPay"
            :error-messages="errors.amount"
            prefix="PHP"
            class="text-green mt-n8"
          >
          </v-currency-field>
        </v-col>
        <v-col cols="2">
          <v-btn
            class="mt-n8"
            small
            color="success"
            @click.prevent="copyTotalAmount"
          >
            <v-icon>
              {{ icons.mdiDatabaseArrowLeft }}
            </v-icon>
          </v-btn>
        </v-col>
        <v-col cols="3">
          <v-currency-field
            v-model="totalAmountToPay"
            prefix="PHP"
            disabled=""
            class="text-green ml-n12  mt-n8"
          >
          </v-currency-field>
        </v-col>
      </v-row>
      <v-row v-if="formData.type === 'check_payment'">
        <v-col
          cols="3"
          class="mt-4"
        >
          <label for="firstnameHorizontalIcons">Check Date</label>
        </v-col>
        <v-col
          cols="4"
          class="pr-8 pl-8"
        >
          <v-menu
            v-model="formData.paymentDate"
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
              @input="formData.paymentDate = false"
            ></v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="3"></v-col>
        <v-col
          cols="3"
          class="mt-n4"
        >
          <label for="firstnameHorizontalIcons">Bank Check</label>
        </v-col>
        <v-col cols="4">
          <v-text-field
            v-model="formData.bank"
            class="mt-n8"
            :error-messages="errors.bank"
          >
          </v-text-field>
        </v-col>
        <v-col cols="4"></v-col>
        <v-col
          cols="3"
          class="mt-n4"
        >
          <label for="firstnameHorizontalIcons">Bank Account Number</label>
        </v-col>
        <v-col cols="4">
          <v-text-field
            v-model="formData.bank_account_number"
            class="mt-n8"
            :error-messages="errors.bank_account_number"
          >
          </v-text-field>
        </v-col>
        <v-col cols="4"></v-col>
        <v-col
          cols="3"
          class="mt-n4"
        >
          <label for="firstnameHorizontalIcons">Check Type</label>
        </v-col>
        <v-col
          cols="4"
          class="mt-n4"
        >
          <v-select
            v-model="formData.check_type"
            :items="checkTypes"
            :error-messages="errors.check_type"
            label="Check Type"
            outlined
            dense
            clearable
            hide-details="auto"
          ></v-select>
        </v-col>
        <v-col cols="4"></v-col>
        <v-col
          cols="3"
          class="mt-4"
        >
          <label for="firstnameHorizontalIcons">Check Number</label>
        </v-col>
        <v-col cols="4">
          <v-text-field
            v-model="formData.check_number"
            label="Check Number"
            :error-messages="errors.check_number"
            dense
            hide-details="auto"
            class="mt-4"
          >
          </v-text-field>
        </v-col>
        <v-col cols="4"></v-col>
        <v-col
          cols="3"
          class="mt-2"
        >
          <label for="firstnameHorizontalIcons">Amount </label>
        </v-col>
        <v-col
          cols="4"
          class="mt-6"
        >
          <v-currency-field
            v-model="formData.amount"
            :max="totalAmountToPay"
            :error-messages="errors.amount"
            prefix="PHP"
            class="text-green mt-n8"
          >
          </v-currency-field>
        </v-col>
        <v-col cols="2">
          <v-btn
            class="mt-2"
            small
            color="success"
            @click.prevent="copyTotalAmount"
          >
            <v-icon>
              {{ icons.mdiDatabaseArrowLeft }}
            </v-icon>
          </v-btn>
        </v-col>
        <v-col cols="3">
          <v-currency-field
            v-model="totalAmountToPay"
            prefix="PHP"
            disabled=""
            class="text-green ml-n12  mt-n2"
          >
          </v-currency-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          offset-md="5"
          cols="12"
          class="mt-6"
        >
          <v-btn
            v-if="mode == 'Edit' || totalAmountToPay > 0"
            color="primary"
            @click="submit"
          >
            Submit
          </v-btn>
          <v-btn
            type="reset"
            outlined
            color="error"
            class="mx-2"
            @click.prevent="cancel"
          >
            Cancel
          </v-btn>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import { computed, ref, toRef, watch, onMounted } from '@vue/composition-api'
import { mdiCurrencySign, mdiDatabaseArrowLeft } from '@mdi/js'
import store from '@/store'
import data from '@/views/dashboard/datatable-data'

export default {
  name: 'PaymentForm',
  props: {
    data: {
      type: Object,
      required: false,
      default: null,
    },
    mode: {
      type: String,
      required: true,
      default: (() => 'Create'),
    },
    totalAmount: {
      type: Number,
      required: false,
      default: (() => 0),
    },
  },
  setup(props, { emit }) {
    store.dispatch('AccountStore/list')
    const CASH_PAYMENT = 'cash_payment'
    const ONLINE_PAYMENT = 'online_payment'
    const CHECK_PAYMENT = 'check_payment'

    const totalAmountToPay = toRef(props, 'totalAmount')
    const modeData = toRef(props, 'mode')
    const dataProp = toRef(props, 'data')
    const types = [
      { value: CASH_PAYMENT, title: 'Cash Payment' },
      { value: ONLINE_PAYMENT, title: 'Online Payment' },
      { value: CHECK_PAYMENT, title: 'Check Payment' },
    ]
    const datePosted = ref(new Date().toISOString().substr(0, 10))
    const formData = ref({
      amount: 0,
      type: null,
    })

    const errors = ref({
      account_id: null,
      amount: null,
    })

    const copyTotalAmount = () => {
      formData.value.amount = totalAmountToPay.value
    }

    const checkTypes = [
      'Local',
      'Regional',
    ]

    const paymentTypesMapping = {
      cash_payment: 'Cash Payment',
      check_payment: 'Check Payment',
      online_payment: 'Online Payment',
    }

    const accounts = computed(() => store.state.AccountStore.accounts.filter(account => account.type === 'Bank'))

    const toggleFormValues = () => {
      if (modeData.value === 'Edit') {
        formData.value = dataProp.value
        formData.value.type = formData.value.type ? formData.value.type : formData.value.payment.payment_type
        formData.value.payment_type = paymentTypesMapping[formData.value.type]

        if (formData.value.type === CASH_PAYMENT || formData.value.type === ONLINE_PAYMENT) {
          formData.value.bank = '';
          formData.value.bank_account_number = '';
          formData.value.check_number = '';
          formData.value.check_type = '';
          formData.value.reference_number = '';
        }

        if (formData.value.type === ONLINE_PAYMENT) {
          formData.value.reference_number = dataProp.value.reference_number;

        }
      } else {
        formData.value = {
          amount: 0,
          type: null,
        }
      }
    }
    const hasError = ref(0)
    watch(modeData, () => {
      toggleFormValues()
    })
    onMounted(() => {
      toggleFormValues();
    });

    const submit = () => {
      const payment = {
        type: formData.value.type,
        account_id: formData.value.account_id,
        payment_type: paymentTypesMapping[formData.value.type],
        amount: formData.value.amount,
        payment_date: datePosted.value,
        mode_of_transfer: formData.value.mode_of_transfer,
        reference_number: formData.value.transaction_number ?? formData.value.check_number,
        transaction_number: formData.value.transaction_number,
        check_number: formData.value.check_number,
        bank: formData.value.bank,
        bank_account_number: formData.value.bank_account_number,
        check_type: formData.value.check_type,
        index: formData.value.index,
        mode: formData.value.mode,
      }

      if (payment.type === 'online_payment') {
        if (!formData.value.mode_of_transfer) {
          hasError.value += 1
          errors.value.mode_of_transfer = 'This field is required.'
        } else {
          hasError.value -= 1
          errors.value.mode_of_transfer = null
        }

        if (!formData.value.transaction_number) {
          hasError.value += 1
          errors.value.transaction_number = 'This field is required.'
        } else {
          hasError.value -= 1
          errors.value.transaction_number = null
        }
      }

      if (payment.type === 'check_payment') {
        if (!formData.value.check_number) {
          hasError.value += 1
          errors.value.check_number = 'This field is required.'
        } else {
          hasError.value -= 1
          errors.value.check_number = null
        }
        if (!formData.value.bank) {
          hasError.value += 1
          errors.value.bank = 'This field is required.'
        } else {
          hasError.value -= 1
          errors.value.bank = null
        }
        if (!formData.value.bank_account_number) {
          hasError.value += 1
          errors.value.bank_account_number = 'This field is required.'
        } else {
          hasError.value -= 1
          errors.value.bank_account_number = null
        }
        if (!formData.value.check_type) {
          hasError.value += 1
          errors.value.check_type = 'This field is required.'
        } else {
          hasError.value -= 1
          errors.value.check_type = null
        }
      }

      if (!payment.account_id) {
        hasError.value += 1
        errors.value.account_id = 'This field is required.'
      } else {
        hasError.value -= 1
        errors.value.account_id = null
      }

      if (!payment.amount || payment.amount === 0) {
        hasError.value += 1
        errors.value.amount = 'This field is required.'
      } else {
        hasError.value -= 1
        errors.value.amount = null
      }

      if (payment.account_id && hasError.value <= 0) {
        emit('addedPayment', payment)

        toggleFormValues()
      }
    }

    const onChangeOfPaymentType = () => {
      errors.value = {
        account_id: null,
      }
    }

    const cancel = () => {
      emit('toggleModal', 'Create')
    }

    return {
      onChangeOfPaymentType,
      errors,
      checkTypes,
      submit,
      cancel,
      accounts,
      copyTotalAmount,
      datePosted,
      formData,
      types,
      totalAmountToPay,
      dataProp,
      toggleFormValues,
      icons: {
        mdiCurrencySign,
        mdiDatabaseArrowLeft,
      },
    }
  },
}
</script>

<style scoped>

</style>
