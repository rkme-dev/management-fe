<template>
  <v-card id="stock-requests">
    <v-tabs
      v-model="tab"
      show-arrows
    >
      <v-tab
        v-for="tab in tabs"
        :key="tab.icon"
      >
        <v-icon
          size="20"
          class="me-3"
        >
          {{ tab.icon }}
        </v-icon>
        <span>{{ tab.title }}</span>
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <stock-request-table />
      </v-tab-item>

      <v-tab-item>
        <bottle-fillings-table />
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import { ref, watch } from '@vue/composition-api/dist/vue-composition-api'
import {
  mdiBottleSodaClassicOutline,
  mdiBottleSodaClassic,
} from '@mdi/js'
import store from '@/store'
import StockRequestTable from './BlownBottles/StockRequestTable.vue'
import BottleFillingsTable from './BottleFillings/BottleFillingsTable.vue'

export default {
  components: {
    StockRequestTable,
    BottleFillingsTable,
  },
  setup() {
    const tab = ref('')

    const tabs = [
      { title: 'Blown Bottles', icon: mdiBottleSodaClassicOutline },
      { title: 'Bottle Filling', icon: mdiBottleSodaClassic },
    ]

    watch(tab, () => {
      if (tab.value === 1) {
        store.dispatch('StockRequestStore/list', {
          todayOnly: false,
          type: 'Bottle Filling',
        })
      } else {
        store.dispatch('StockRequestStore/list', {
          todayOnly: false,
          type: 'Bottle Blowing',
        })
      }
    })

    return {
      tab,
      tabs,
    }
  },
}
</script>
