<template>
  <div>
    <v-card>
      <v-card-title>Subsidiary Ledger Report</v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="6">
            <v-select
              v-model="customer"
              :loading="customerLoading"
              :items="customers"
              item-text="name"
              item-value="id"
              dense
              outlined
              label="Select Customer"
              clearable
              @change="generateSubsidiaryReport"
            ></v-select>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-card
      v-if="reportLoading"
      class="mt-8"
    >
      <v-card-text>
        <div class="text-center">
          <v-progress-circular
            :size="190"
            :width="7"
            color="primary"
            indeterminate
          ></v-progress-circular>
        </div>
      </v-card-text>
    </v-card>

    <v-card
      v-if="subsidiaryLedger.length > 0 && reportLoading === false"
      class="mt-8"
    >
      <v-card-text>
        <div class="text-center">
          <v-data-table
            class="elevation-4"
            :items="subsidiaryLedger"
            :headers="headers"
          >
            <template #item.total_amount="{ item }">
              <v-currency-field
                v-model="item.total_amount"
                disabled
                dense
              >
              </v-currency-field>
            </template>
            <template #item.currency="{ item }">
              PHP
            </template>
          </v-data-table>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { computed, ref, onMounted, onUnmounted} from '@vue/composition-api'
import store from '@/store'

export default {
  name: 'SubsidiaryLedger',
  setup() {
    const customers = computed(() => store.state.CustomerStore.list)
    const customer = ref()
    const customerLoading = computed(() => store.state.CustomerStore.loading)
    const reportLoading = computed(() => store.state.ReportStore.loading)
    const subsidiaryLedger = computed(() => store.state.ReportStore.ledgerReport)
    const headers = [
      {
        text: 'Date',
        align: 'start',
        sortable: false,
        value: 'date_posted',
      },
      { text: 'Order Number', value: 'order_number' },
      { text: 'Source', value: 'source' },
      { text: 'Document', value: 'document' },
      { text: 'Currency', value: 'currency' },
      { text: 'Amount', value: 'amount' },
    ]

    onMounted(async () => {
      await store.dispatch('CustomerStore/list')
      await store.dispatch('ReportStore/clearReport', 'ledgerReport')
    })

    onUnmounted(async () => {
      await store.dispatch('ReportStore/clearReport', 'ledgerReport')
    })

    const generateSubsidiaryReport = () => {
      if (customer.value) {
        store.dispatch('ReportStore/getLedgerReport', customer.value)

        return
      }

      store.dispatch('ReportStore/clearReport', 'ledgerReport')
    }

    return {
      customer,
      customerLoading,
      customers,
      headers,
      generateSubsidiaryReport,
      reportLoading,
      subsidiaryLedger,
    }
  },
}
</script>

<style scoped>

</style>
