<template>
  <v-form>
    <v-row>
      <v-col
        v-if="modeData === 'edit'"
        cols="4"
        md="3"
      >
        <label for="firstnameHorizontalIcons">Salesman Code</label>
      </v-col>

      <v-col
        v-if="modeData === 'edit'"
        cols="7"
        md="7"
      >
        <v-text-field
          id="firstnameHorizontalIcons"
          v-model="salesmanData.salesman_code"
          outlined
          dense
          readonly
          :error-messages="errors.salesman_code"
          placeholder="Salesman Code"
          hide-details="auto"
        ></v-text-field>
      </v-col>
      <v-col
        cols="4"
        md="3"
      >
        <label for="firstnameHorizontalIcons">Salesman Name</label>
      </v-col>

      <v-col
        cols="7"
      >
        <v-textarea
          id="firstnameHorizontalIcons"
          v-model="salesmanData.salesman_name"
          outlined
          dense
          rows="2"
          :error-messages="errors.salesman_name"
          placeholder="Salesman Name"
          hide-details="auto"
        ></v-textarea>
      </v-col>
      <v-col
        cols="4"
        md="3"
      >
        <label for="firstnameHorizontalIcons">Case Quota</label>
      </v-col>

      <v-col
        cols="7"
      >
        <v-currency-field
          v-model="salesmanData.quota"
          label="Case Quota"
          :error-messages="errors.quota"
          filled
        />
      </v-col>
      <v-col
        cols="4"
        md="3"
      >
        <label for="firstnameHorizontalIcons">Notes</label>
      </v-col>

      <v-col
        cols="7"
      >
        <v-textarea
          id="firstnameHorizontalIcons"
          v-model="salesmanData.notes"
          rows="3"
          outlined
          dense
          :error-messages="errors.notes"
          placeholder="Notes"
          hide-details="auto"
        ></v-textarea>
      </v-col>

      <v-col
        cols="4"
        md="3"
      >
      </v-col>

      <v-col
        cols="7"
        md="7"
      >
        <v-checkbox
          v-model="salesmanData.is_active"
          label="Active"
          :error-messages="errors.is_active"
          hide-details="auto"
          class="me-3 mt-1"
        >
        </v-checkbox>
      </v-col>
      <v-col
        offset-md="3"
        cols="12"
      >
        <v-btn
          color="primary"
          @click="submit"
        >
          Submit
        </v-btn>
        <v-btn
          type="reset"
          outlined
          class="mx-2"
          @click="cancel"
        >
          Cancel
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import {
  toRef,
  computed,
  ref, watch,
} from '@vue/composition-api/dist/vue-composition-api'
import store from '@/store'

export default {
  props: {
    mode: {
      type: String,
      required: true,
      default: null,
    },
    salesman: {
      type: Object,
      required: false,
      default: null,
    },
  },
  setup(props, { emit }) {
    const formatPrice = value => parseFloat(value)
      .toFixed(2)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    const debounce = (func, timeout = 500) => {
      let timer

      return (...args) => {
        clearTimeout(timer)
        timer = setTimeout(() => {
          func.apply(this, args)
        }, timeout)
      }
    }

    const salesmanProp = toRef(props, 'salesman')

    const salesmanData = ref({
      salesman_code: null,
      salesman_name: null,
      quota: null,
      notes: null,
      is_active: false,
    })

    const modeData = toRef(props, 'mode')

    const moneyFormat = debounce(() => {
      salesmanData.value.quota = formatPrice(salesmanData.value.quota)
    })

    if (props.mode === 'edit') {
      salesmanData.value = salesmanProp.value

      if (salesmanData.value.is_active === 'Inactive') {
        salesmanData.value.is_active = 0
      } else {
        salesmanData.value.is_active = 1
      }
    }

    watch(salesmanProp, value => {
      if (props.mode === 'edit') {
        salesmanData.value = salesmanProp.value

        if (salesmanData.value.is_active === 'Inactive') {
          salesmanData.value.is_active = 0
        } else {
          salesmanData.value.is_active = 1
        }
      } else {
        salesmanData.value = {
          salesman_name: null,
          description: null,
          module: null,
          notes: null,
          quota: null,
          is_active: false,
        }
      }
    })

    const errors = computed(() => store.state.SalesmanStore.errors)

    const cancel = () => {
      emit('clicked', false)
    }

    const submit = () => {
      if (salesmanData.value.id === undefined) {
        store.dispatch('SalesmanStore/create', salesmanData.value).then(
          response => {
            if (response.status === undefined) {
              emit('clicked', {
                alertType: 'success',
                alertMessage: 'Successfully Added a Salesman.',
              })
              store.dispatch('SalesmanStore/list')
            }
          },
        )
      } else {
        store.dispatch('SalesmanStore/update', salesmanData.value).then(
          response => {
            if (response.status === undefined) {
              emit('clicked', {
                alertType: 'success',
                alertMessage: 'Successfully updated a Salesman.',
              })
              store.dispatch('SalesmanStore/list')
            }
          },
        )
      }
    }

    return {
      modeData,
      cancel,
      moneyFormat,
      errors,
      salesmanData,
      submit,
    }
  },
  computed: {
  },
  methods: {
  },
}
</script>

<style scoped>

</style>
