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
      :items="documents"
      :search="search"
      class="elevation-1 font-weight-light"
      sort-by="name"
      :loading="loading"
      fixed-header
      loading-text="Loading data ..."
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
            <v-toolbar-title>Documents</v-toolbar-title>
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
                Create Document
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>
              <v-card-text>
                <document-form
                  :mode="mode"
                  :document="editedItem"
                  @clicked="dialog=false"
                ></document-form>
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
        <v-tooltip
          bottom
          color="primary"
        >
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

        <v-tooltip
          v-if="item.is_active === 'Active'"
          bottom
          color="primary"
        >
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
  computed,
  ref,
  watch,
} from '@vue/composition-api'
import DocumentForm from '@/views/pages/master-files/documents/DocumentForm.vue'
import store from '@/store'
import { DocumentStore } from '@/store/DocumentStore'

export default {
  components: {
    DocumentForm,
  },
  setup() {
    const statusColor = {
      Active: 'success',
      Inactive: 'error',
    }
    store.dispatch('DocumentStore/list')

    const loading = computed(() => store.state.DocumentStore.loading)
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
      store.dispatch('DocumentStore/filter', filter.value)
    })

    return {
      loading,
      filter,
      statusOptions,
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
        text: 'Document',
        align: 'start',
        sortable: true,
        value: 'document_name',
      },
      { text: 'Description', value: 'description' },
      { text: 'Module', value: 'module', align: 'center' },
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
    },
    defaultItem: {
      code: '',
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

      return this.editedIndex === -1 ? 'New Document' : 'Edit Document'
    },
    documents() {
      return this.$store.state.DocumentStore.documents
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
    this.$store.dispatch('DocumentStore/removeErrors')
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
      this.editedIndex = this.documents.indexOf(item)
      this.editedItem = { ...item }
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.documents.indexOf(item)
      this.editedItem = { ...item }
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      this.documents[this.editedIndex].is_active = 'Inactive'
      this.$store.dispatch('DocumentStore/deleteDocument', this.documents[this.editedIndex])
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
