<template>
  <div class="pa-6">
    <v-data-table
      :headers="headers"
      :items="paymentData"
      sort-by="name"
      class="elevation-1"
    >
      <template #item.created_at="{ item }">
        {{ dateFormat1(item.created_at) }}
      </template>
      <template #item.amount="{ item }">
        <v-currency-field
          v-model="item.amount"
          prefix="PHP"
          class="text-green"
          disabled
        >
        </v-currency-field>
      </template>
      <template v-slot:item.actions="{ item, index}">
        <v-icon
          v-if="collectionStatus != 'Posted'"
          small
          class="mr-2"
          @click="editPayment(item, index)"
        >
          {{ icons.mdiNotebookEdit }}
        </v-icon>
        <v-icon
          small
          @click="removePayment(item, index)"
        >
          {{ icons.mdiDeleteCircle }}
        </v-icon>
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
            style="color: lawngreen;"
          >
            Total Payment Amount:
          </v-col>
          <v-col
            cols="2"
            class="ml-n16"
          >
            <v-currency-field
              v-model="totalPaid"
              class="text-green"
              disabled
            >
            </v-currency-field>
          </v-col>
          <v-col
            cols="4"
            class=""
          >
            <v-btn
              v-if="totalAmount>0"
              color="success"
              class=""
              @click="toggleModal"
            >
              <v-icon>
                {{ icons.mdiContentSave }}
              </v-icon>
              Add Payment
            </v-btn>
          </v-col>
        </v-row>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { mdiAccountEdit, mdiDeleteCircle, mdiNotebookEdit } from '@mdi/js'
import { dateFormat1 } from '@/utils/time'

export default {
  name: 'CollectionPayment',
  components: {
  },
  props: {
    totalAmount: {
      type: Number,
      required: false,
      default: (() => 0),
    },
    collectionStatus: {
      type: String,
      required: false,
      default: (() => 'For Review'),
    },
    totalPaid: {
      type: Number,
      required: false,
      default: (() => 0),
    },
    payments: {
      type: Array,
      required: true,
      default: (() => []),
    },
  },
  data() {
    return {
      totalPaidAmount: 0,
      salesDrs: [],
      icons: {},
    }
  },
  computed: {
    headers() {
      return [
        {
          text: 'Date',
          align: 'start',
          sortable: false,
          value: 'payment_date',
        },
        { text: 'Payment Type', value: 'payment_type' },
        { text: 'Bank of Check', value: 'bank' },
        { text: 'Check Number', value: 'check_number' },
        { text: 'Reference #', value: 'reference_number' },
        { text: 'Amount', value: 'amount' },
        { text: 'Actions', value: 'actions', sortable: false },
      ]
    },
    paymentData() {
      const response = []
      this.payments.forEach(data => {
        const passedData = data
        passedData.payment_date = data.payment_date
        passedData.payment_type = data.payment_type
        passedData.amount = data.amount
        if (data.payment_type === 'Check Payment') {
          passedData.bank = (data.id > 0 && data.payment.bank && (data.payment.bank != data.bank))
            ? data.payment.bank
            : data.bank
          passedData.check_number = (data.id > 0 && data.payment.check_number && (data.payment.check_number != data.check_number))
            ? data.payment.check_number
            : data.check_number
          passedData.reference_number = passedData.check_number
          console.log(passedData.reference_number)
        } else {
          passedData.reference_number = (data.payment && data.payment.reference_number && (data.payment.reference_number != data.reference_number))
            ? data.payment.reference_number
            : data.reference_number
        }

        response.push(passedData)
      })

      return response
    },
  },

  updated() {
    this.initialize()
  },
  mounted() {
    this.initialize()
    this.icons = {
      mdiAccountEdit,
      mdiNotebookEdit,
      mdiDeleteCircle,
    }
  },
  methods: {
    initialize() {
      this.paymentData
      this.totalPaidAmount = this.totalPaid
    },
    removePayment(item, index) {
      this.$emit('removePayment', item, index)
    },

    editPayment(item, index) {
      if (item.payment_type === 'Cash Payment') {
        item.type = 'cash_payment'
      }

      if (item.payment_type === 'Check Payment') {
        item.type = 'check_payment'
      }

      if (item.payment_type === 'Online Payment') {
        item.type = 'online_payment'
      }
      this.$emit('editPayment', item, index)
    },

    toggleModal() {
      this.$emit('toggleModal', 'Create')
    },
  },
}
</script>
<style>
.text-green input {
  color: #009900 !important;
}

</style>
