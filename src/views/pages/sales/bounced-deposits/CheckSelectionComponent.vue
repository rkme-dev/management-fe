<template>
  <v-card>
    <v-card-text>
      <v-row>
        <v-col
            cols="12"
            class="pa-16"
        >
          <v-data-table
              v-model="selectedChecks"
              :items="checks"
              :headers="headers"
              show-select
              :loading="loading"
              :search="search"
          >
            <template #item.collection_payment.amount="{ item }">
              <v-currency-field
                  v-model="item.collection_payment.amount"
                  prefix="PHP"
                  class="text-green"
                  disabled
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
import {computed, ref, toRef} from "@vue/composition-api";
import store from "@/store";
import {onMounted} from "@vue/composition-api/dist/vue-composition-api";

export default {
  name: "CheckSelectionComponent.vue",
  components: {

  },
  props: {
    depositId : {
      type: Number,
      required: false,
      default: null,
    },
    ids : {
      type: Array,
      required: false,
      default: null,
    },
  },
  setup(props, { emit }) {
    const checkIds = toRef(props, 'ids')
    const selectedChecks = ref([])
    const checks = computed(() => store.state.BouncedDepositStore.checks)
    const loading = computed(() => store.state.DepositStore.loading)
    const search = ref('')
    const headers = [
      {
        text: 'Date',
        align: 'start',
        sortable: false,
        value: 'collection_payment.payment_date',
      },
      { text: 'Check Number', value: 'check_number' },
      { text: 'Bank', value: 'bank' },
      { text: 'Type', value: 'check_type' },
      { text: 'Amount', value: 'collection_payment.amount' },
    ]

    const reSelectChecks = () => {
      if (checkIds.value === null) {
        return
      }

      checks.value.forEach((check, index) => {
        if (checkIds.value.includes(check.id) === true) {
          selectedChecks.value.push(check)
        }
      })
    }

    onMounted(async () => {
      await store.dispatch('BouncedDepositStore/getChecks', props.depositId)

      await reSelectChecks()
    })

    const submit = () => {
      emit('onSubmit', selectedChecks.value)
    }

    const cancel = () => {
      emit('onCancel')
      selectedChecks.value = []
    }

    return {
      cancel,
      checks,
      headers,
      loading,
      submit,
      search,
      selectedChecks,
    }
  },

}
</script>

<style scoped>

</style>
