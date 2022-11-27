<template>
  <v-row>
    <v-col cols="12">
      <v-card
        id="sales-orders-list-card"
        class="mb-6"
      >
        <v-row class="match-height pa-2">
          <v-col cols="12">
            <v-expansion-panels
              inset
            >
              <v-expansion-panel>
                <v-expansion-panel-header>Finish Products Inventory</v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-row class="match-height">
                    <v-col
                      v-for="(product, index) in products"
                      cols="4"
                    >
                      <unit-pack-inventory
                        :change="totalSales.change"
                        :color="totalSales.color"
                        :icon="totalSales.icon"
                        :statistics="totalSales.statistics"
                        :unit-title="product.name"
                        :subtitle="totalSales.subtitle"
                        :units="product.units"
                      ></unit-pack-inventory>
                    </v-col>
                  </v-row>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
    <v-col cols="12">
      <v-card id="sales-orders-list-card">
        <OrdersListTable></OrdersListTable>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
import { mdiCurrencyUsd } from '@mdi/js'
import store from '@/store'
import {
  computed, onBeforeMount, onMounted, watch,
} from '@vue/composition-api'
import UnitPackInventory from '@/components/cards/UnitPackInventory.vue'
import OrdersListTable from './OrdersListTable.vue'

export default {
  components: {
    UnitPackInventory,
    OrdersListTable,
  },
  setup() {
    onMounted(async () => {
      await store.dispatch('FinishProductStore/list')
    })

    const products = computed(() => store.state.FinishProductStore.list.map(product => {
      product.units.map(unit => {
        unit.pivot.actual_balance = unit?.pivot?.actual_balance ?? 0
        unit.pivot.reserved_balance = unit.pivot?.reserved_balance ?? 0
        unit.pivot.reserved = parseFloat(unit.pivot?.actual_balance ?? 0) - parseFloat(unit.pivot?.reserved_balance ?? 0)

        return unit
      })

      return product
    }))

    watch(products, () => {
    })

    const totalSales = {
      statTitle: 'Refunds',
      icon: mdiCurrencyUsd,
      color: 'secondary',
      subtitle: 'Past Month',
      statistics: '$78',
      change: '-15%',
    }

    return {
      products,
      totalSales,
    }
  },
}
</script>
