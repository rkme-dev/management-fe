<template>
  <v-row class="pa-2">
    <v-col cols="12">
      <v-alert
        color="success"
        text
        style="margin-bottom: -30px"
      >
        <div class="d-flex align-start">
          <v-icon color="warning">
            {{ icons.mdiInformation }}
          </v-icon>
          <div class="ms-3">
            <p class="text-crimson">
              DR List
            </p>
          </div>
        </div>
      </v-alert>
    </v-col>
    <v-col
      cols="12"
    >
      <v-data-table
        :headers="headers"
        :items="drList"
        :loading="loading"
        :items-per-page="5"
      >
        <template #item.amount="{ item }">
          <v-currency-field
            v-model="item.amount"
            prefix="PHP"
            class="text-crimson"
            disabled
          >
          </v-currency-field>
        </template>
      </v-data-table>
    </v-col>
  </v-row>
</template>

<script>
import {
  computed,
  toRef,
} from '@vue/composition-api'
import store from '@/store'
import { mdiInformation } from '@mdi/js'

export default {
  name: 'DrListTableForm',
  props: {
    customerId: {
      type: Number,
      required: true,
      default: null,
    },
  },
  setup(props, { emit }) {
    store.dispatch('SalesDrStore/list')
    const loading = computed(() => store.state.SalesDrStore.loading)
    const customerIdData = toRef(props, 'customerId')
    const drList = computed(() => store.state.SalesDrStore.list.filter(dr => dr.customer_id === customerIdData.value))

    const cancel = () => {
      emit('submit')
    }

    return {
      cancel,
      drList,
      headers: [
        {
          text: 'DR Code',
          sortable: true,
          value: 'sales_dr_number',
        },
        {
          text: 'Status',
          value: 'status',
          sortable: true,
        },
        {
          text: 'Amount',
          value: 'amount',
          sortable: true,
        },
        {
          text: 'Date Posted',
          value: 'date_posted',
          sortable: true,
        },
      ],
      icons: {
        mdiInformation,
      },
      loading,
    }
  },
}
</script>

<style scoped>

</style>
