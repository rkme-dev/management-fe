<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="stockRequests"
      sort-by="name"
      class="elevation-1"
      :search="search"
      :loading="loading"
      loading-text="Loading data ..."
    >
      <!-- TOP -->
      <template v-slot:top>
        <!-- TOOLBAR -->
        <v-toolbar flat>
          <v-toolbar-title>Stock Requests</v-toolbar-title>
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
            @click="create"
          >
            Create Stock Request
          </v-btn>
          <v-dialog
            v-model="stockRequestDialog"
            width="900px"
            fullscreen
            max-width="900px"
            max-height="900px"
            height="500px"
            transition="dialog-bottom-transition"
          >
            <stock-request-form
              :id="stockRequestId"
              :mode="mode"
              @cancel="cancel"
              @submit="submit"
            >
            </stock-request-form>
            here
          </v-dialog>
        </v-toolbar>
      </template>

      <!-- ACTIONS -->
      <template v-slot:item.actions="{ item }">
        <v-icon
          medium
          class="mr-2"
          @click="editItem(item)"
        >
          {{ icons.mdiPencilOutline }}
        </v-icon>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import {
  mdiPencilOutline,
} from '@mdi/js'
import StockRequestForm from './StockRequestForm.vue'

export default {
  name: 'StockRequestTable',
  components: {
    StockRequestForm,
  },
  data: () => ({
    mode: 'Edit',
    stockRequestDialog: false,
    stockRequestId: null,
    stockRequestData: {},
    headers: [
      {
        text: 'Date',
        align: 'start',
        sortable: true,
        value: 'date',
      },
      {
        text: 'Request No',
        sortable: true,
        value: 'code',
      },
      { text: 'Document', value: 'document.document_name' },
      { text: 'Location', value: 'location.description' },
      { text: 'Requested By', value: '' },
      { text: 'Status', value: 'status' },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    search: '',
    loading: false,
  }),
  computed: {
    stockRequests() {
      return this.$store.state.StockRequestStore.list.filter(stockRequestItems => stockRequestItems)
    },
  },
  created() {
    this.$store.dispatch('StockRequestStore/list')
  },
  methods: {
    create() {
      this.mode = 'Create'
      this.stockRequestDialog = true
      this.stockRequestId = null
    },
    editItem(id) {
      // TODO
      this.mode = 'Edit'
      this.stockRequestDialog = true
      this.stockRequestId = id
    },
    submit() {
      window.location.reload()
    },
    cancel() {
      this.stockRequestDialog = !this.stockRequestDialog
    },
  },
  setup() {
    return {
      icons: {
        mdiPencilOutline,
      },
    }
  },
}
</script>
