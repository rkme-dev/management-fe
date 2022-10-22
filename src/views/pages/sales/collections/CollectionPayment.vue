<template>
  <div class="pa-6">
    <v-data-table
      :headers="headers"
      :items="paymentsData"
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
          small
          @click="removePayment(item, index)"
        >
          {{ icons.mdiDeleteCircle }}
        </v-icon>
      </template>
      <template v-slot:footer>
        <v-row>
          <v-col cols="8"></v-col>
          <v-col
            cols="2"
            class="ml-auto mt-4 mb-4"
          >
            <v-btn
              v-if="totalAmount > 0"
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
import { mdiAccountEdit, mdiDeleteCircle } from '@mdi/js'
import {
  ref, toRef,
} from '@vue/composition-api'
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
    payments: {
      type: Array,
      required: true,
      default: (() => []),
    },
  },
  setup(props, { emit }) {
    const paymentsData = toRef(props, 'payments')
    const headers = ref([
      {
        text: 'Date',
        align: 'start',
        sortable: false,
        value: 'payment_date',
      },
      { text: 'Payment Type', value: 'payment_type' },
      { text: 'Reference #', value: 'reference_number' },
      { text: 'Amount', value: 'amount' },
      { text: 'Actions', value: 'actions', sortable: false },
    ])

    const salesDrs = ref([])

    const removePayment = (item, index) => {
      emit('removePayment', item, index)
    }

    const toggleModal = () => {
      emit('toggleModal')
    }

    return {
      removePayment,
      paymentsData,
      toggleModal,
      dateFormat1,
      mdiAccountEdit,
      mdiDeleteCircle,
      headers,
      salesDrs,
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
  color: chartreuse !important;
}

</style>
