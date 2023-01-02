<template>
  <div>
    <v-card>
      <v-card-title>Stockcard Report</v-card-title>
      <v-card-text>
        <v-row>
          <v-col
            cols="4"
            class="mr-10"
          >
            <v-select
              v-model="product"
              :loading="productLoading"
              :items="products"
              item-text="name"
              item-value="id"
              dense
              outlined
              label="Select Product"
              clearable
              @change="generateUnits"
            ></v-select>
          </v-col>
          <v-col
            v-if="product"
            cols="3"
            class="mt-n4"
          >
            <v-switch
              v-model="showDateFilter"
              label="Show Date Filter"
            ></v-switch>
          </v-col>
          <v-col
            v-if="product"
            cols="3"
            class="mt-n4"
          >
            <v-switch
              v-model="showUnitFilter"
              label="Show Unit"
            ></v-switch>
          </v-col>
          <v-col
            v-if="showDateFilter"
            cols="4"
            class=""
          >
            <v-menu
              v-model="fromDateModal"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="fromDate"
                  label="From Date"
                  persistent-hint
                  :append-icon="icons.mdiCalendar"
                  readonly
                  outlined
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>

              <v-date-picker
                v-model="fromDate"
                no-title
                color="primary"
                @input="fromDateModal = false"
              ></v-date-picker>
            </v-menu>
          </v-col>
          <v-col
            v-if="showDateFilter"
            cols="4"
            class=""
          >
            <v-menu
              v-model="toDateModal"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="toDate"
                  label="From Date"
                  persistent-hint
                  :append-icon="icons.mdiCalendar"
                  readonly
                  outlined
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>

              <v-date-picker
                v-model="toDate"
                no-title
                color="primary"
                @input="toDateModal = false"
              ></v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols="12"></v-col>
          <v-col
            v-if="showUnitFilter"
            class="mt-n8"
            cols="4"
          >
            <v-select
              v-model="unit"
              :items="units"
              item-text="name"
              item-value="name"
              label="Inventory Unit"
              outlined
              dense
              clearable
            ></v-select>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions v-if="product">
        <v-btn
          color="primary"
          @click="generateReport"
        >
          <v-icon>
            {{ icons.mdiFinance }}
          </v-icon>
          Generate Report
        </v-btn>
      </v-card-actions>
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
      v-if="stockcard.length > 0 && reportLoading === false"
      class="mt-8"
    >
      <v-card-text>
        <div class="text-center">
          <v-data-table
            class="elevation-4"
            :items="stockcard"
            :headers="headers"
          >
            <template v-slot:footer>
              <v-toolbar
                flat
                class="mt-16"
                color=""
              >
                <v-card-text>
                  <v-row class="mt-10">
                    <v-col
                      cols="7"
                    >
                    </v-col>
                    <v-col
                      cols="5"
                    >
                      <v-currency-field
                        v-model="stockCardTotalAmount"
                        outlined
                        class="text-green"
                        disabled
                        dense
                        hide-details="auto"
                        label="Stockcard Total Balance"
                      ></v-currency-field>
                    </v-col>
                    <v-col
                      cols="4"
                      offset-md="4"
                    >
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-toolbar>
            </template>
          </v-data-table>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import {
  computed, ref, onMounted, onUnmounted,
  watch,
} from '@vue/composition-api'
import store from '@/store'
import { mdiCalendar, mdiFinance } from '@mdi/js'
import router from '@/router'

export default {
  name: 'Stockcard',
  setup() {
    const products = computed(() => store.state.FinishProductStore.list)
    const product = ref()
    const units = ref([])
    const productLoading = computed(() => store.state.FinishProductStore.loading)
    const reportLoading = computed(() => store.state.ReportStore.loading)
    const stockcard = computed(() => store.state.ReportStore.stockcardReport)
    const fromDate = ref(new Date().toISOString().substr(0, 10))
    const fromDateModal = ref(false)
    const toDateModal = ref(false)
    const showUnitFilter = ref(false)
    const toDate = ref(new Date().toISOString().substr(0, 10))
    const unit = ref('')
    const stockCardTotalAmount = computed(() => {
      if (store.state.ReportStore.stockcardReport.length > 0) {
        return store.state.ReportStore.stockcardReport[store.state.ReportStore.stockcardReport.length - 1].balance
      }

      return 0
    })

    const showDateFilter = ref(false)
    const headers = [
      {
        width: '130px',
        text: 'Date',
        align: 'start',
        sortable: true,
        value: 'date',
      },
      { text: 'Event', value: 'event', sortable: true },
      {
        text: 'Document', value: 'document', width: '160px', sortable: true,
      },
      {
        text: 'Doc #', value: 'document_number', width: '160px', sortable: true,
      },
      {
        text: 'Remarks', value: 'remarks', width: '160px', sortable: true,
      },
      {
        text: 'Quantity', value: 'quantity', width: '170px', sortable: true,
      },
      {
        text: 'Unit', value: 'unit', width: '130px', sortable: true,
      },
      {
        text: 'Price', value: 'price', width: '170px', sortable: true,
      },
      {
        text: 'Status', value: 'status', width: '100px', sortable: true,
      },
      {
        text: 'Qty In', value: 'quantity_in', width: '170px', sortable: true,
      },
      {
        text: 'Qty Out', value: 'quantity_out', width: '170px', sortable: true,
      },
      {
        text: 'Balance', value: 'balance', width: '170px', sortable: true,
      },
    ]

    onMounted(async () => {
      await store.dispatch('FinishProductStore/list')
      await store.dispatch('ReportStore/clearReport', 'stockcardReport')
    })

    onUnmounted(async () => {
      await store.dispatch('ReportStore/clearReport', 'stockcardReport')
    })

    const generateUnits = () => {
      if (product.value) {
        const productData = products.value.find(item => item.id === product.value)

        units.value = productData.units
      } else {
        store.dispatch('ReportStore/clearReport', 'stockcardReport')
      }
    }

    const generateReport = () => {
      const payload = ref({
        productId: product.value,
        fromDate: null,
        toDate: null,
        unit: null,
      })

      if (showDateFilter.value) {
        payload.value.fromDate = fromDate.value
        payload.value.toDate = toDate.value
      }

      if (showUnitFilter.value) {
        payload.value.unit = unit.value
      }

      store.dispatch('ReportStore/getStockcardReport', payload.value)
    }

    return {
      generateReport,
      units,
      unit,
      showDateFilter,
      icons: {
        mdiCalendar,
        mdiFinance,
      },
      showUnitFilter,
      fromDateModal,
      toDateModal,
      fromDate,
      toDate,
      product,
      productLoading,
      products,
      headers,
      generateUnits,
      reportLoading,
      stockcard,
      stockCardTotalAmount,
    }
  },
}
</script>

<style scoped>

</style>
