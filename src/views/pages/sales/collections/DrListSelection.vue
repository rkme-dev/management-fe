<template>
  <v-card class="pa-10">
    <v-card-text>
      <v-row>
        <v-col
          cols="12"
          class="pa-16"
        >
          <v-data-table
            v-model="selectedDrs"
            :items="list"
            :headers="headers"
            show-select
            :loading="loading"
            :search="search"
          >
            <template v-slot:top>
              <v-toolbar
                color="info"
                outlined
              >
                <v-toolbar-title style="color: white">
                  Sales DR List
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
              </v-toolbar>
            </template>
            <template #item.created_at="{ item }">
              {{ dateFormat1(item.created_at) }}
            </template>
            <template #item.remaining_balance="{ item }">
              <v-currency-field
                v-model="item.remaining_balance"
                disabled
                prefix="PHP"
                class="text-green"
              >
              </v-currency-field>
            </template>
            <template #footer>
              <v-row class="mb-2 mt-2">
                <v-col
                  cols="8"
                ></v-col>
                <v-col
                  cols="2"
                >
                  <v-btn
                    color="error"
                    @click="cancel"
                  >
                    Cancel
                  </v-btn>
                </v-col>
                <v-col
                  cols="1"
                >
                  <v-btn
                    color="info"
                    class=""
                    @click="submit"
                  >
                    Submit
                  </v-btn>
                </v-col>
              </v-row>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import {
  computed, ref, toRef, watch,
  onMounted, onUnmounted,
} from '@vue/composition-api'
import store from '@/store'
import { dateFormat1 } from '@/utils/time'

export default {
  name: 'DrListSelection',
  props: {
    customerId: {
      type: Number,
      required: true,
      default: null,
    },
    existingSelectedDr: {
      type: Array,
      required: false,
      default: null,
    },
  },
  setup(props, { emit }) {
    const customerIdData = toRef(props, 'customerId')
    const existingSelectedDrs = toRef(props, 'existingSelectedDr')
    const selectedDrs = ref([])
    const list = computed(() => store.state.SalesDrStore.items)
    const loading = computed(() => store.state.SalesDrStore.loading)
    const showSubmit = ref(false)
    const search = ref()
    const listRecompute = ref([])

    const reinitializeExistingSelectedDrs = () => {
      if (existingSelectedDrs.value.length === 0) {
        selectedDrs.value = []
        store.dispatch('SalesDrStore/drListByCustomer', customerIdData.value)

        return
      }

      listRecompute.value = []
      selectedDrs.value = []

      existingSelectedDrs.value.forEach(item => {
        list.value.forEach(listItem => {
          const id = item.sales_dr?.id ?? item.id

          const exist = (listItem.id === id) ? listItem : false

          if (exist) {
            listRecompute.value.push(exist)
            selectedDrs.value.push(exist)
          } else {
            listRecompute.value.push(listItem)
          }
        })
      })

      store.dispatch('SalesDrStore/updateOrderItems', listRecompute.value)
    }

    onMounted(async () => {
      await reinitializeExistingSelectedDrs()
    })

    onUnmounted(async () => {
      await reinitializeExistingSelectedDrs()
    })

    watch(existingSelectedDrs, () => {
      reinitializeExistingSelectedDrs()
    })

    const submit = () => {
      emit('selectedDrs', selectedDrs.value)
    }

    const cancel = () => {
      emit('cancel')
    }

    return {
      cancel,
      dateFormat1,
      search,
      showSubmit,
      submit,
      list,
      loading,
      selectedDrs,
      headers: [
        {
          text: 'Date',
          align: 'start',
          sortable: false,
          value: 'created_at',
        },
        { text: 'DR No', value: 'sales_dr_number' },
        { text: 'Remaining Balance', value: 'remaining_balance' },
      ],
    }
  },
}
</script>

<style scoped>

</style>
