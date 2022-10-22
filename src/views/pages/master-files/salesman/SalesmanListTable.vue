<template>
  <div>
    <v-alert
      :type="alert.type"
      dismissible
      :value="alert.show"
    >
      {{ alert.message }}
    </v-alert>
    <v-data-table
      :headers="headers"
      :items="salesmans"
      :search="search"
      class="elevation-1 font-weight-light"
      :loading="loading"
      sort-by="name"
      fixed-header
    >
      <!-- is_active -->
      <template #[`item.is_active`]="{item}">
        <div class="d-flex justify-center">
          <v-chip
            small
            :class="`${statusColor[item.is_active]}--text`"
            class="v-chip-light-bg text-center"
          >
            {{ item.is_active }}
          </v-chip>
        </div>
      </template>
      <template v-slot:top>
        <v-toolbar
          flat
        >
          <v-col
            cols="12"
            offset-md="12"
            md="2"
          >
            <v-toolbar-title>Salesman</v-toolbar-title>
          </v-col>
          <v-divider
            class="mx-2"
            inset
            vertical
          ></v-divider>
          <v-card-text>
            <v-row>
              <v-col
                cols="4"
              >
                <v-text-field
                  v-model="search"
                  :append-icon="icons.mdiMagnify"
                  label="Search"
                  single-line
                  hide-details
                ></v-text-field>
              </v-col>
              <v-col
                cols="4"
                offset-md="4"
              >
                <v-select
                  v-model="filter"
                  dense
                  outlined
                  multiple
                  :prepend-inner-icon="icons.mdiHumanEdit"
                  item-text="title"
                  item-value="id"
                  label="Status"
                  :items="statusOptions"
                  hide-details="auto"
                ></v-select>
              </v-col>
            </v-row>
          </v-card-text>
          <v-dialog
            v-model="dialog"
            max-width="900px"
            max-height="900px"
            height="500px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="primary"
                dark
                class="mb-2"
                v-bind="attrs"
                v-on="on"
              >
                Create Salesman
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>
              <v-card-text>
                <salesman-form
                  :mode="mode"
                  :salesman="editedItem"
                  @clicked="dialog=false"
                ></salesman-form>
              </v-card-text>
            </v-card>
          </v-dialog>
          <v-dialog
            v-model="dialogDelete"
            max-width="500px"
          >
            <v-card>
              <v-card-title>
                Are you sure you want to deactivate this? ?
              </v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="error"
                  text
                  @click="closeDelete"
                >
                  Cancel
                </v-btn>
                <v-btn
                  color="success"
                  text
                  @click="deleteItemConfirm"
                >
                  OK
                </v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">

        <v-tooltip bottom color="primary">
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              medium
              class="mr-2"
              v-bind="attrs"
              v-on="on"
              @click="editItem(item)"
            >
              {{ icons.mdiAccountEdit }}
            </v-icon>
          </template>
          <span>Edit</span>
        </v-tooltip>

        <v-tooltip bottom color="primary" v-if="item.is_active === 'Active'">
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              v-if="item.is_active === 'Active'"
              small
              v-bind="attrs"
              v-on="on"
              @click="deleteItem(item)"
            >
              {{ icons.mdiCancel }}
            </v-icon>
          </template>
          <span>Deactivate</span>
        </v-tooltip>

      </template>
      <template v-slot:no-data>
        <v-btn
          color="primary"
        >
          Refresh
        </v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { mdiAccountEdit, mdiDeleteCircle, mdiCancel } from '@mdi/js'
import {
  ref,
  watch,
} from '@vue/composition-api'
import SalesmanForm from '@/views/pages/master-files/salesman/SalesmanForm.vue'
import store from '@/store'

export default {
  components: {
    SalesmanForm,
  },
  setup() {
    const statusColor = {
      Active: 'success',
      Inactive: 'error',
    }

    const search = ref()
    const filter = ref()
    const statusOptions = ref([
      {
        title: 'Active',
        id: 'Active',
      },
      {
        title: 'Inactive',
        id: 'Inactive',
      },
    ])

    watch(filter, value => {
      store.dispatch('SalesmanStore/filter', filter.value)
    })

    return {
      statusOptions,
      filter,
      alert,
      icons: {
        mdiAccountEdit,
        mdiDeleteCircle,
        mdiCancel,
      },
      search,
      statusColor,
    }
  },
  data: () => ({
    alert: {
      message: '',
      type: 'success',
      show: false,
    },
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: 'Salesman Code',
        align: 'start',
        sortable: true,
        value: 'salesman_code',
      },
      { text: 'Salesman Name', value: 'salesman_name' },
      { text: 'Quota', value: 'quota' },
      { text: 'Notes', value: 'notes', align: 'center' },
      {
        text: 'Status', value: 'is_active', align: 'center', sortable: true,
      },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    editedIndex: -1,
    editedItem: {
      code: '',
      description: '',
      days: '',
      is_active: '',
      actions: '',
      quota: null,
    },
    defaultItem: {
      code: '',
      quota: null,
      description: '',
      days: '',
      is_active: false,
      actions: '',
    },
    mode: 'create',
  }),

  computed: {
    formTitle() {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.mode = this.editedIndex === -1 ? 'create' : 'edit'

      return this.editedIndex === -1 ? 'New Salesman' : 'Edit Salesman'
    },
    salesmans() {
      return this.$store.state.SalesmanStore.salesmans
    },
    loading() {
      return this.$store.state.SalesmanStore.loading
    },
  },

  watch: {
    dialog(val) {
      return val || this.close()
    },
    dialogDelete(val) {
      return val || this.closeDelete()
    },
  },
  created() {
    this.$store.dispatch('SalesmanStore/list')
    this.$store.dispatch('SalesmanStore/removeErrors')
  },
  methods: {
    closeUserCreate(value) {
      this.dialog = false
      this.alert.message = value.alertMessage
      this.alert.type = value.alertType
      this.alert.show = true

      setTimeout(() => { this.alert.show = false }, 1500)
    },

    editItem(item) {
      this.editedIndex = this.salesmans.indexOf(item)
      this.editedItem = { ...item }
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.salesmans.indexOf(item)
      this.editedItem = { ...item }
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      this.salesmans[this.editedIndex].is_active = false
      store.dispatch('SalesmanStore/update', this.salesmans[this.editedIndex]).then(
        response => {
          if (response.status === undefined) {
            store.dispatch('SalesmanStore/list')
          }
        },
      )
      this.salesmans[this.editedIndex].is_active = 'Inactive'
      this.closeDelete()
    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = { ...this.defaultItem }
        this.editedIndex = -1
      })
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = { ...this.defaultItem }
        this.editedIndex = -1
      })
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.users[this.editedIndex], this.editedItem)
      } else {
        this.users.push(this.editedItem)
      }
      this.close()
    },
  },
}
</script>
