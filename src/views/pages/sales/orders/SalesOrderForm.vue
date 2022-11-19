<template>
  <v-card>
    <v-card-title class="pa-6">
      {{ mode }} Sales Order
    </v-card-title>
    <v-card-text>
      <v-form>
        <v-row>
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
              :disabled="formData.has_dr === 1 || formData.status === 'Posted'"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="datePosted"
                  :disabled="formData.has_dr === 1 || formData.status === 'Posted'"
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
                :disabled="formData.has_dr === 1 && formData.status === 'Posted'"
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
              v-if="formData.id !== undefined"
              v-model="formData.sales_order_number"
              outlined
              :error-messages="errors.sales_order_number"
              readonly
              hide-details="auto"
              label="Sales Order Number"
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
              :disabled="formData.has_dr === 1 || formData.status === 'Posted'"
              label="Document"
              :error-messages="errors.document_id"
              outlined
              dense
              clearable
              hide-details="auto"
            ></v-select>
          </v-col>
          <v-col
            cols="3"
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
            class=""
          >
            <v-btn
              v-if="modeData === 'Create' && formData.status !== 'Posted'"
              class="md4"
              color="primary"
              x-small
              dark
              @click="showCustomerModal"
            >
              Get Customer
              <v-icon>
                {{ icons.mdiAccountPlusOutline }}
              </v-icon>
            </v-btn>
          </v-col>
          <v-col
            v-if="formData.customer_name !== null"
            cols="2"
          >
            <v-btn
              class="ml-n16"
              color="primary"
              x-small
              dark
              :href="`/customer-aging/${formData.customer_id}`"
              target="_blank"
            >
              A/R
              <v-icon>
                {{ icons.mdiNotebook }}
              </v-icon>
            </v-btn>
          </v-col>
          <v-col
            cols="2"
          >
            <v-btn
              v-if="formData.customer_name !== null"
              class="ml-n16"
              color="primary"
              x-small
              dark
              @click="drDialog=true"
            >
              Unpaid Orders
              <v-icon>
                {{ icons.mdiBookInformationVariant }}
              </v-icon>
            </v-btn>
          </v-col>
          <v-col
            cols="2"
            class="pr-8 pl-8"
          >
            <v-select
              v-model="formData.type"
              :items="types"
              label="Customer Type"
              :error-messages="errors.type"
              disabled
              readonly
              clearable
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
              :disabled="formData.has_dr === 1 || formData.status === 'Posted'"
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
              :disabled="formData.has_dr === 1 || formData.status === 'Posted'"
              clearable
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
              clearable
              :disabled="formData.has_dr === 1 || formData.status === 'Posted'"
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
              clearable
              :disabled="formData.has_dr === 1 || formData.status === 'Posted'"
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
              :disabled="formData.has_dr === 1 || formData.status === 'Posted'"
              clearable
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
              rows="2"
              :disabled="formData.has_dr === 1 || formData.status === 'Posted'"
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
              rows="2"
              dense
              :disabled="formData.has_dr === 1 || formData.status === 'Posted'"
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
              dense
              :disabled="formData.has_dr === 1 || formData.status === 'Posted'"
              :error-messages="errors.promo_code"
              hide-details="auto"
              label="Promo Code"
            ></v-text-field>
          </v-col>
        </v-row>
        <order-items
          class="mt-6"
          :mode="modeData"
          :items="orderItems"
          :disabled="formData.status === 'Posted'"
          @addItem="fetchOrderItems"
          @totalAmount="fetchTotalAmount"
        ></order-items>
        <v-row>
          <v-col
            cols="auto"
            class="d-flex"
          >
            <v-btn
              v-if="formData.status !== 'Posted'"
              color="primary"
              class="me-3 mt-4"
              @click="submit"
            >
              <v-icon>
                {{ icons.mdiContentSave }}
              </v-icon>
              {{ modeData === 'Create' ? 'Create' : 'Update' }}
            </v-btn>
            <v-btn
              v-if="formData.status === 'For Review'"
              color="success"
              class="me-3 mt-4"
              @click="postOrder"
            >
              <v-icon>
                {{ icons.mdiFinance }}
              </v-icon>
              Post
            </v-btn>
            <v-btn
              v-if="formData.status === 'Posted' && formData.has_dr !== 1"
              color="error"
              class="me-3 mt-4"
              @click="unpostOrder"
            >
              <v-icon>
                {{ icons.mdiFinance }}
              </v-icon>
              Unpost
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
      <v-dialog
        v-model="drDialog"
        hide-overlay
        width="1000px"
        height="800px"
        transition="dialog-bottom-transition"
      >
        <v-card>
          <v-card-text>
            <dr-list-table-form
              :customer-id="formData.customer_id"
              @submit="drDialog=false"
            >
            </dr-list-table-form>
          </v-card-text>
          <v-card-actions>
            <v-btn
              outlined
              class="me-3 mt-4"
              type="reset"
              color="error"
              @click.prevent="drDialog=false"
            >
              <v-icon>
                {{ icons.mdiProgressClose }}
              </v-icon>
              Close
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog
        v-model="customerModal"
        fullscreen
        hide-overlay
        width="1100px"
        height="500px"
        transition="dialog-bottom-transition"
      >
        <customer-form
          :mode="'Selecting'"
          @submit="onSelectCustomer"
          @clicked="cancel"
        ></customer-form>
      </v-dialog>
    </v-card-text>
  </v-card>
</template>

<script>
import {
  computed, ref, toRef, watch,
} from '@vue/composition-api'
import {
  mdiInformation,
  mdiBookInformationVariant,
  mdiAccountPlusOutline,
  mdiContentSave,
  mdiFinance,
  mdiProgressClose,
  mdiNotebook,
} from '@mdi/js'
import CustomerForm from '@/views/pages/master-files/customers/CustomerForm.vue'
import DrListTableForm from '@/views/pages/sales/orders/DrListTableForm.vue'
import OrderItems from '@/views/pages/sales/orders/OrderItems.vue'
import store from '@/store'

export default {
  name: 'SalesOrderForm',
  components: {
    CustomerForm,
    OrderItems,
    DrListTableForm,
  },
  props: {
    mode: {
      type: String,
      required: true,
      default: (() => 'Create'),
    },
    id: {
      type: Number,
      required: false,
      default: null,
    },
    data: {
      type: Object,
      required: false,
      default: null,
    },
  },
  setup(props, { emit }) {
    const customerModal = ref(false)
    const drDialog = ref(false)
    const modeData = toRef(props, 'mode')
    const dataProp = toRef(props, 'data')
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
    })
    const salesOrderTotalAmount = ref(0)
    const orderItems = ref([])
    const terms = computed(() => store.state.TermStore.terms)
    const vats = computed(() => store.state.VatStore.vats)
    const documents = computed(() => store.state.DocumentStore.documents.filter(documentItem => {
      documentItem.title = `${documentItem.document_name}`
      if (documentItem.module === 'Orders') {
        if (documentItem.document_name === 'Sales Order') {
          formData.value.document_id = documentItem.id
        }

        if (modeData.value === 'Create' && (documentItem.is_active === 1 || documentItem.is_active === 'Active')) {
          return documentItem
        }

        if (modeData.value === 'Edit') {
          return documentItem
        }
      }
    }))

    const types = ref([
      'Regular',
      'Distributor',
    ])

    const fetchTotalAmount = totalAmount => {
      salesOrderTotalAmount.value = totalAmount
    }

    const datePosted = ref(new Date().toISOString().substr(0, 10))

    const fetchOrderItems = items => {
      orderItems.value = items
    }

    const cancel = () => {
      formData.value = {
        status: null,
        has_dr: 0,
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
      }

      emit('submit')
    }

    const showCustomerModal = () => {
      customerModal.value = true
    }

    const onSelectCustomer = customer => {
      if (customer?.id) {
        formData.value.customer_name = customer.name
        formData.value.customer_id = customer.id
        formData.value.address = customer.address
        formData.value.remarks = customer.remarks
        formData.value.area = customer.area
        formData.value.salesman_id_1 = customer.salesman_id_1
        formData.value.salesman_id_2 = customer.salesman_id_2
        formData.value.term_id = customer.term_id
        formData.value.vat_id = customer.vat_id
        formData.value.type = customer.type
      }

      customerModal.value = false
    }

    if (modeData.value === 'Edit') {
      formData.value = dataProp.value
      formData.value.customer_name = dataProp.value.customer.name
      formData.value.customer_id = dataProp.value.customer.id
      formData.value.type = dataProp.value.customer.type
      formData.value.has_dr = dataProp.value.has_dr
      fetchOrderItems(dataProp.value.order_items)
    }

    watch(dataProp, () => {
      if (modeData.value === 'Edit') {
        formData.value = dataProp.value
        formData.value.customer_name = dataProp.value.customer.name
        formData.value.customer_id = dataProp.value.customer.id
        formData.value.type = dataProp.value.customer.type
        formData.value.has_dr = dataProp.value.has_dr
        fetchOrderItems(dataProp.value.order_items)
      } else {
        formData.value = {
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
        }

        orderItems.value = []
      }
    })

    const postOrder = () => {
      store.dispatch('SalesOrderStore/postOrder', formData.value.id).then(
        response => {
          if (response.status === undefined) {
            store.dispatch('UnitPackingStore/list')
            emit('submit', response.data)
          }
        },
      )
    }

    const unpostOrder = () => {
      store.dispatch('SalesOrderStore/unpostOrder', formData.value.id).then(
        response => {
          if (response.status === undefined) {
            emit('submit', response.data)
          }
        },
      )
    }

    const submit = () => {
      if (modeData.value === 'Create') {
        const payload = formData.value
        payload.date_posted = datePosted.value
        payload.order_items = orderItems.value
        payload.amount = salesOrderTotalAmount.value

        store.dispatch('SalesOrderStore/create', payload).then(
          response => {
            if (response.status === undefined) {
              emit('submit', response.data)
            }
          },
        )
      } else if (modeData.value === 'Edit') {
        const payload = formData.value
        payload.date_posted = datePosted.value
        payload.order_items = orderItems.value
        payload.amount = salesOrderTotalAmount.value

        store.dispatch('SalesOrderStore/update', payload).then(
          response => {
            if (response.status === undefined) {
              emit('submit', response.data)
            }
          },
        )
      }
    }

    const errors = computed(() => store.state.SalesOrderStore.errors)

    return {
      drDialog,
      postOrder,
      unpostOrder,
      modeData,
      fetchTotalAmount,
      salesOrderTotalAmount,
      documents,
      errors,
      terms,
      types,
      vats,
      orderItems,
      fetchOrderItems,
      salesmans: computed(() => store.state.SalesmanStore.salesmans),
      submit,
      datePosted,
      onSelectCustomer,
      showCustomerModal,
      cancel,
      customerModal,
      formData,
      icons: {
        mdiProgressClose,
        mdiFinance,
        mdiContentSave,
        mdiBookInformationVariant,
        mdiNotebook,
        mdiInformation,
        mdiAccountPlusOutline,
      },
    }
  },
}
</script>

<style scoped>

</style>
