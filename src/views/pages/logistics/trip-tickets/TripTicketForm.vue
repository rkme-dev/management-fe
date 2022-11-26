<template>
  <v-card>
    <v-card-title class="pa-6">
      {{ mode }} Trip Ticket
    </v-card-title>
    <v-card-text>
      <v-form>
        <v-row>
          <v-col cols="12">
            <v-alert
              color="primary"
              text
              style="margin-bottom: -10px"
            >
              <div class="d-flex align-start">
                <v-icon color="primary">
                  {{ icons.mdiInformation }}
                </v-icon>
                <div class="ms-3">
                  <p class="text-base font-weight-medium mb-1">
                    Information
                  </p>
                </div>
              </div>
            </v-alert>
          </v-col>
        </v-row>
        <v-row v-if="loading">
          <v-col cols="12">
            <div class="text-center">
              <v-progress-circular
                :size="190"
                :width="7"
                color="primary"
                indeterminate
              ></v-progress-circular>
            </div>
          </v-col>
        </v-row>
        <v-row v-if="!loading">
          <v-col
            cols="6"
            class="pr-8 pl-8"
          >
            <v-menu
              v-model="formData.dateModal"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              :disabled="formData.status === 'In Transit'"
              max-width="290px"
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="datePosted"
                  label="Date"
                  persistent-hint
                  :prepend-icon="icons.mdiCalendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>

              <v-date-picker
                v-model="datePosted"
                no-title
                color="primary"
                @input="formData.dateModal = false"
              ></v-date-picker>
            </v-menu>
          </v-col>
          <v-col
            cols="3"
            class="pr-8 pl-8"
          >
            <v-text-field
              v-if="formData.id !== undefined"
              v-model="formData.trip_ticket_number"
              outlined
              readonly
              dense
              hide-details="auto"
              label="Trip Ticket Order Number"
            ></v-text-field>
          </v-col>
          <v-col
            cols="3"
            class="pr-8 pl-8"
          >
          </v-col>
          <v-col cols="4">
            <v-select
              v-model="formData.area"
              :items="areas"
              label="Area"
              :disabled="formData.status === 'In Transit' || modeData !== 'Create'"
              :error-messages="errors.area"
              outlined
              dense
              hide-details="auto"
              @change="areaChanged"
            >
            </v-select>
          </v-col>
          <v-col cols="1"></v-col>
          <v-col cols="4">
            <v-select
              v-model="formData.document_id"
              :items="documents"
              item-text="title"
              item-value="id"
              label="Document"
              :disabled="formData.status === 'In Transit'"
              :error-messages="errors.document_id"
              outlined
              dense
              hide-details="auto"
            ></v-select>
          </v-col>
          <v-col cols=""></v-col>
          <v-col cols="4">
            <v-text-field
              v-model="formData.driver"
              outlined
              :error-messages="errors.driver"
              dense
              :disabled="formData.status === 'In Transit'"
              hide-details="auto"
              label="Driver"
            ></v-text-field>
          </v-col>
          <v-col cols="1"></v-col>
          <v-col cols="6">
            <v-menu
              v-model="departedDateModal"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="auto"
            >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="formData.departed_date"
                label="Departure Date"
                persistent-hint
                :append-icon="icons.mdiCalendar"
                readonly
                outlined
                v-bind="attrs"
                v-on="on"
                :error-messages="errors.departed_date"
              ></v-text-field>
            </template>

            <v-date-picker
              v-model="formData.departed_date"
              no-title
              color="primary"
              @input="departedDateModal = false"
              :disabled="formData.status === 'In Transit'"
            ></v-date-picker>
          </v-menu>
          </v-col>
          <v-col cols="4">
            <v-text-field
              v-model="formData.assistant"
              outlined
              :disabled="formData.status === 'In Transit'"
              :error-messages="errors.assistant"
              dense
              hide-details="auto"
              label="Assistant"
            ></v-text-field>
          </v-col>
          <v-col cols="1"></v-col>
          <v-col cols="6">
            <v-menu
              v-model="departedTimeModal"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="formData.departed_time"
                  label="Departure Time"
                  persistent-hint
                  :append-icon="icons.mdiCalendarClock"
                  readonly
                  outlined
                  :error-messages="errors.departed_time"
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>

              <v-time-picker
                v-model="formData.departed_time"
                no-title
                format="ampm"
                color="primary"
                :disabled="formData.status === 'In Transit'"
                @input="departedTimeModal = false"
              ></v-time-picker>
            </v-menu>
          </v-col>
          <v-col cols="4">
            <v-text-field
              v-model="formData.truck"
              outlined
              :disabled="formData.status === 'In Transit'"
              :error-messages="errors.truck"
              dense
              hide-details="auto"
              label="Truck"
            ></v-text-field>
          </v-col>
          <v-col cols="1"></v-col>
          <v-col
            cols="6"
          >
            <v-textarea
              v-model="formData.remarks"
              outlined
              dense
              :disabled="formData.status === 'In Transit'"
              label="Remarks"
            ></v-textarea>
          </v-col>
          <v-col
            cols="4"
            class="mt-n16"
          >
            <v-text-field
              v-model="formData.plate_number"
              outlined
              :disabled="formData.status === 'In Transit'"
              :error-messages="errors.plate_number"
              dense
              hide-details="auto"
              label="Plate Number"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row
          v-if="formData.area"
          class="mt-8"
        >
          <v-col cols="12">
            <v-alert
              color="success"
              text
              style="margin-bottom: -10px"
            >
              <div class="d-flex align-start">
                <v-icon color="success">
                  {{ icons.mdiInformation }}
                </v-icon>
                <div class="ms-3">
                  <p class="text-base font-weight-medium mb-1">
                    Sales DR Items
                  </p>
                </div>
              </div>
            </v-alert>
          </v-col>
          <v-col cols="10"></v-col>
          <v-col
            cols="2"
            class="ml-n4"
          >
            <v-btn
              v-if="formData.status !== 'In Transit'"
              dense
              color="success"
              @click="drListDialog=true"
            >
              Add Sales DR Items
            </v-btn>
          </v-col>
          <v-col cols="12">
            <v-data-table
              :headers="headers"
              :items="selectedDrItems"
            >
            <template #item.date_posted="{ item }">
              {{ new Date(item.date_posted).toDateString() }} {{ new Date(item.date_posted).toLocaleTimeString() }}
            </template>
            <template #item.amount="{ item }">
              P{{ formatPrice(item.amount) }}
            </template>
            <template #item.remaining_balance="{ item }">
              P{{ formatPrice(item.remaining_balance) }}
            </template>
            </v-data-table>
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="auto"
            class="d-flex"
          >
            <v-btn
              v-if="selectedDrItems.length > 0 && formData.status !== 'In Transit'"
              color="primary"
              class="me-3 mt-4"
              @click="submit"
            >
              <v-icon>
                {{ icons.mdiContentSave }}
              </v-icon>
              {{ mode == 'Create' ? 'Create' : 'Update' }}
            </v-btn>
            <v-btn
              v-if="formData.status === 'For Transit'"
              color="success"
              class="me-3 mt-4"
              @click="updateToInTransit"
            >
              <v-icon>
                {{ icons.mdiFinance }}
              </v-icon>
              In Transit
            </v-btn>
            <v-btn
              v-if="formData.status === 'In Transit'"
              color="primary"
              class="me-3 mt-4"
              @click="updateToDelivered"
            >
              <v-icon>
                {{ icons.mdiFinance }}
              </v-icon>
              Delivered
            </v-btn>
            <v-btn
              outlined
              class="me-3 mt-4"
              type="reset"
              color="info"
              @click.prevent="cancel"
            >
              <v-icon>
                {{ icons.mdiProgressClose }}
              </v-icon>
              Close
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
      <v-dialog
        v-model="drListDialog"
        hide-overlay
        width="1100px"
        height="700px"
        transition="dialog-bottom-transition"
      >
        <v-card class="elevation-13">
          <v-card-text class="pa-10">
            <sales-dr-item-selection
              :id="formData.id"
              :area="formData.area"
              :selected-items="selectedDrItems"
              @cancel="drListDialog=false"
              @addOrUpdateItems="addOrUpdateItems"
            >
            </sales-dr-item-selection>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-card-text>
  </v-card>
</template>

<script>
import {
  computed, ref, toRef, onMounted, watch,
} from '@vue/composition-api'
import {
  mdiAccountPlusOutline, mdiCardOff, mdiCurrencySign,
  mdiInformation,
  mdiCalendar,
  mdiCalendarClock
} from '@mdi/js'
import store from '@/store'
import SalesDrItemSelection from './SalesDrItemSelection.vue'

export default {
  name: 'TripTicketForm',
  components: {
    SalesDrItemSelection,
  },
  props: {
    mode: {
      type: String,
      required: true,
      default: (() => 'Create'),
    },
    data: {
      type: Object,
      required: false,
      default: (() => ({
        area: null,
      })),
    },
  },
  setup(props, { emit }) {
    const areas = computed(() => store.state.SalesDrStore.areas)
    const errors = computed(() => store.state.TripTicketStore.errors)
    const dataProp = toRef(props, 'data')
    const departedDateModal = ref(false)
    const departedTimeModal = ref(false)

    const documents = computed(() => store.state.DocumentStore.documents.filter(documentItem => {
      if (documentItem.module === 'Trip-ticket') {
        documentItem.title = `${documentItem.document_name}`

        formData.value.document_id = documentItem.id

        return documentItem
      }
    }))
    const loading = computed(() => store.state.DocumentStore.loading)
    const drListDialog = ref(false)
    const formData = ref({
      area: null,
    })
    const selectedDrItems = ref([])
    const drItemsSelection = computed(() => store.state.TripTicketStore.items)
    const datePosted = ref(new Date().toISOString().substr(0, 10))
    const modeData = toRef(props, 'mode')

    const formatPrice = value => parseFloat(value)
      .toFixed(2)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')

    const headers = [
      {
        text: 'Date',
        align: 'start',
        sortable: false,
        value: 'date_posted',
      },
      { text: 'DR Number', value: 'sales_dr_number' },
      { text: 'Customer', value: 'customer.name' },
      { text: 'Area', value: 'area' },
      { text: 'Total Amount', value: 'amount' },
      { text: 'Remaining Balance', value: 'remaining_balance' },
    ]

    const reInitializeSelectedItem = () => {
      selectedDrItems.value = []
      console.log(drItemsSelection.value)
      // eslint-disable-next-line no-unused-expressions
      dataProp.value.sales_dr_items?.forEach(salesDr => {
        if (drItemsSelection.value.length === 0) {
          return
        }

        const exist = drItemsSelection.value?.find(itemSelection => itemSelection.id === salesDr.sales_dr_id)

        if (exist) {
          selectedDrItems.value.push(exist)
        }
      })
      selectedDrItems.value = getUnique(selectedDrItems.value, 'id')
    }

    const getUnique = (arr, key) => {
      return [...new Map(arr.map(item => [item[key], item])).values()]
    }

    const initialize = () => {
      formData.value = dataProp.value ?? formData.value

      formData.value.area = formData.value.area ?? ''

      if (dataProp.value.area && dataProp.value.id) {
        const data = {
          id: dataProp.value.id,
          area: dataProp.value.area,
        }

        store.dispatch('TripTicketStore/drItems', data)
        reInitializeSelectedItem()
      }
    }

    onMounted(async () => {
      initialize()
    })

    const cancel = () => {
      window.location.reload()
      // emit('submit')
    }

    const addOrUpdateItems = items => {
      selectedDrItems.value = items
      drListDialog.value = false
    }

    const submit = () => {
      const payload = formData.value
      payload.date_posted = datePosted.value
      payload.dr_items = selectedDrItems.value.map(item => item.id)

      if (modeData.value === 'Create') {
        store.dispatch('TripTicketStore/create', payload).then(
          response => {
            if (response.status === undefined) {
              emit('submit', response.data)
            }
          },
        )
      } else {
        store.dispatch('TripTicketStore/update', payload).then(
          response => {
            if (response.status === undefined) {
              emit('submit', response.data)
            }
          },
        )
      }
    }

    const areaChanged = () => {
      const data = {
        id: formData.value.id ?? 0,
        area: formData.value.area,
      }

      store.dispatch('TripTicketStore/drItems', data)
      selectedDrItems.value = []
    }

    const updateToInTransit = () => {
      store.dispatch('TripTicketStore/updateToInTransit', formData.value).then(
        response => {
          if (response.status === undefined) {
            emit('submit', response.data)
          }
        },
      )
    }

    const updateToDelivered = () => {
      store.dispatch('TripTicketStore/updateToDelivered', formData.value).then(
        response => {
          if (response.status === undefined) {
            emit('submit', response.data)
          }
        },
      )
    }

    watch(drItemsSelection, () => {
      reInitializeSelectedItem()
    })

    watch(dataProp, () => {
      initialize()
    })

    return {
      loading,
      modeData,
      areaChanged,
      addOrUpdateItems,
      areas,
      cancel,
      updateToInTransit,
      updateToDelivered,
      datePosted,
      documents,
      drListDialog,
      errors,
      formData,
      headers,
      departedDateModal,
      departedTimeModal,
      formatPrice,
      icons: {
        mdiInformation,
        mdiAccountPlusOutline,
        mdiCardOff,
        mdiCurrencySign,
        mdiCalendar,
        mdiCalendarClock
      },
      selectedDrItems,
      submit,
    }
  },
}
</script>

<style scoped>

</style>
