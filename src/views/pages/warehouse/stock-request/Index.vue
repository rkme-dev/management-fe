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
    </v-tabs-items>
  </v-card>
</template>

<script>
import { ref } from '@vue/composition-api/dist/vue-composition-api'
import {
  mdiBottleSodaClassicOutline,
  mdiBottleSodaClassic,
} from '@mdi/js'
import StockRequestTable from './BlownBottles/StockRequestTable.vue'

export default {
  components: {
    StockRequestTable,
  },
  setup() {
    const tab = ref('')

    const tabs = [
      { title: 'Blown Bottles', icon: mdiBottleSodaClassicOutline },
      { title: 'Bottle Filling', icon: mdiBottleSodaClassic },
    ]

    return {
      tab,
      tabs,
    }
  },
}
</script>
