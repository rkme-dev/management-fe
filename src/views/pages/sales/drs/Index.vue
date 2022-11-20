<template>
  <v-card id="sales-orders-list-card">
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
        <sales-order-list></sales-order-list>
      </v-tab-item>
      <v-tab-item>
        <dr-list-table></dr-list-table>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>
<script>
import { ref } from '@vue/composition-api/dist/vue-composition-api'
import {
  mdiTagPlus, mdiViewList,
} from '@mdi/js'
import DrListTable from './DrsListTable.vue'
import SalesOrderList from './components/SalesOrderList.vue'

export default {
  components: {
    DrListTable,
    SalesOrderList,
  },
  setup() {
    const tab = ref('')

    const tabs = [
      { title: 'Sales Order Pending For DR', icon: mdiTagPlus },
      { title: 'Sales DR', icon: mdiViewList },
    ]

    return {
      tab,
      tabs,
    }
  },
}
</script>
