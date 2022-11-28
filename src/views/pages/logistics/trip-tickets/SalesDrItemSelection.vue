<template>
  <v-form>
    <v-row>
      <v-col cols="12">
        <v-data-table
          v-model="selectedDrItems"
          show-select
          :loading="loading"
          :items="salesDrItems"
          :headers="headers"
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
      <v-col
        cols="auto"
        class="d-flex"
      >
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
        <v-btn
          outlined
          class="me-3 mt-4"
          type="reset"
          color="success"
          @click.prevent="addOrUpdateItems"
        >
          <v-icon>
            {{ icons.mdiTimelineCheck }}
          </v-icon>
          Submit
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import store from '@/store'
import {
  watch,
  onMounted,
  computed,
  toRef,
  ref,
} from '@vue/composition-api/dist/vue-composition-api'
import { mdiProgressClose, mdiTimelineCheck } from '@mdi/js'
import { consoleError } from 'vuetify/lib/util/console'

export default {
  name: 'SalesDrItemSelectionVue',
  props: {
    area: {
      type: String,
      required: true,
      default: null,
    },
    id: {
      type: Number,
      required: false,
      default: null,
    },
    selectedItems: {
      type: Array,
      required: true,
      default: (() => []),
    },
  },
  setup(props, { emit }) {
    const tripTicketId = toRef(props, 'id')
    const areaData = toRef(props, 'area')
    const selectedItemsProp = toRef(props, 'selectedItems')
    const selectedDrItems = ref([])
    const loading = computed(() => store.state.TripTicketStore.loading)
    const salesDrItems = computed(() => store.state.TripTicketStore.items)

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

    const data = ref({
      id: tripTicketId.value ?? 0,
      area: areaData.value,
    })

    const initialize = () => {
      store.dispatch('TripTicketStore/drItems', data.value)
      // store.dispatch('SalesDrStore/getUnlinkItems', data.value)
    }

    onMounted(async () => {
      if (selectedItemsProp.value.length > 0) {
        selectedDrItems.value = selectedItemsProp.value
      }

      initialize(data.value)
    })

    watch(areaData, () => {
      // store.dispatch('SalesDrStore/getUnlinkItems', data.value)
    })

    const cancel = () => {
      emit('cancel')
    }

    const addOrUpdateItems = () => {
      emit('addOrUpdateItems', selectedDrItems.value)
    }
    const formatPrice = value => parseFloat(value)
      .toFixed(2)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')

    return {
      loading,
      addOrUpdateItems,
      cancel,
      icons: {
        mdiProgressClose,
        mdiTimelineCheck,
      },
      selectedDrItems,
      salesDrItems,
      headers,
      formatPrice
    }
  },
}
</script>

<style scoped>

</style>
