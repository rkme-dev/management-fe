<template>
  <v-card
    flat
    class="pa-3 mt-2"
  >
    <v-row>
      <v-col>
        <v-subheader class="font-weight-black text-uppercase">
          Purchase Order Payment Tracking
        </v-subheader>
        <v-simple-table
          fixed-header
        >
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">
                  FX Number
                </th>
                <th class="text-left">
                  Message
                </th>
                <th class="text-left">
                  Amount in USD
                </th>
                <th class="text-left">
                  Amount in PESO
                </th>
                <th class="text-left">
                  USD Conversion Rate
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
                v-for="item in optionsLocal.standard"
                :key="item.id"
              >
                <td>{{ item.fx_id }}</td>
                <td>{{ item.message }}</td>
                <td>{{ item.usd_conversion }}</td>
                <td>{{ item.peso_conversion }}</td>
                <td>{{ item.conversion_rate }}</td>
                <td>{{ item.full_name }}</td>
                <td>{{ dateFormat1(item.created_at) }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-subheader class="font-weight-black text-uppercase">
          Purchase Order Other Payments Tracking
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
                Amount Paid
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
              v-for="item in optionsLocal.other"
              :key="item.id"
            >
              <td>{{ item.message }}</td>
              <td>{{ item.amount }}</td>
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

    onMounted(async () => {
      await PurchaseOrdersService.findPaymentLogs(id.value)
        .then(response => {
          optionsLocal.value = response.data
        })
    })

    return {
      optionsLocal,
      dateFormat1,
    }
  },
}
</script>
