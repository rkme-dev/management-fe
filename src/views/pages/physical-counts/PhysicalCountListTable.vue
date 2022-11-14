<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="physicalCounts"
      sort-by="name"
      class="elevation-1"
      :search="search"
      :loading="loading"
    >
      <template #item.status="{ item }">
        <span v-if="item.status === 'posted'">Posted</span>
        <span v-else-if="item.status === 'cancelled'">Cancelled</span>
        <span v-else>For Review</span>
      </template>
      <template #item.created_at="{ item }">
        {{ dateFormat1(item.created_at) }}
      </template>
      <template #item.amount="{ item }">
        <v-currency-field
          v-model="item.amount"
          prefix="PHP"
          class="text-green"
          disabled
        >
        </v-currency-field>
      </template>
      <template v-slot:top>
        <v-toolbar
          color="teal"
          outlined
        >
          <v-toolbar-title>Physical Counts</v-toolbar-title>
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
            class="mr-16 mb-4"
          ></v-text-field>
          <v-switch
            v-model="showPosted"
            label="Display Posted"
            class="mb-n4 mr-16"
          ></v-switch>
          <v-btn
            color="primary"
            dark
            class="mb-2 mr-10"
            @click="createPhysicalCount"
          >
            Add New Physical Count
          </v-btn>
          <v-dialog
            v-model="physicalCountDialog"
            width="900px"
            fullscreen
            max-width="900px"
            max-height="900px"
            height="500px"
            transition="dialog-bottom-transition"
          >
            <PhysicalCountForm
              :mode="modeData"
              :data="physicalCount"
              @submit="initialize"
            />
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
import { mdiAccountEdit, mdiDeleteCircle, mdiPrinter } from '@mdi/js'
import {
  ref, computed, onMounted,
} from '@vue/composition-api'
import store from '@/store'
import { dateFormat1 } from '@/utils/time'
import PhysicalCountForm from './PhysicalCountForm.vue'

export default {
  components: {
    PhysicalCountForm,
  },
  setup() {
    store.dispatch('FinishProductStore/list')
    const showPosted = ref(false)
    const modeData = ref('Create')
    const physicalCountDialog = ref(false)
    const search = ref('')
    const headers = ref([
      {
        text: 'Date',
        align: 'start',
        sortable: false,
        value: 'created_at',
      },
      { text: 'Document', value: 'document.document_name' },
      { text: 'Location', value: 'location.location_code' },
      { text: 'Count By', value: 'count_by' },
      { text: 'Status', value: 'status' },
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
    const physicalCount = ref({
      dateModal: false,
      countDateModal: false,
      date_posted: null,
      document_id: null,
      location_id: null,
      group_1: null,
      group_2: null,
      remarks: null,
      count_by: null,
      count_date: null,
      account_title: null,
    })

    const physicalCounts = computed(() => store.state.PhysicalCountStore.list.filter(physicalCount => {
      if (showPosted.value === false && physicalCount.status !== 'posted') {
        return physicalCount
      }

      if (showPosted.value === true) {
        return physicalCount
      }
    }))

    const errors = computed(() => store.getters.errors)
    const loading = computed(() => store.state.PhysicalCountStore.loading)

    const initialize = () => {
      physicalCountDialog.value = false
      store.dispatch('PhysicalCountStore/list')
    }

    const createPhysicalCount = () => {
      modeData.value = 'Create'
      physicalCountDialog.value = true
      physicalCount.value = {
        dateModal: false,
        countDateModal: false,
        date_posted: null,
        document_id: null,
        location_id: null,
        group_1: null,
        group_2: null,
        remarks: null,
        count_by: null,
        count_date: null,
        account_title: null,
      }
    }

    const editItem = item => {
      physicalCount.value = item
      modeData.value = 'Edit'
      physicalCountDialog.value = true
    }

    onMounted(() => {
      initialize()
    })

    return {
      showPosted,
      editItem,
      physicalCount,
      createPhysicalCount,
      modeData,
      physicalCountDialog,
      mdiAccountEdit,
      mdiDeleteCircle,
      mdiPrinter,
      defaultItem,
      headers,
      search,
      physicalCounts,
      errors,
      initialize,
      loading,
      dateFormat1,
      icons: {
        mdiAccountEdit,
        mdiDeleteCircle,
      }, 
    }
  },
}
</script>
<style>
.text-green input {
  color: chartreuse !important;
}

</style>
