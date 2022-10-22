<template>
  <v-card
    flat
    class="pa-3 mt-2"
  >
    <v-row>
      <v-col>
        <v-subheader class="font-weight-black text-uppercase">
          Purchase Order Status Tracking
        </v-subheader>
        <v-simple-table
          fixed-header
        >
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">
                  Message
                </th>
                <th class="text-left">
                  Action
                </th>
                <th class="text-left">
                 Current Status
                </th>
                <th class="text-left">
                  User
                </th>
                <th class="text-left">
                  Log Time
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="item in optionsLocal"
                :key="item.id"
              >
                <td>{{ item.message }}</td>
                <td>{{ item.action }}</td>
                <td class="font-weight-medium">
                  <v-chip
                    small
                    :class="`${statusColor[item.status]}--text`"
                    class="v-chip-light-bg text-center font-weight-bold"
                  >
                    {{ status[item.status] }}
                  </v-chip>
                </td>
                <td>{{ item.full_name }}</td>
                <td>{{ dateFormat1(item.created_at) }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
    </v-row>
  </v-card>
</template>
<script>
import { computed, onMounted, ref } from '@vue/composition-api/dist/vue-composition-api'
import PurchaseOrdersService from '@/utils/services/purchase-orders.service'
import { dateFormat1 } from '@/utils/time'

export default {
  props: {
    orderId: {
      type: Number,
    },
  },
  setup(props) {
    const optionsLocal = ref([])
    const id = computed(() => props.orderId)

    const statusColor = {
      /* eslint-disable key-spacing */
      pier_to_warehouse: 'info',
      in_transit: 'primary',
      approved: 'success',
      received: 'primary',
      pending_approval: 'error',
      arrived: 'success',
      for_arrival: 'info',
      /* eslint-enable key-spacing */
    }

    const status = {
      pending_approval: 'NEEDS APPROVAL',
      pier_to_warehouse: 'PIER TO WAREHOUSE',
      arrived: 'ARRIVED AT WAREHOUSE',
      approved: 'PO APPROVED',
      for_arrival: 'ARRIVING TO WAREHOUSE',
      in_transit: 'IN TRANSIT',
    }

    onMounted(async () => {
      await PurchaseOrdersService.findOrderLogs(id.value)
        .then(response => {
          optionsLocal.value = response.data
          console.log(response.data)
          console.log(optionsLocal.value)
        })
    })

    return {
      status,
      statusColor,
      optionsLocal,
      dateFormat1,
    }
  },
}
</script>
