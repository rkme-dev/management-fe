<template>
  <div class="pa-6">
    <v-data-table
      :headers="headers"
      :items="items"
      sort-by="name"
      class="elevation-1"
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
          v-model="item.amount_to_pay"
          clearable
          :disabled="collectionStatus === 'Posted'"
          :max="item.remaining_balance"
          :error-messages="errors.amount_to_pay[index]"
          label="Enter Amount to Pay*"
          prefix="PHP"
          class="text-green"
          @change="calculateAmountToPay"
        >
        </v-currency-field>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon
          small
          @click="removeDr(item)"
        >
          {{ icons.mdiDeleteCircle }}
        </v-icon>
      </template>
      <template #footer>
        <v-row class="mb-2 mt-2">
          <v-col
            cols="6"
            class="mt-6"
          >
            <p
              class="font-italic"
              style="color: red"
            >
              *Once a row is selected enter amount to proceed
            </p>
          </v-col>
          <v-col
            cols="2"
            class="mt-6"
            style="color: red;"
          >
            Total Amount To Pay:
          </v-col>
          <v-col
            cols="3"
            class="ml-n8"
          >
            <v-currency-field
              v-model="totalPayment"
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
              color="info"
              class=""
              @click="toggleModal"
            >
              <v-icon>
                {{ icons.mdiContentSave }}
              </v-icon>
              GET SALES DR
            </v-btn>
          </v-col>
        </v-row>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { mdiAccountEdit, mdiDeleteCircle } from '@mdi/js'
import {
  ref, toRef, watch,
} from '@vue/composition-api'
import { dateFormat1 } from '@/utils/time'

export default {
  name: 'SalesDrTable',
  components: {
  },
  props: {
    data: {
      type: Array,
      required: true,
      default: null,
    },
    status: {
      type: String,
      required: false,
      default: null,
    },
  },
  setup(props, { emit }) {
    const collectionStatus = toRef(props, 'status')
    const showModal = ref(false)
    const items = toRef(props, 'data')
    const headers = ref([
      {
        text: 'Date',
        align: 'start',
        sortable: false,
        value: 'created_at',
      },
      { text: 'DR No', value: 'sales_dr_number' },

      // { text: 'Remaining Balance', value: 'remaining_balance' },
      { text: 'To Pay', value: 'amount_to_pay' },
      { text: 'Actions', value: 'actions', sortable: false },
    ])

    const salesDrs = ref([])
    const totalPayment = ref(0)
    const errors = ref({
      amount_to_pay: [],
    })

    const removeDr = item => {
      emit('removeDr', item)
    }

    const toggleModal = () => {
      emit('showModal')
    }

    const calculateAmountToPay = () => {
      totalPayment.value = 0
      errors.value.amount_to_pay = []

      if (items.value.length === 0) {
        return
      }

      items.value.forEach((item, index) => {
        if (item.amount_to_pay === 0) {
          errors.value.amount_to_pay[index] = 'This field is required.'
        }

        totalPayment.value += parseFloat(item.amount_to_pay)
      })

      emit('totalPayment', totalPayment.value)
    }

    calculateAmountToPay()

    watch(items, () => {
      calculateAmountToPay()
    })

    return {
      collectionStatus,
      errors,
      totalPayment,
      calculateAmountToPay,
      removeDr,
      items,
      toggleModal,
      dateFormat1,
      mdiAccountEdit,
      mdiDeleteCircle,
      headers,
      salesDrs,
      showModal,
      icons: {
        mdiAccountEdit,
        mdiDeleteCircle,
      },
    }
  },
}
</script>
<style>
.text-green input {
  color: #009900 !important;
}

</style>
