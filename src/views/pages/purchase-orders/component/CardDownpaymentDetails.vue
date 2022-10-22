<template>
  <div>
    <v-card
      class="overflow-hidden"
      elevation="3"
    >
      <v-card-title>Downpayment Details</v-card-title>
      <v-card-text>
        <v-row>
          <v-col
            cols="4"
            md="6"
            class="mr-6"
          >
            <v-text-field
              id="firstnameHorizontalIcons"
              v-model="details.fx_number"
              hide-details="auto"
              :prepend-inner-icon="icons.mdiBank"
              :error-messages="errors.fx_number"
              outlined
              dense
              label="FX Number"
            ></v-text-field>
          </v-col>
          <v-col
            class="mr-6"
            cols="4"
            md="6"
          >
            <v-text-field
              id="firstnameHorizontalIcons"
              v-model="details.total"
              hide-details="auto"
              prefix="$"
              outlined
              dense
              :error-messages="errors.total"
              label="Total Amount Payable"
              @input="moneyFormat('total')"
            ></v-text-field>
          </v-col>
          <v-col
            cols="4"
            md="6"
            class="mr-6"
          >
            <v-text-field
              id="firstnameHorizontalIcons"
              v-model="details.conversion_rate"
              hide-details="auto"
              prefix="PHP"
              outlined
              dense
              label="Conversion Rate"
              :error-messages="errors.conversion_rate"
              @input="moneyFormat('conversion_rate')"
            ></v-text-field>
          </v-col>
          <v-col
            cols="4"
            md="6"
            class="mr-6 mb-6"
          >
            <v-select
              v-model="details.percentage"
              outlined
              label="Downpayment Percentage"
              item-text="text"
              item-value="percentage"
              dense
              prefix="%"
              :error-messages="errors.dp_percentage"
              :items="[{text:10,value:0.1},20,30,40,50,60,70,80,90,100]"
            ></v-select>
          </v-col>
          <v-col
            cols="4"
            md="6"
          >
            <v-divider />

            <v-text-field
              id="firstnameHorizontalIcons"
              v-model="dollarPercentageToPay"
              readonly
              hide-details="auto"
              prefix="PHP"
              dense
              label="Amount in USD"
            ></v-text-field>
          </v-col>
          <v-col
            cols="4"
            md="6"
          >
            <v-divider />
            <v-text-field
              id="firstnameHorizontalIcons"
              v-model="pesoPercentageToPay"
              readonly
              hide-details="auto"
              prefix="PHP"
              dense
              label="Amount in PHP"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import {
  computed,
  ref,
  toRef,
  watch,
} from '@vue/composition-api/dist/vue-composition-api'
import {
  mdiAccountOutline,
  mdiCartPlus,
  mdiChevronDown,
  mdiChevronUp, mdiHelpCircleOutline, mdiLockOpenOutline,
  mdiShareVariantOutline, mdiStarOutline, mdiTrendingUp,
  mdiCardAccountPhoneOutline,
  mdiWarehouse,
  mdiBank,
  mdiBankPlus, mdiBankTransfer,
} from '@mdi/js'
import store from '@/store'

export default {
  props: {
    details: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props, { emit }) {
    const optionsLocal = toRef(props, 'details')
    const dollarPercentageToPay = ref(0.00)
    const pesoPercentageToPay = ref(0.00)
    const errors = computed(() => store.getters.errors)

    const currency = (country = 'USD') => (new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: country,
      minimumFractionDigits: 2,
    }))

    const debounce = (func, timeout = 500) => {
      let timer

      return (...args) => {
        clearTimeout(timer)
        timer = setTimeout(() => {
          func.apply(this, args)
        }, timeout)
      }
    }

    const moneyFormat = debounce(field => {
      if (field) {
        optionsLocal.value[field] = parseFloat(optionsLocal.value[field]).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
      }
    })

    watch(optionsLocal.value, value => {
      if (value.total && value.conversion_rate && value.percentage) {
        const conversionRate = ref()
        const percentage = ref()
        const total = ref()

        total.value = parseFloat(value.total.replace(/[^0-9.]/g, ''))
        percentage.value = (value.percentage / 100).toFixed(2)
        conversionRate.value = parseFloat(value.conversion_rate).toFixed(2)

        dollarPercentageToPay.value = currency().format(total.value * percentage.value)
        pesoPercentageToPay.value = currency('PHP').format(total.value * percentage.value * conversionRate.value)

        emit('getDownpayment', {
          total: total.value,
          conversion_rate: optionsLocal.value.conversion_rate,
          fx_number: optionsLocal.value.fx_number,
          usd_conversion: dollarPercentageToPay.value,
          peso_conversion: pesoPercentageToPay.value,
          percentage: optionsLocal.value.percentage,
          dp_percentage: optionsLocal.value.percentage,
          paid_amount: dollarPercentageToPay.value.replace(',', '').replace('$', ''), // we maintain db payments in usd, php transaction in payment logs
        })
      } else {
        emit('getDownpayment', {
          conversion_rate: optionsLocal.value.conversion_rate,
          total: total.value,
          fx_number: optionsLocal.value.fx_number,
        })
        dollarPercentageToPay.value = 0.00
        pesoPercentageToPay.value = 0.00
      }
    })

    //
    // const calculateDPAmount = () => {
    //   const form = optionsLocal.value
    //   form.total = parseFloat(form.total.replace(/[^0-9.]/g, ''))
    //   const percentage = (form.percentage / 100).toFixed(2)
    //   const conversionRate = parseFloat(form.conversion_rate).toFixed(2)
    //   dollarPercentageToPay.value = currency().format(form.total * percentage)
    //   pesoPercentageToPay.value = currency('PHP').format(form.total * percentage * conversionRate)
    // }

    return {
      errors,
      dollarPercentageToPay,
      pesoPercentageToPay,
      moneyFormat,
      icons: {
        mdiChevronUp,
        mdiChevronDown,
        mdiCartPlus,
        mdiShareVariantOutline,
        mdiLockOpenOutline,
        mdiStarOutline,
        mdiAccountOutline,
        mdiTrendingUp,
        mdiHelpCircleOutline,
        mdiCardAccountPhoneOutline,
        mdiWarehouse,
        mdiBank,
        mdiBankPlus,
        mdiBankTransfer,
      },
    }
  },
}
</script>
