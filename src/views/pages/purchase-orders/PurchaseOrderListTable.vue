<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="purchaseOrders"
      sort-by="name"
      class="elevation-1 font-weight-black"
      :search="search"
      :loading="loading"
    >
      <template #item.id="{ item }">
        100{{ item.id }}
      </template>

      <template v-slot:top>
        <v-toolbar
          color="teal"
          outlined
        >
          <v-toolbar-title class="font-weight-black text-uppercase">
            Purchase Orders
          </v-toolbar-title>
          <v-divider
            class="mx-4"
            inset
            vertical
          ></v-divider>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
            class="mr-4"
          ></v-text-field>
          <router-link :to="{ name: 'create-purchase-order' }">
            <v-btn
              v-if="permissions.canCreatePO"
              color="primary"
              dark
              class="mb-2 font-weight-black"
            >
              Create a Purchase Order
            </v-btn>
          </router-link>
          <v-dialog
            v-model="dialogDelete"
            max-width="500px"
          >
            <v-card>
              <v-card-title class="text-h3">
                Are you sure you want to delete this Purchase Order?
              </v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="closeDelete"
                >
                  Cancel
                </v-btn>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="deleteItemConfirm"
                >
                  OK
                </v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template #[`item.status`]="{item}">
        <div class="d-flex justify-center">
          <v-chip
            small
            :class="`${statusColor[item.status]}--text`"
            class="v-chip-light-bg text-center"
          >
            {{ status[item.status] }}
          </v-chip>
        </div>
      </template>
      <template v-slot:item.actions="{ item }">
        <div class="d-flex justify-center">
          <router-link
            v-if="item.status === 'pending_approval' && permissions.canViewPendingPO"
            :to="{ name: 'approve-purchase-order', params: { id: item.id } }"
          >
            <v-icon
              medium
              class="mr-2"
            >
              {{ mdiPageNextOutline }}
            </v-icon>
          </router-link>
          <router-link
            v-if="item.status === 'approved' && permissions.canViewInTransitPO"
            :to="{ name: 'in-transit-purchase-order', params: { id: item.id } }"
          >
            <v-icon
              medium
              class="mr-2"
            >
              {{ mdiPageNextOutline }}
            </v-icon>
          </router-link>
          <router-link
            v-if="item.status === 'in_transit' && permissions.canViewPierToWarehousePO"
            :to="{ name: 'pier-to-warehouse-purchase-order', params: { id: item.id } }"
          >
            <v-icon
              medium
              class="mr-2"
            >
              {{ mdiPageNextOutline }}
            </v-icon>
          </router-link>
          <router-link
            v-if="item.status === 'pier_to_warehouse' && permissions.canViewArrivalPO"
            :to="{ name: 'arrival-purchase-order', params: { id: item.id } }"
          >
            <v-icon
              medium
              class="mr-2"
            >
              {{ mdiPageNextOutline }}
            </v-icon>
          </router-link>
          <v-icon
            v-if="item.status === 'pier_to_warehouse' && permissions.canPrintBarcode"
            color="info"
            style="margin-left: 10px"
            medium
            class="mr-2"
            @click="redirectPrint(item.id)"
          >
            {{ mdiPrinter }}
          </v-icon>
        </div>
      </template>
      <template v-slot:no-data>
        <v-btn
          color="primary"
          @click="initialize"
        >
          Reset
        </v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import {
  mdiBallotRecountOutline, mdiDeleteCircle, mdiPageNextOutline, mdiPrinter,
} from '@mdi/js'
import {
  GET_PURCHASE_ORDERS,
  CLOSE_PURCHASE_ORDER,
} from '@/store/actions.type'
import {
  ref, nextTick, computed, onMounted,
} from '@vue/composition-api'
import store from '@/store'

export default {
  setup() {
    const search = ref('')
    const dialogDelete = ref(false)
    const headers = ref([
      {
        text: 'Number',
        align: 'start',
        sortable: false,
        value: 'id',
      },
      { text: 'Description', value: 'description' },
      { text: 'Status', value: 'status', align: 'center' },
      {
        text: 'Actions', value: 'actions', align: 'center', sortable: false,
      },
    ])
    const permissions = {
      canCreatePO: store.getters['AuthStore/hasAbility']('create-purchase order'),
      canViewPendingPO: store.getters['AuthStore/hasAbility']('view for approval-purchase order'),
      canViewInTransitPO: store.getters['AuthStore/hasAbility']('view in transit-purchase order'),
      canViewPierToWarehousePO: store.getters['AuthStore/hasAbility']('view pier to warehouse-purchase order'),
      canViewArrivalPO: store.getters['AuthStore/hasAbility']('view arrival-purchase order'),
      canPrintBarcode: store.getters['AuthStore/hasAbility']('print barcode-purchase order'),
    }

    const defaultItem = ref({
      number: '',
      container_number: '',
      status: '',
      paid_amount: '',
      amount: '',
      payment_method: '',
      refunded_at: '',
      paid_at: '',
    })
    const deletedIndex = ref(-1)
    const deletedItem = ref({
      name: '',
      sku: '',
      description: '',
      in_stock: '',
    })

    const purchaseOrders = computed(() => store.getters.purchaseOrders)
    const purchaseOrder = computed(() => store.getters.purchaseOrder)
    const errors = computed(() => store.getters.errors)
    const loading = computed(() => store.getters.loading)

    const initialize = () => {
      store.dispatch(GET_PURCHASE_ORDERS)
    }

    const redirectPrint = id => {
      window.open(`https://enco-api.herokuapp.com/print-purchase-order/${id}`, '_blank')
    }

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

    const deleteItem = item => {
      deletedIndex.value = purchaseOrders.value.indexOf(item)
      deletedItem.value = { ...item }
      dialogDelete.value = true
    }

    const closeDelete = () => {
      dialogDelete.value = false
      nextTick(() => {
        deletedItem.value = { ...defaultItem.value }
        deletedIndex.value = -1
      })
    }

    const deleteItemConfirm = () => {
      store.dispatch(CLOSE_PURCHASE_ORDER, deletedItem.value).then(() => {
        purchaseOrders.value.splice(deletedIndex.value, 1)
        closeDelete()
      })
    }

    onMounted(() => {
      initialize()
    })

    return {
      permissions,
      statusColor,
      status,
      mdiBallotRecountOutline,
      mdiDeleteCircle,
      mdiPrinter,
      mdiPageNextOutline,
      defaultItem,
      headers,
      dialogDelete,
      search,
      purchaseOrders,
      purchaseOrder,
      errors,
      deleteItem,
      deleteItemConfirm,
      closeDelete,
      initialize,
      redirectPrint,
      deletedItem,
      deletedIndex,
      loading,
    }
  },
}
</script>
