<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="customers"
      sort-by="name"
      class="elevation-1"
      :search="search"
      :loading="loading"
    >
      <template #item.name="{ item }">
        <router-link :to="{ name: 'sales-client', params: { id: item.id } }">
          {{ item.name }}
        </router-link>
      </template>
      <template v-slot:top>
        <v-toolbar
          color="teal"
          outlined
        >
          <v-toolbar-title>Clients</v-toolbar-title>
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
          <router-link :to="{ name: 'create-sales-client' }">
            <v-btn
              color="primary"
              dark
              class="mb-2"
            >
              Add New Client
            </v-btn>
          </router-link>
          <v-dialog
            v-model="dialogDelete"
            max-width="500px"
          >
            <v-card>
              <v-card-title class="text-h3">
                Are you sure you want to delete this client?
              </v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="closeDelete"
                >
                  Cancel
                </v-btn>
                <v-btn
                  color="blue darken-1"
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
        <router-link :to="{ name: 'update-sales-client', params: { id: item.id } }">
          <v-icon
            small
            class="mr-2"
          >
            {{ mdiAccountEdit }}
          </v-icon>
        </router-link>
        <v-icon
          small
          @click="deleteItem(item)"
        >
          {{ mdiDeleteCircle }}
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
import { mdiAccountEdit, mdiDeleteCircle } from '@mdi/js'
import {
  GET_CUSTOMERS,
  REMOVE_CUSTOMER,
} from '@/store/actions.type'
import {
  ref, nextTick, computed, onMounted,
} from '@vue/composition-api'
import store from '@/store'

export default {
  setup() {
    const search = ref('')
    const dialogDelete = ref(false)
    const headers = ref([
      {
        text: 'Name',
        align: 'start',
        sortable: false,
        value: 'name',
      },
      { text: 'Contact Person', value: 'contact_person' },
      { text: 'Email', value: 'email' },
      { text: 'Tin', value: 'tin' },
      { text: 'Contact Number', value: 'contact_no' },
      { text: 'Actions', value: 'actions', sortable: false },
    ])

    const defaultItem = ref({
      name: '',
      contact_person: '',
      email: '',
      tin: '',
      contact_no: '',
      delivery_address: '',
    })
    const deletedIndex = ref(-1)
    const deletedItem = ref({
      name: '',
      contact_person: '',
      email: '',
      tin: '',
      contact_no: '',
      delivery_address: '',
    })

    const customers = computed(() => store.getters.customers)
    const customer = computed(() => store.getters.customer)
    const errors = computed(() => store.getters.errors)
    const loading = computed(() => store.getters.loading)

    const initialize = () => {
      store.dispatch(GET_CUSTOMERS)
    }

    const deleteItem = item => {
      deletedIndex.value = customers.value.indexOf(item)
      deletedItem.value = { ...item }
      dialogDelete.value = true
    }

    const deleteItemConfirm = () => {
      store.dispatch(REMOVE_CUSTOMER, deletedItem.value).then(() => {
        customers.value.splice(deletedIndex.value, 1)
        closeDelete()
      })
    }

    const closeDelete = () => {
      dialogDelete.value = false
      nextTick(() => {
        deletedItem.value = { ...defaultItem.value }
        deletedIndex.value = -1
      })
    }

    onMounted(() => {
      initialize()
    })

    return {
      mdiAccountEdit,
      mdiDeleteCircle,
      defaultItem,
      headers,
      dialogDelete,
      search,
      customers,
      customer,
      errors,
      deleteItem,
      deleteItemConfirm,
      close,
      closeDelete,
      initialize,
      deletedItem,
      deletedIndex,
      loading,
    }
  },
}
</script>
