<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="tripTicketDatas"
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
          <v-toolbar-title>Trip Tickets</v-toolbar-title>
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
            @click="createCollection"
          >
            Create Trip Ticket
          </v-btn>
          <v-dialog
            v-model="tripTicketDialog"
            width="900px"
            fullscreen
            max-width="900px"
            max-height="900px"
            height="500px"
            transition="dialog-bottom-transition"
          >
            <trip-ticket-form
              :mode="modeData"
              :data="tripTicketData"
              @submit="reload"
            >
            </trip-ticket-form>
          </v-dialog>
        </v-toolbar>
      </template>
      <template #[`item.status`]="{ item }">
        <div class="d-flex justify-center">
          <v-chip
            :class="`${statusColor[item.status]}--text`"
            class="v-chip-light-bg text-center"
          >
            {{ item.status }}
          </v-chip>
        </div>
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
import { ref, computed, onMounted } from '@vue/composition-api'
import store from '@/store'
import { dateFormat1 } from '@/utils/time'
import TripTicketForm from './TripTicketForm.vue'

export default {
  name: 'ListTable',
  components: {
    TripTicketForm,
  },
  setup() {
    const statusColor = {
      'In Transit': 'primary',
      'For Transit': 'info',
      Delivered: 'success',
    }

    const modeData = ref('Create')
    const tripTicketDialog = ref(false)
    const search = ref('')
    const headers = [
      {
        text: 'Date',
        align: 'start',
        sortable: false,
        value: 'date_posted',
      },
      { text: 'Trip Ticket Number', value: 'trip_ticket_number' },
      { text: 'Document', value: 'document.document_name' },
      { text: 'Route', value: 'area' },
      { text: 'Driver', value: 'driver' },
      { text: 'Truck', value: 'truck' },
      { text: 'Plate #', value: 'plate_number' },
      { text: 'Status', value: 'status' },
      { text: 'Actions', value: 'actions', sortable: false },
    ]

    const defaultItem = ref({
      name: '',
      contact_person: '',
      email: '',
      tin: '',
      contact_no: '',
      delivery_address: '',
    })
    const tripTicketData = ref({
      dateModal: false,
      date_posted: null,
      collection_order_number: null,
      document_id: null,
      address: null,
      remarks: null,
      area: null,
    })

    const tripTicketDatas = computed(() => store.state.TripTicketStore.list)
    const errors = computed(() => store.getters.errors)
    const loading = computed(() => store.state.TripTicketStore.loading)

    const reload = () => {
      window.location.reload()
    }

    const initialize = () => {
      store.dispatch('SalesDrStore/getAreas')
      store.dispatch('DocumentStore/list')
      store.dispatch('TripTicketStore/list')
    }

    const createCollection = () => {
      modeData.value = 'Create'
      tripTicketDialog.value = true
      tripTicketData.value = {
        dateModal: false,
        customer_name: null,
        customer_id: null,
        date_posted: null,
        collection_order_number: null,
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
      tripTicketData.value = item
      modeData.value = 'Edit'
      tripTicketDialog.value = true
    }

    onMounted(() => {
      initialize()
    })

    const redirectPrint = id => {
      window.open(
        `https://management-api-v1.herokuapp.com/print-trip-ticket/${id}`,
        '_blank',
      )
    }

    return {
      reload,
      statusColor,
      editItem,
      tripTicketData,
      createCollection,
      modeData,
      tripTicketDialog,
      mdiAccountEdit,
      mdiDeleteCircle,
      defaultItem,
      headers,
      search,
      tripTicketDatas,
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
  color: #009900 !important;
}
</style>
