<template>
  <div>
    <v-card>
      <v-card-title>Stockcard Report</v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="6">
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
              @change="generateStockcardReport"
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
import { computed, ref, onMounted, onUnmounted} from '@vue/composition-api'
import store from '@/store'

export default {
  name: 'Stockcard',
  setup() {
    const products = computed(() => store.state.FinishProductStore.list)
    const product = ref()
    const productLoading = computed(() => store.state.FinishProductStore.loading)
    const reportLoading = computed(() => store.state.ReportStore.loading)
    const stockcard = computed(() => store.state.ReportStore.stockcardReport)
    const stockCardTotalAmount = computed(() => {
      if (store.state.ReportStore.stockcardReport.length>0) {
        return store.state.ReportStore.stockcardReport[store.state.ReportStore.stockcardReport.length - 1].balance
      } else {
        return 0
      }
    })
    const headers = [
      {
        width: "130px",
        text: 'Date',
        align: 'start',
        sortable: false,
        value: 'date',
      },
      { text: 'Event', value: 'event' },
      { text: 'Document', value: 'document', width: "160px" },
      { text: 'Doc #', value: 'document_number', width: "160px",},
      { text: 'Remarks', value: 'remarks', width: "160px" },
      { text: 'Quantity', value: 'quantity', width: "170px", },
      { text: 'Unit', value: 'unit',  width: "130px",  },
      { text: 'Price', value: 'price', width: "170px", },
      { text: 'Status', value: 'status',  width: "100px",  },
      { text: 'Qty In', value: 'quantity_in',  width: "170px",  },
      { text: 'Qty Out', value: 'quantity_out',  width: "170px",  },
      { text: 'Balance', value: 'balance',  width: "170px",  },
    ]

    onMounted(async () => {
      await store.dispatch('FinishProductStore/list')
      await store.dispatch('ReportStore/clearReport', 'stockcardReport')
    })

    onUnmounted(async () => {
      await store.dispatch('ReportStore/clearReport', 'stockcardReport')
    })

    const generateStockcardReport = () => {
      if (product.value) {
        store.dispatch('ReportStore/getStockcardReport', product.value)

        return
      }

      store.dispatch('ReportStore/clearReport', 'stockcardReport')
    }

    return {
      product,
      productLoading,
      products,
      headers,
      generateStockcardReport,
      reportLoading,
      stockcard,
      stockCardTotalAmount,
    }
  },
}
</script>

<style scoped>

</style>
