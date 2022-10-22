<template>
  <v-card>
    <v-row>
      <v-col cols="3">
        <v-text-field
          v-model="expenses.description"
          label="Description"
          hide-details="auto"
          dense
          :error-messages="errors.description"
        />
      </v-col>
      <v-col cols="3">
        <v-text-field
          v-model="expenses.paid_to"
          label="Paid To"
          hide-details="auto"
          dense
          :error-messages="errors.paid_to"
        />
      </v-col>
      <v-col cols="3">
        <v-text-field
          v-model="expenses.amount"
          label="Amount Paid"
          hide-details="auto"
          dense
          :error-messages="errors.amount"
          @input="moneyFormat('total')"
        />
      </v-col>

      <v-col cols="1">
        <v-btn
          class="mx-2"
          x-small
          fab
          :disabled="isDisabled"
          @click="$emit('addExpensesRow')"
        >
          <v-icon dark>
            {{ icons.mdiPlus }}
          </v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>
<script>
import {computed, reactive, ref, watch} from "@vue/composition-api/dist/vue-composition-api";
import store from "@/store";
import {
  mdiPlus
} from '@mdi/js'

export default {
  props: {
    itemNumber: {
      type: Number,
      default: 0,
    },
  },
  setup(props, {emit}) {
    const expenses = reactive({description: null, amount: null, paid_to: null})
    const isDisabled = ref(true)
    const errors = computed(() => store.getters.errors)

    const formatPrice = value => parseFloat(value)
      .toFixed(2)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')

    watch(
      expenses,
      () => {
        if (expenses.description && expenses.amount && expenses.paid_to) {
          isDisabled.value = false
          formatPrice(expenses.amount)
        } else isDisabled.value = true

        emit('expenseAdded', {...expenses}, props.itemNumber)
      },
    )

    const debounce = (func, timeout = 500) => {
      let timer

      return (...args) => {
        clearTimeout(timer)
        timer = setTimeout(() => {
          func.apply(this, args)
        }, timeout)
      }
    }

    const moneyFormat = debounce(() => {
      expenses.amount = formatPrice(expenses.amount)
    })

    return {
      expenses,
      isDisabled,
      errors,
      formatPrice,
      icons: {
        mdiPlus,
      },
      moneyFormat,
    }
  }
}
</script>
