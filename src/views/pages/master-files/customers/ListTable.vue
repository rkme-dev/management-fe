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
      :items="list"
      :search="search"
      class="elevation-1 font-weight-light"
      :loading="loading"
      sort-by="name"
      fixed-header
    >
      <!-- is_active -->
      <template #[`item.status`]="{item}">
        <div class="d-flex justify-center">
          <v-chip
            small
            :class="`${statusColor[item.status]}--text`"
            class="v-chip-light-bg text-center"
          >
            {{ item.status }}
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
            <v-toolbar-title>Customers</v-toolbar-title>
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
            width="900px"
            fullscreen
            max-width="900px"
            max-height="900px"
            height="500px"
            transition="dialog-bottom-transition"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="primary"
                dark
                class="mb-2"
                v-bind="attrs"
                v-on="on"
              >
                New Customer
              </v-btn>
            </template>
            <v-card class="elevation-13">
              <customer-form
                :mode="mode"
                :data="editedItem"
                @submit="closeModal"
                @clicked="dialog=false"
              ></customer-form>
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
        <v-icon
          medium
          class="mr-2"
          @click="editItem(item)"
        >
          {{ icons.mdiAccountEdit }}
        </v-icon>
        <v-icon
          v-if="item.is_active === true"
          small
          @click="deleteItem(item)"
        >
          {{ icons.mdiDeleteCircle }}
        </v-icon>
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
import { mdiAccountEdit, mdiDeleteCircle } from '@mdi/js'
import {
  ref,
  watch,
} from '@vue/composition-api'
import CustomerForm from '@/views/pages/master-files/customers/CustomerForm.vue'
import store from '@/store'

export default {
  components: {
    CustomerForm,
  },
  setup() {
    const statusColor = {
      Active: 'success',
      Inactive: 'info',
      'Bad Account': 'error',
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

    watch(filter, () => {
      store.dispatch('CustomerStore/filter', filter.value)
    })

    return {
      statusOptions,
      filter,
      icons: {
        mdiAccountEdit,
        mdiDeleteCircle,
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
        text: 'Code',
        align: 'start',
        sortable: true,
        value: 'code',
      },
      { text: 'Name', value: 'name' },
      { text: 'Type', value: 'type', align: 'center' },
      { text: 'Area', value: 'area', align: 'center' },
      {
        text: 'Status', value: 'status', align: 'center', sortable: true,
      },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    editedIndex: -1,
    editedItem: {
      code: '',
      description: '',
      days: '',
      is_active: '',
      is_bad_account: '',
      actions: '',
    },
    defaultItem: {
      code: '',
      description: '',
      days: '',
      is_active: false,
      is_bad_account: '',
      actions: '',
    },
    mode: 'Create',
  }),

  computed: {
    formTitle() {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.mode = this.editedIndex === -1 ? 'Create' : 'Edit'

      return this.editedIndex === -1 ? 'New Customer' : 'Edit Customer'
    },
    list() {
      return this.$store.state.CustomerStore.list
    },
    loading() {
      return this.$store.state.CustomerStore.loading
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
    this.$store.dispatch('CustomerStore/list')
    this.$store.dispatch('CustomerStore/removeErrors')
  },
  methods: {
    closeModal() {
      this.dialog = false
      this.editedItem = {}
      this.editedIndex = -1
      this.mode = 'Create'
    },
    closeUserCreate(value) {
      this.dialog = false
      this.alert.message = value.alertMessage
      this.alert.type = value.alertType
      this.alert.show = true

      setTimeout(() => { this.alert.show = false }, 1500)
    },

    editItem(item) {
      this.editedIndex = this.list.indexOf(item)
      this.mode = 'Edit'
      this.editedItem = { ...item }
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.list.indexOf(item)
      this.editedItem = { ...item }
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      this.list[this.editedIndex].is_active = false
      store.dispatch('CustomerStore/update', this.list[this.editedIndex]).then(
        response => {
          if (response.status === undefined) {
            store.dispatch('CustomerStore/list')
          }
        },
      )
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
