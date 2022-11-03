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
      <!-- active -->
      <template #[`item.active`]="{item}">
        <div class="d-flex justify-center">
          <v-chip
            small
            :class="`${statusColor[item.active]}--text`"
            class="v-chip-light-bg text-center"
          >
            {{ item.active }}
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
            <v-toolbar-title>Raw Materials</v-toolbar-title>
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
                  v-model="statusFilter"
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
            v-model="editDialog"
            fullscreen
            class="pa-16"
          >
            <raw-materials-with-unit-form
              :mode="mode"
              :row="editedItem"
              @submit="close"
            >
            </raw-materials-with-unit-form>
          </v-dialog>
          <v-btn
            color="primary"
            dark
            class="mb-2"
            @click.prevent="editItem({})"
          >
            New Raw Material
          </v-btn>
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
              @click.prevent="editItem(item)"
            >
              {{ icons.mdiAccountEdit }}
            </v-icon>
          </template>
          <span>Edit</span>
        </v-tooltip>

        <v-tooltip
          v-if="item.active === 'Active'"
          bottom
          color="primary"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              v-if="item.active === 'Active'"
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
import {
  mdiAccountEdit,
  mdiCancel,
} from '@mdi/js'
import {
  ref,
  watch,
} from '@vue/composition-api'
import RawMaterialsWithUnitForm from '@/views/pages/master-files/raw-materials/RawMaterialsWithUnitForm.vue'
import store from '@/store'

export default {
  name: 'RawMaterialsListTable',
  components: {
    RawMaterialsWithUnitForm,
  },
  setup() {
    const statusColor = {
      Active: 'success',
      Inactive: 'error',
    }

    const statusFilter = ref('')
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

    const search = ref()

    watch(statusFilter, () => {
      store.dispatch('RawMaterialStore/filter', statusFilter.value)
    })

    return {
      alert,
      statusFilter,
      statusOptions,
      icons: {
        mdiCancel,
        mdiAccountEdit,
      },
      search,
      statusColor,
    }
  },
  data: () => ({
    editDialog: false,
    alert: {
      message: '',
      type: 'success',
      show: false,
    },
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: 'ID',
        align: 'start',
        sortable: true,
        value: 'id',
      },
      { text: 'Name', value: 'name' },
      {
        text: 'Status', value: 'active', align: 'center', sortable: true,
      },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    editedIndex: -1,
    editedItem: {
      active: '',
      name: '',
      units: [],
      actions: '',
    },
    defaultItem: {
      name: '',
      active: '',
      units: [],
      actions: '',
    },
    mode: 'create',
  }),

  computed: {
    formTitle() {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.mode = this.editedIndex === -1 ? 'create' : 'edit'

      return this.editedIndex === -1 ? 'New Raw Material' : 'Edit Raw Material'
    },
    list() {
      return this.$store.state.RawMaterialStore.list
    },
    loading() {
      return this.$store.state.RawMaterialStore.loading
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
    this.$store.dispatch('RawMaterialStore/list')
    this.$store.dispatch('RawMaterialStore/removeErrors')
  },
  methods: {
    addOrUpdateClicked() {
      this.dialog = false
      this.editedItem = this.defaultItem
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
      this.editedItem = this.list[this.editedIndex]
      this.editDialog = true

      this.mode = item.id === undefined ? 'create' : 'edit'
    },

    deleteItem(item) {
      this.editedIndex = this.list.indexOf(item)
      this.editedItem = { ...item }
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      this.list[this.editedIndex].active = 0
      store.dispatch('RawMaterialStore/update', this.list[this.editedIndex]).then(
        response => {
          if (response.active === undefined) {
            store.dispatch('RawMaterialStore/list')
          }
        },
      )
      this.closeDelete()
    },

    close() {
      this.editDialog = false
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
