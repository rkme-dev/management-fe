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
      :items="users"
      :search="search"
      class="elevation-1 font-weight-light"
      :loading="loading"
      sort-by="name"
      fixed-header
    >
      <!-- status -->
      <template #[`item.status`]="{item}">
        <div class="d-flex justify-center">
          <v-chip
            small
            :class="`${statusColor[item.status]}--text`"
            class="v-chip-light-bg text-center"
          >
            {{ item.status.toUpperCase() }}
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
            <v-toolbar-title>Users</v-toolbar-title>
          </v-col>
          <v-divider
            class="mx-2"
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
          <router-link :to="{ name: 'user-create' }">
            <v-btn
              color="primary"
              dark
              class="mb-2"
            >
              Create User
            </v-btn>
          </router-link>
          <v-dialog
            v-model="dialogDelete"
            max-width="500px"
          >
            <v-card>
              <v-card-title>
                Are you sure you want to delete this item?
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
        <!--      <v-icon-->
        <!--        small-->
        <!--        @click="deleteItem(item)"-->
        <!--      >-->
        <!--        {{ icons.mdiDeleteCircle }}-->
        <!--      </v-icon>-->
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
import { ref } from '@vue/composition-api'

export default {
  setup() {
    const statusColor = {
      Active: 'success',
      Pending: 'info',
      Deleted: 'error',
      Deactivated: 'warning',
      Inactive: 'grey',
    }

    const search = ref()

    return {
      alert,
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
        text: 'Name',
        align: 'start',
        sortable: true,
        value: 'name',
      },
      { text: 'Email', value: 'email' },
      { text: 'Status', value: 'status', align: 'center' },
      { text: 'Role', value: 'role' },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    editedIndex: -1,
    editedItem: {
      name: '',
      email: '',
      status: '',
      date_created: '',
      actions: '',
    },
    defaultItem: {
      name: '',
      email: '',
      status: '',
      date_created: '',
      actions: '',
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New User' : 'Edit User'
    },
    users() {
      return this.$store.state.UserAccessManagementStore.users
    },
    loading() {
      return this.$store.state.UserAccessManagementStore.loading
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
    this.$store.dispatch('UserAccessManagementStore/getUsers')
    this.$store.dispatch('UserAccessManagementStore/removeErrors')
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
      this.$router.push(`users/${item.id}`)
    },

    deleteItem(item) {
      this.editedIndex = this.users.indexOf(item)
      this.editedItem = { ...item }
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      this.users.splice(this.editedIndex, 1)
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
