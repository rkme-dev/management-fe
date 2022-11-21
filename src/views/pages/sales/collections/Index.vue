<template>
  <v-card id="sales-orders-list-card">
    <v-tabs
      v-model="tab"
      show-arrows
      grow
    >
      <v-tab
        v-for="tab in tabs"
        :key="tab.icon"
      >
        <v-icon
          size="25"
          class="me-3"
        >
          {{ tab.icon }}
        </v-icon>
        <span>{{ tab.title }}</span>
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item>
        <sales-dr-selection-table></sales-dr-selection-table>
      </v-tab-item>
      <v-tab-item>
        <CollectionListTable></CollectionListTable>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>
<script>
import CollectionListTable from '@/views/pages/sales/collections/CollectionListTable.vue'
import { ref } from '@vue/composition-api/dist/vue-composition-api'
import { mdiTagPlus, mdiViewList } from '@mdi/js'
import SalesDrSelectionTable from './components/SalesDrSelectionTable.vue'

export default {
  components: { SalesDrSelectionTable, CollectionListTable },
  CollectionListTable: {
    CollectionListTable,
    SalesDrSelectionTable,
  },
  setup() {
    const tab = ref('')

    const tabs = [
      { title: 'Sales DR Pending for Collection', icon: mdiTagPlus },
      { title: 'Collection List', icon: mdiViewList },
    ]

    return {
      tab,
      tabs,
    }
  },
}
</script>
