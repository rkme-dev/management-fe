<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="releaseOrders"
      :search="search"
      sort-by="title"
      class="elevation-1"
      fixed-header
      :loading="loading"
    >
      <template v-slot:top>
        <v-toolbar
          flat
        >
          <v-col
            cols="12"
            offset-md="12"
            md="2"
          >
            <v-toolbar-title>
              Release Orders
            </v-toolbar-title>
          </v-col>
          <v-divider
            class="mx-4"
            inset
            vertical
          ></v-divider>
          <v-card-text>
            <v-row>
              <v-col
                cols="8"
                offset-md="8"
                md="4"
              >
                <v-text-field
                  v-model="search"
                  :append-icon="icons.mdiMagnify"
                  label="Search"
                  single-line
                  hide-details
                ></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
          <router-link to="/raw-materials-release/create">
            <v-btn
              color="primary"
              dark
              class="mb-2"
            >
              Raw Materials Release Request
            </v-btn>
          </router-link>
        </v-toolbar>
      </template>
      <!-- status -->
      <template #[`item.status`]="{item}">
        <v-chip
          small
          :class="`${statusColor[item.status]}--text`"
          class="v-chip-light-bg"
        >
          {{ status[item.status] }}
        </v-chip>
      </template>
      <template v-slot:no-data>
        <v-btn
          color="primary"
        >
          Refresh
        </v-btn>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon
          small
          class="mr-2"
          @click="editItem(item)"
        >
          {{ icons.mdiAccountEdit }}
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
import {
  mdiAccountEdit,
  mdiDeleteCircle,
  mdiEyeCircle,
  mdiMagnify,
} from '@mdi/js'
import AbilityForm from '@/views/pages/user-access-management/abilities/AbilityForm.vue'
import { ref } from '@vue/composition-api'

export default {
  components: {
    AbilityForm,
  },
  setup() {
    const search = ref()

    const statusColor = {
      /* eslint-disable key-spacing */
      pending_request: 'info',
      released: 'success',
      received: 'primary',
      cancelled: 'error',
      Applied: 'info',
      /* eslint-enable key-spacing */
    }

    const status = {
      pending_request: 'Pending',
      released: 'Released',
      received: 'Received',
      cancelled: 'Cancelled',
    }

    const titleCase = s => s.replace(/^[-_]*(.)/, (_, c) => c.toUpperCase())
      .replace(/[-_]+(.)/g, (_, c) => ` ${c.toUpperCase()}`)

    return {
      titleCase,
      icons: {
        mdiAccountEdit,
        mdiDeleteCircle,
        mdiEyeCircle,
        mdiMagnify,
      },
      status,
      search,
      statusColor,
    }
  },
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: '#',
        sortable: true,
        value: 'id',
      },
      { text: 'Status', value: 'status' },
      { text: 'Prepared By', value: 'created_by' },
      { text: 'Released By', value: 'released_by' },
      { text: 'Date Created', value: 'created_at' },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    editedIndex: -1,
    editedItem: {
      id: 0,
      title: '',
      name: '',
      action: '',
      module: '',
      is_disabled: false,
    },
    defaultItem: {
      id: 0,
      title: '',
      name: '',
      action: '',
      module: '',
      is_disabled: false,
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New Release Order ' : 'Edit Release Order'
    },
    releaseOrders() {
      return this.$store.state.ReleaseOrderStore.releaseOrders
    },
    loading() {
      return this.$store.state.ReleaseOrderStore.loading
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
    this.$store.dispatch('ReleaseOrderStore/getReleaseOrders')
  },

  methods: {
    editItem(item) {
      this.$router.push(`raw-materials-release/edit/${item.id}`)
    },

    deleteItem(item) {
      this.editedIndex = this.abilities.indexOf(item)
      this.editedItem = { ...item }
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      this.$store.dispatch('UserAccessManagementStore/deleteAbility', this.abilities[this.editedIndex])
      this.abilities.splice(this.editedIndex, 1)
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
        Object.assign(this.abilities[this.editedIndex], this.editedItem)
      } else {
        this.abilities.push(this.editedItem)
      }
      this.close()
    },
  },
}
</script>
