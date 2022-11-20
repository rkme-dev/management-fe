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
    const loading = computed(() => store.state.SalesDrStore.loading)
    const salesDrItems = computed(() => store.state.SalesDrStore.items)
    const headers = [
      {
        text: 'Date',
        align: 'start',
        sortable: false,
        value: 'sales_dr_item.sales_dr.date_posted',
      },
      { text: 'DR Number', value: 'sales_dr_item.sales_dr.sales_dr_number' },
      { text: 'Customer', value: 'sales_dr_item.sales_dr.customer.name' },
      { text: 'Area', value: 'sales_dr_item.sales_dr.area' },
      { text: 'Item Name', value: 'product.name' },
      { text: 'Quantity', value: 'quantity' },
      { text: 'Unit', value: 'unit' },
    ]

    const data = ref({
      area: areaData.value,
      id: tripTicketId.value,
    })

    const initialize = () => {
      store.dispatch('SalesDrStore/getUnlinkItems', data.value)
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
    }
  },
}
</script>

<style scoped>

</style>
