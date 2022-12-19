<template>
  <div>
    <v-card>
      <v-card-title>Accounts Receivable Aging</v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="6">
            <v-select
              v-model="customer"
              :loading="customerLoading"
              :items="customers"
              :disabled="cId"
              item-text="name"
              item-value="id"
              dense
              outlined
              label="All Customers"
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
      v-if="agingReport.length > 0 && reportLoading === false"
      class="mt-8"
    >
      <v-row class="text-center">
        <v-col
          class=""
          cols="12"
        >
          <v-data-table
            class="elevation-4"
            :items="agingReport"
            :headers="headers"
          >
            <template v-slot:top>
              <v-toolbar
                color="teal"
                outlined
              >
                <v-row>
                  <v-col cols="5">
                    <v-currency-field
                      v-model="agingTotal"
                      outlined
                      class="text-green"
                      disabled
                      dense
                      hide-details="auto"
                      label="Total Amount"
                    ></v-currency-field>
                  </v-col>
                </v-row>
                <v-btn
                  color="primary"
                  dark
                  class="mb-2"
                  @click="redirectPrint()"
                >
                  Generate Report
                </v-btn>
              </v-toolbar>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-card>

    <v-card
      v-if="agingItemsReport.length > 0 && reportLoading === false"
      class="mt-8"
    >
      <v-row class="text-center">
        <v-col
          class=""
          cols="12"
        >
          <v-data-table
            class="elevation-4"
            :items="agingItemsReport"
            :headers="agingItemsHeaders"
          >
            <template v-slot:top>
              <v-toolbar
                color="teal"
                outlined
              >
                <v-row>
                  <v-col cols="5">
                    <v-currency-field
                      v-model="agingItemTotal"
                      outlined
                      class="text-green"
                      disabled
                      dense
                      hide-details="auto"
                      label="Total Amount"
                    ></v-currency-field>
                  </v-col>
                </v-row>
                <v-btn
                  color="primary"
                  dark
                  class="mb-2"
                  @click="redirectPrint(customer)"
                >
                  Generate Report
                </v-btn>
              </v-toolbar>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
import {
  computed, ref, onMounted, onUnmounted,
} from '@vue/composition-api'
import router from '@/router'
import store from '@/store'

export default {

  setup() {
    const customers = computed(() => store.state.CustomerStore.list)
    const customer = ref()
    const cId = ref(false)
    const customerLoading = computed(() => store.state.CustomerStore.loading)
    const reportLoading = computed(() => store.state.ReportStore.loading)
    const agingReport = computed(() => store.state.ReportStore.agingReport)
    const agingItemsReport = computed(() => store.state.ReportStore.agingItemsReport)

    const agingTotal = computed(() => store.state.ReportStore.agingReport.reduce((a, b) => a + b.total, 0))
    const agingItemTotal = computed(() => store.state.ReportStore.agingItemsReport.reduce((a, b) => a + b.remaining_balance_num, 0))

    const headers = [
      {
        text: 'Code', align: 'start', sortable: true, value: 'code',
      },
      { text: 'Name', value: 'name' },
      { text: 'Type', value: 'type', align: 'left' },
      { text: 'Current', value: 'current', align: 'left' },
      { text: '1-30', value: 'one_thirty_total', align: 'left' },
      { text: '31-60', value: 'thirtyone_sixty_total', align: 'left' },
      { text: '61-90', value: 'sixtyone_ninety_total', align: 'left' },
      { text: '91-120', value: 'ninetyone_htwenty_total', align: 'left' },
      { text: '121-150', value: 'htwentyone_hfifty_total', align: 'left' },
      { text: '151-180', value: 'hfiftyone_heighty_total', align: 'left' },
      { text: 'Above 180', value: 'heightyone_above_total', align: 'left' },
      { text: 'Total', value: 'total_curr', align: 'left' },
    ]

    const agingItemsHeaders = [
      { text: 'Date', sortable: true, value: 'date_posted' },
      { text: 'DR No', value: 'sales_dr_number', sortable: true },
      { text: 'Terms', value: 'term.code', sortable: true },
      { text: 'Current', value: 'current', sortable: true },
      { text: '1-30', value: 'one_thirty', sortable: true },
      { text: '31-60', value: 'thirtyone_sixty', sortable: true },
      { text: '61-90', value: 'sixtyone_ninety', sortable: true },
      { text: '91-120', value: 'ninetyone_htwenty', sortable: true },
      { text: '121-150', value: 'htwentyone_hfifty', sortable: true },
      { text: '151-180', value: 'hfiftyone_heighty', sortable: true },
      { text: '180-above', value: 'heightyone_above', sortable: true },
    ]

    onMounted(async () => {
      if (typeof router.history.current.params.cId === 'undefined') {
        await store.dispatch('CustomerStore/list')
        await store.dispatch('ReportStore/getAgingReport')
      } else {
        await store.dispatch('CustomerStore/list')
        await store.dispatch('ReportStore/clearReport', 'agingReport')
        customer.value = parseInt(router.history.current.params.cId)
        cId.value = true
        await store.dispatch('ReportStore/getAgingItemsReport', customer.value)
      }
    })

    onUnmounted(async () => {
      await store.dispatch('ReportStore/clearReport', 'agingReport')
      await store.dispatch('ReportStore/clearReport', 'agingItemsReport')
    })

    const generateSubsidiaryReport = () => {
      if (customer.value) {
        store.dispatch('ReportStore/clearReport', 'agingReport')
        store.dispatch('ReportStore/getAgingItemsReport', customer.value)

        return
      }

      store.dispatch('ReportStore/getAgingReport')
      store.dispatch('ReportStore/clearReport', 'agingItemsReport')
    }

    const redirectPrint = customer => {
      if (customer) {
        window.open(
          `http://165.22.106.91/print-customer-aging/${customer}`,
          '_blank',
        )
      } else {
        window.open(
          'http://165.22.106.91/print-customer-aging',
          '_blank',
        )
      }
    }

    return {
      agingTotal,
      agingItemTotal,
      customer,
      customers,
      customerLoading,
      reportLoading,
      agingReport,
      agingItemsReport,
      generateSubsidiaryReport,
      headers,
      agingItemsHeaders,
      redirectPrint,
      cId,
    }
  },
}
</script>
