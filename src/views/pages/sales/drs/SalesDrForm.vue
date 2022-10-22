<template>
  <v-card>
    <v-card-title class="pa-6">
      {{ mode }} Sales DR
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
            <v-btn
              v-if="modeData === 'Create'"
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
        </v-row>
        <sales-order-items
          class="mt-6"
          :mode="mode"
          :disabled="formData.status === 'Posted'"
          :items="formData.sales_dr_items"
          :customer-id="formData.customer_id"
          @totalAmount="fetchTotalAmount"
          @orderItemIds="fetchOrderItemIds"
        ></sales-order-items>
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
              v-if="formData.status === 'Posted'"
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
  mdiAccountPlusOutline,
} from '@mdi/js'
import CustomerForm from '@/views/pages/master-files/customers/CustomerForm.vue'
import SalesOrderItems from '@/views/pages/sales/drs/SalesOrderItems.vue'
import store from '@/store'

export default {
  name: 'SalesDrForm',
  components: {
    CustomerForm,
    SalesOrderItems,
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
      sales_dr_items: [],
    })
    const orderItems = ref([])

    store.dispatch('TermStore/list')
    store.dispatch('VatStore/list')
    store.dispatch('SalesmanStore/list')
    store.dispatch('DocumentStore/list')
    const terms = computed(() => store.state.TermStore.terms)
    const vats = computed(() => store.state.VatStore.vats)
    const documents = computed(() => store.state.DocumentStore.documents.filter(documentItem => {
      if (documentItem.module === 'Sales') {
        documentItem.title = `${documentItem.document_name}`

        return documentItem
      }
    }))
    const types = ref([
      'Regular',
      'Distributor',
    ])

    const datePosted = ref(new Date().toISOString().substr(0, 10))

    formData.value = dataProp.value ?? formData.value

    const fetchOrderItems = items => {
      orderItems.value = items
    }

    if (modeData.value === 'Edit') {
      formData.value = dataProp.value
      formData.value.customer_name = dataProp.value.customer.name
      formData.value.customer_id = dataProp.value.customer.id
      formData.value.type = dataProp.value.customer.type
      formData.value.sales_dr_items = JSON.parse(JSON.stringify(dataProp.value.sales_dr_items))
      store.dispatch('SalesOrderStore/orderItems', dataProp.value.customer.id)
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

    watch(dataProp, () => {
      if (modeData.value === 'Edit') {
        formData.value = dataProp.value
        formData.value.customer_name = dataProp.value.customer.name
        formData.value.customer_id = dataProp.value.customer.id
        formData.value.type = dataProp.value.customer.type
        formData.value.sales_dr_items = JSON.parse(JSON.stringify(dataProp.value.sales_dr_items))
        store.dispatch('SalesOrderStore/orderItems', dataProp.value.customer.id)
        console.log(formData.value.sales_dr_items)

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

    const salesOrderTotalAmount = ref(0)
    const orderItemIds = ref([])

    const cancel = () => {
      emit('submit')
    }

    const showCustomerModal = () => {
      customerModal.value = true
    }

    const onSelectCustomer = customer => {
      if (customer?.id) {
        formData.value.customer_name = customer.name
        formData.value.customer_id = customer.id
        formData.value.document_id = customer.document_id
        formData.value.address = customer.address
        formData.value.remarks = customer.remarks
        formData.value.area = customer.area
        formData.value.salesman_id_1 = customer.salesman_id_1
        formData.value.salesman_id_2 = customer.salesman_id_2
        formData.value.term_id = customer.term_id
        formData.value.vat_id = customer.vat_id
        formData.value.type = customer.type
        store.dispatch('SalesOrderStore/orderItems', customer.id)
      }

      customerModal.value = false
    }

    const fetchTotalAmount = totalAmount => {
      salesOrderTotalAmount.value = totalAmount
    }

    const fetchOrderItemIds = ids => {
      orderItemIds.value = ids
    }

    const submit = () => {
      const payload = formData.value
      payload.date_posted = datePosted.value
      payload.order_item_ids = orderItemIds.value
      payload.amount = salesOrderTotalAmount.value

      if (modeData.value === 'Create') {
        store.dispatch('SalesDrStore/create', payload).then(
          response => {
            if (response.status === undefined) {
              emit('submit', response.data)
            }
          },
        )
      } else {
        store.dispatch('SalesDrStore/update', payload).then(
          response => {
            if (response.status === undefined) {
              emit('submit', response.data)
            }
          },
        )
      }
    }

    const postOrder = () => {
      store.dispatch('SalesDrStore/postOrder', formData.value.id).then(
        response => {
          if (response.status === undefined) {
            emit('submit', response.data)
          }
        },
      )
    }

    const unpostOrder = () => {
      store.dispatch('SalesDrStore/unpostOrder', formData.value.id).then(
        response => {
          if (response.status === undefined) {
            emit('submit', response.data)
          }
        },
      )
    }

    const errors = computed(() => store.state.SalesDrStore.errors)

    return {
      postOrder,
      unpostOrder,
      fetchTotalAmount,
      fetchOrderItemIds,
      modeData,
      salesOrderTotalAmount,
      documents,
      errors,
      terms,
      types,
      vats,
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
        mdiInformation,
        mdiAccountPlusOutline,
      },
    }
  },
}
</script>

<style scoped>

</style>
