<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="roles"
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
            <v-toolbar-title>Roles</v-toolbar-title>
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

          <v-spacer></v-spacer>
          <v-dialog
            v-model="dialog"
            max-width="800px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="primary"
                dark
                class="mb-2"
                v-bind="attrs"
                v-on="on"
              >
                Create Role
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>
              <v-card-text>
                <role-form
                  :role="editedItem"
                  @clicked="dialog=false"
                ></role-form>
              </v-card-text>
            </v-card>
          </v-dialog>
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
        <v-icon
          medium
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
import { mdiAccountEdit, mdiDeleteCircle, mdiMagnify } from '@mdi/js'
import RoleForm from '@/views/pages/user-access-management/roles/RoleForm.vue'
import { ref } from '@vue/composition-api'

export default {
  components: {
    RoleForm,
  },
  setup() {
    const search = ref('')

    return {
      icons: {
        mdiAccountEdit,
        mdiDeleteCircle,
        mdiMagnify,
      },
      search,
    }
  },
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: 'Title',
        align: 'start',
        sortable: true,
        value: 'title',
      },
      { text: 'Value', value: 'name' },
      { text: 'Date Created', value: 'created_at' },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    editedIndex: -1,
    editedItem: {
      abilities: [],
      title: '',
      name: '',
      scope: '',
      date_created: '',
      actions: '',
    },
    defaultItem: {
      abilities: [],
      title: '',
      name: '',
      scope: '',
      date_created: '',
      actions: '',
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New Role' : 'Edit Role'
    },
    roles() {
      return this.$store.state.UserAccessManagementStore.roles
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
    this.$store.dispatch('UserAccessManagementStore/getRoles')
  },
  methods: {
    editItem(item) {
      this.editedIndex = this.roles.indexOf(item)
      this.editedItem = { ...item }
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.roles.indexOf(item)
      this.editedItem = { ...item }
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      this.$store.dispatch('UserAccessManagementStore/deleteRole', this.roles[this.editedIndex])
      this.roles.splice(this.editedIndex, 1)
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
        Object.assign(this.roles[this.editedIndex], this.editedItem)
      } else {
        this.roles.push(this.editedItem)
      }
      this.close()
    },
  },
}
</script>
