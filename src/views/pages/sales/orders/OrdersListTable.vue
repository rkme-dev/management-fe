<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="salesOrders"
      sort-by="name"
      class="elevation-1"
      :search="search"
      :loading="loading"
      loading-text="Loading data ..."
    >
      <template #[`item.status`]="{item}">
        <div class="d-flex justify-center">
          <v-chip
            medium
            :class="`${colors[item.status]}--text`"
            class="v-chip--pill text-center font-weight-bold elevation-2 text-body-2"
          >
            {{ item.status }}
          </v-chip>
        </div>
      </template>
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
      <template v-slot:top>
        <v-toolbar
          color="teal"
          outlined
        >
          <v-toolbar-title>Sales Orders</v-toolbar-title>
          <v-divider
            class="mx-4"
            inset
            vertical
          ></v-divider>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
            class="mr-16 mb-4"
          ></v-text-field>
          <v-switch
            v-model="showPosted"
            label="Display Posted"
            class="mb-n4 mr-16"
          ></v-switch>
          <v-btn
            color="primary"
            dark
            class="mb-2 mr-10"
            @click="createSalesOrder"
          >
            Add New Sales Order
          </v-btn>
          <v-dialog
            v-model="salesOrderDialog"
            width="900px"
            persistent
            fullscreen
            max-width="900px"
            max-height="900px"
            height="500px"
            transition="dialog-bottom-transition"
          >
            <sales-order-form
              :mode="modeData"
              :data="salesOrder"
              @submit="initialize"
            ></sales-order-form>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon
          medium
          class="mr-2"
          @click="editItem(item)"
        >
          {{ icons.mdiAccountEdit }}
        </v-icon>
        <v-icon
          v-if="item.is_active === 'Active'"
          small
          @click="deleteItem(item)"
        >
          {{ icons.mdiDeleteCircle }}
        </v-icon>
        <v-icon
          color="info"
          style="margin-left: 10px"
          medium
          class="mr-2"
          @click="redirectPrint(item.id)"
        >
          {{ mdiPrinter }}
        </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn
          color="primary"
          @click="initialize"
        >
          Reset
        </v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { mdiAccountEdit, mdiDeleteCircle, mdiPrinter } from '@mdi/js'
import {
  ref, computed, onMounted,
} from '@vue/composition-api'
import store from '@/store'
import { dateFormat1 } from '@/utils/time'
import { salesStatusColors } from '@/constants/SalesStatusColors'
import SalesOrderForm from './SalesOrderForm.vue'

export default {
  components: {
    SalesOrderForm,
  },
  setup() {
    console.log(salesStatusColors().value.Posted)
    const showPosted = ref(false)
    const modeData = ref('Create')
    const salesOrderDialog = ref(false)
    const search = ref('')
    const headers = ref([
      {
        text: 'Date',
        align: 'start',
        sortable: true,
        value: 'created_at',
      },
      { text: 'SO No', value: 'sales_order_number' },
      { text: 'Document', value: 'document.document_name' },
      { text: 'Customer', value: 'customer.name' },
      { text: 'Amount', value: 'amount' },
      { text: 'Status', value: 'status' },
      { text: 'Actions', value: 'actions', sortable: false },
    ])

    const defaultItem = ref({
      name: '',
      contact_person: '',
      email: '',
      tin: '',
      contact_no: '',
      delivery_address: '',
    })
    const salesOrder = ref({
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

    const salesOrders = computed(() => store.state.SalesOrderStore.list.filter(order => {
      if (showPosted.value === true && order.status === 'Posted') {
        return order
      }

      if (showPosted.value === false && order.status === 'For Review') {
        return order
      }
    }))

    const errors = computed(() => store.getters.errors)
    const loading = computed(() => store.state.SalesOrderStore.loading)

    const initialize = () => {
      salesOrderDialog.value = false
      store.dispatch('FinishProductStore/list')
      store.dispatch('TermStore/list')
      store.dispatch('VatStore/list')
      store.dispatch('SalesmanStore/list')
      store.dispatch('DocumentStore/list')

      store.dispatch('SalesOrderStore/list')
    }

    const createSalesOrder = () => {
      modeData.value = 'Create'
      salesOrderDialog.value = true
      salesOrder.value = {
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
    }

    const editItem = item => {
      salesOrder.value = item
      modeData.value = 'Edit'
      salesOrderDialog.value = true
    }

    onMounted(() => {
      initialize()
    })

    const redirectPrint = id => {
      window.open(`https://management-api-v1.herokuapp.com/print-sales-order/${id}`, '_blank')
    }

    const colors = salesStatusColors()

    return {
      colors,
      showPosted,
      editItem,
      salesOrder,
      createSalesOrder,
      modeData,
      salesOrderDialog,
      mdiAccountEdit,
      mdiDeleteCircle,
      mdiPrinter,
      defaultItem,
      headers,
      search,
      salesOrders,
      errors,
      initialize,
      loading,
      dateFormat1,
      icons: {
        mdiAccountEdit,
        mdiDeleteCircle,
      },
      redirectPrint,
    }
  },
}
</script>
<style>
.text-green input {
  color: #009900 !important;
}

</style>
