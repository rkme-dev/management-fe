<template>
  <v-card>
    <v-card-title class="pa-6">
      Create Sales DR
    </v-card-title>
    <v-card-text>
      <v-form>
        <v-row>
          <v-col cols="12">
            <v-alert
              color="success"
              text
              style="margin-bottom: -10px"
            >
              <div class="d-flex align-start">
                <v-icon color="success">
                  {{ icons.mdiInformation }}
                </v-icon>
                <div class="ms-3">
                  <p class="text-base font-weight-medium mb-1">
                    Sales Order Items
                  </p>
                </div>
              </div>
            </v-alert>
          </v-col>
          <v-col cols="12">
            <v-data-table
              :headers="headers"
              :items="orderItems"
            >
              <template v-slot:top>
                <v-toolbar
                  flat
                  color="primary"
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
                          v-model="totalAmount"
                          outlined
                          class="text-green"
                          disabled
                          dense
                          hide-details="auto"
                          label="Sales Order Total Amount"
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
              <template #item.total_amount="{ item }">
                <v-currency-field
                  v-model="item.total_amount"
                  prefix="PHP"
                  class="text-green"
                  disabled
                >
                </v-currency-field>
              </template>
            </v-data-table>
          </v-col>
          <v-col cols="8"></v-col>
          <v-col cols="4">
            <v-btn
              color="success"
              @click="showOrderItems=true"
            >
              Get Sales Order Items
            </v-btn>
          </v-col>
        </v-row>
        <v-row v-if="customer.id">
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
              v-model="formData.sales_dr_number"
              outlined
              :disabled="formData.id !== undefined"
              :error-messages="errors.sales_dr_number"
              dense
              hide-details="auto"
              label="Sales DR Number"
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
              v-model="formData.customer_name"
              outlined
              readonly
              :error-messages="errors.customer_id"
              dense
              hide-details="auto"
              label="Customer"
            ></v-text-field>
          </v-col>
          <v-col
            cols="2"
          >
          </v-col>
          <v-col
            cols="3"
            class="pr-8 pl-8"
          >
            <v-select
              v-model="formData.type"
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
              :disabled="formData.status === 'Posted'"
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
              :disabled="formData.status === 'Posted'"
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
              :disabled="formData.status === 'Posted'"
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
              :disabled="formData.status === 'Posted'"
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
              :disabled="formData.status === 'Posted'"
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
              :disabled="formData.status === 'Posted'"
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
              :disabled="formData.status === 'Posted'"
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
              :disabled="formData.status === 'Posted'"
              dense
              :error-messages="errors.promo_code"
              hide-details="auto"
              label="Promo Code"
            ></v-text-field>
          </v-col>
          <v-col
            cols="auto"
            class="d-flex"
          >
            <v-btn
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
    </v-card-text>
    <v-dialog
      v-model="showOrderItems"
      fullscreen
    >
      <v-card>
        <v-card-text>
          <order-items-selection
            class="mt-6"
            :mode="mode"
            :disabled="formData.status === 'Posted'"
            @totalAmount="fetchTotalAmount"
            @orderItems="fetchOrderItems"
            @setCustomer="setCustomer"
          ></order-items-selection>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-card>
</template>
<script>
import { mdiInformation } from '@mdi/js'
import OrderItemsSelection from '@/views/pages/sales/drs/components/OrderItemsSelection.vue'
import { ref, computed } from '@vue/composition-api'
import store from '@/store'
import router from '@/router'

export default {
  name: 'DrSelection',
  components: {
    OrderItemsSelection,
  },
  setup({ emit }) {
    store.dispatch('SalesOrderStore/allOrderItems')
    store.dispatch('TermStore/list')
    store.dispatch('VatStore/list')
    store.dispatch('SalesmanStore/list')
    store.dispatch('DocumentStore/list')

    const orderItems = ref([])
    const totalAmount = ref(0)
    const mode = ref('create')
    const showOrderItems = ref(false)
    const headers = [
      { text: 'Date', sortable: true, value: 'date_posted' },
      { text: 'SO No', value: 'sales_order_number', sortable: true },
      { text: 'Amount', value: 'total_amount', sortable: true },
    ]
    const customer = ref({})
    const types = [
      'Regular',
      'Distributor',
    ]
    const terms = computed(() => store.state.TermStore.terms)
    const vats = computed(() => store.state.VatStore.vats)
    const documents = computed(() => store.state.DocumentStore.documents.filter(documentItem => {
      if (documentItem.module === 'Sales') {
        documentItem.title = `${documentItem.document_name}`

        return documentItem
      }
    }))
    const salesmans = computed(() => store.state.SalesmanStore.salesmans)
    const datePosted = ref(new Date().toISOString().substr(0, 10))
    const formData = ref({
      dateModal: false,
      customer_name: null,
      customer_id: null,
      date_posted: null,
      sales_order_number: null,
      document_id: null,
      address: null,
      remarks: null,
      area: null,
      salesman_id_1: null,
      salesman_id_2: null,
      term_id: null,
      vat_id: null,
      sales_dr_items: [],
    })

    const submit = () => {
      const payload = formData.value
      payload.date_posted = datePosted.value
      payload.order_item_ids = orderItems.value.map(item => item.order_item_id)
      payload.amount = totalAmount.value

      store.dispatch('SalesDrStore/create', payload).then(
        response => {
          if (response.status === undefined) {
            router.push('/sales-drs')
          }
        },
      )
    }

    const errors = computed(() => store.state.SalesDrStore.errors)

    const fetchTotalAmount = amount => {
      totalAmount.value = amount
    }

    const fetchOrderItems = items => {
      orderItems.value = items
      showOrderItems.value = false
    }

    const setCustomer = data => {
      customer.value = data

      formData.value.customer_name = customer.value.name
      formData.value.customer_id = customer.value.id
      formData.value.type = customer.value.type
    }

    const showDialog = ref(true)

    return {
      datePosted,
      customer,
      errors,
      salesmans,
      vats,
      documents,
      types,
      terms,
      submit,
      setCustomer,
      headers,
      showOrderItems,
      showDialog,
      orderItems,
      fetchOrderItems,
      fetchTotalAmount,
      formData,
      totalAmount,
      mode,
      icons: {
        mdiInformation,
      },
    }
  },
}
</script>

<style scoped>

</style>
