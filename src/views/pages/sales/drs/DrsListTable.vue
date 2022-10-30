<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="salesOrders"
      sort-by="name"
      class="elevation-1"
      :search="search"
      :loading="loading"
    >
      <template #item.created_at="{ item }">
        {{ dateFormat1(item.created_at) }}
      </template>
      <template #item.amount="{ item }">
        <v-currency-field
          prefix="PHP"
          class="text-green"
          v-model="item.amount"
          disabled
        >
        </v-currency-field>
      </template>
      <template #item.remaining_balance="{ item }">
        <v-currency-field
          prefix="PHP"
          class="text-green"
          v-model="item.remaining_balance"
          disabled
        >
        </v-currency-field>
      </template>
      <template v-slot:top>
        <v-toolbar
          color="teal"
          outlined
        >
          <v-toolbar-title>Sales Drs</v-toolbar-title>
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
            class="mr-4"
          ></v-text-field>
          <v-btn
            color="primary"
            dark
            class="mb-2"
            @click="$router.push('/sales-drs/create')"
          >
            Create Sales DR
          </v-btn>
          <v-dialog
            v-model="salesOrderDialog"
            width="900px"
            fullscreen
            max-width="900px"
            max-height="900px"
            height="500px"
            transition="dialog-bottom-transition"
          >
            <sales-dr-form
              :mode="modeData"
              :data="salesOrder"
              @submit="initialize"
            ></sales-dr-form>
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
import SalesDrForm from './SalesDrForm.vue'

export default {
  name: 'DrsListTable',
  components: {
    SalesDrForm,
  },
  setup() {
    store.dispatch('ProductStore/list')
    const modeData = ref('Create')
    const salesOrderDialog = ref(false)
    const search = ref('')
    const headers = ref([
      {
        text: 'Date',
        align: 'start',
        sortable: false,
        value: 'created_at',
      },
      { text: 'DR No', value: 'sales_dr_number' },
      { text: 'Document', value: 'document.document_name' },
      { text: 'Customer', value: 'customer.name' },
      { text: 'Total Amount', value: 'amount' },
      { text: 'Remaining Balance', value: 'remaining_balance' },
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

    const salesOrders = computed(() => store.state.SalesDrStore.list)
    const errors = computed(() => store.getters.errors)
    const loading = computed(() => store.state.SalesDrStore.loading)

    const initialize = () => {
      salesOrderDialog.value = false
      store.dispatch('SalesDrStore/list')
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
      window.open(`https://management-api-v1.herokuapp.com/print-so-delivery-receipt/${id}`, '_blank')
    }

    return {
      editItem,
      salesOrder,
      createSalesOrder,
      modeData,
      salesOrderDialog,
      mdiAccountEdit,
      mdiDeleteCircle,
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
      mdiPrinter,
      redirectPrint,
    }
  },
}
</script>
<style>
.text-green input {
  color: chartreuse !important;
}

</style>
