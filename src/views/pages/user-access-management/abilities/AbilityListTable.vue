<template>
  <v-data-table
    :headers="headers"
    :items="abilities"
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
        <v-toolbar
          flat
        >
          <v-col
            cols="12"
            offset-md="12"
            md="2"
          >
            <v-toolbar-title>Abilities</v-toolbar-title>
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
          <v-dialog
            v-model="dialog"
            max-width="500px"
          >
            <template v-slot:activator="{ on, attrs }">
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <ability-form
                  :id-prop="editedItem.id"
                  :action-prop="editedItem.action"
                  :module-prop="editedItem.module"
                  :is-disabled-prop="editedItem.is_disabled"
                  :title-prop="editedItem.title"
                  @closeForm="close()"
                ></ability-form>
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
      </v-toolbar>
    </template>
    <template v-slot:no-data>
      <v-btn
        color="primary"
      >
        Refresh
      </v-btn>
    </template>
  </v-data-table>
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

    return {
      icons: {
        mdiAccountEdit,
        mdiDeleteCircle,
        mdiEyeCircle,
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
      { text: 'Module', value: 'module' },
      { text: 'Action', value: 'action' },
      { text: 'Value', value: 'name' },
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
      return this.editedIndex === -1 ? 'New Ability' : 'Edit Ability'
    },
    abilities() {
      return this.$store.state.UserAccessManagementStore.abilities
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
    this.$store.dispatch('UserAccessManagementStore/getAbilities')
  },

  methods: {
    editItem(item) {
      this.editedIndex = this.abilities.indexOf(item)
      this.editedItem = { ...item }
      this.dialog = true
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
