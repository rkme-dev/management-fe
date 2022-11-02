<template>
  <v-card id="deposit-list">
      <v-data-table
          :headers="headers"
          :items="deposits"
          sort-by="name"
          class="elevation-1"
          :search="search"
          :loading="loading"
      >
        <template #item.created_at="{ item }">
          {{ dateFormat1(item.created_at) }}
        </template>
        <template #item.amount="{ item }">
          <v-currency-field
              prefix="PHP"
              class="text-green"
              v-model="item.amount"
              disabled
          >
          </v-currency-field>
        </template>
        <template v-slot:top>
          <v-toolbar
              color="teal"
              outlined
          >
            <v-toolbar-title>Bounced Checks</v-toolbar-title>
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
                @click="toggleCreateModal"
            >
              Create Bounced Checks
            </v-btn>
            <v-dialog
                v-model="depositCreateDialog"
                fullscreen
                transition="dialog-bottom-transition"
                persistent
            >
              <create-bounced-deposit-form @onSubmit="toggleCreateModal"></create-bounced-deposit-form>
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
              v-if="item.is_active === 'Active'"
              small
              @click="deleteItem(item)"
          >
            {{ icons.mdiDeleteCircle }}
          </v-icon>
        </template>
      </v-data-table>
  </v-card>
</template>
<script>

import {ref} from "@vue/composition-api/dist/vue-composition-api";
import {computed} from "@vue/composition-api";
import store from "@/store";
import {
  mdiAccountEdit,
  mdiDeleteCircle,
} from "@mdi/js";
import CreateBouncedDepositForm from './CreateBouncedDepositForm.vue'
import { dateFormat1 } from '@/utils/time'
import router from "@/router";

export default {
  components : {
    CreateBouncedDepositForm,
  },
  setup() {
    store.dispatch('BouncedDepositStore/list')

    const depositCreateDialog = ref(false)
    const search = ref('')
    const deposits = computed(() => store.state.BouncedDepositStore.list)
    const loading = computed(() => store.state.BouncedDepositStore.loading)
    const headers = [
      {
        text: 'Date',
        align: 'start',
        sortable: false,
        value: 'created_at',
      },
      { text: 'Bounced No', value: 'bounced_number' },
      { text: 'Document', value: 'document.document_name' },
      { text: 'Account', value: 'account.account_title' },
      { text: 'Amount', value: 'amount' },
      { text: 'Status', value: 'status' },
      { text: 'Actions', value: 'actions', sortable: false },
    ]

    const deleteItem = () => {
    }

    const editItem = (data) => {
        router.push('/bounced-deposits/' + data.id)
    }

    const toggleCreateModal = () => {
      store.dispatch('BouncedDepositStore/list')
      depositCreateDialog.value = !depositCreateDialog.value
    }

    return {
      icons: {
        mdiAccountEdit,
        mdiDeleteCircle,
      },
      dateFormat1,
      deleteItem,
      depositCreateDialog,
      editItem,
      headers,
      deposits,
      search,
      loading,
      toggleCreateModal,
    }
  },
}
</script>
