<template>
  <v-card>
    <v-card-text>
      <v-form>
        <v-row>
          <v-col cols="12">
            <v-alert
              color="primary"
              text
              style="margin-bottom: -10px"
            >
              <div class="d-flex align-start">
                <v-icon color="primary">
                  {{ icons.mdiInformation }}
                </v-icon>

                <div class="ms-3">
                  <p class="text-base font-weight-medium mb-1">
                    {{ mode }} Customer
                  </p>
                </div>
              </div>
            </v-alert>
          </v-col>

          <v-col
            cols="12"
          >
            <v-progress-linear
              v-if="customersLoading"
              indeterminate
              color="primary"
            ></v-progress-linear>
          </v-col>
          <v-col
            v-show="modeData === 'Selecting'"
            cols="4"
            class="pa-8"
          >
            <v-autocomplete
              v-if="customersLoading === false"
              v-model="customer"
              :items="customers"
              item-text="name"
              item-value="id"
              outlined
              dense
              clearable
              label="Search Customer Here"
              hide-details="auto"
            ></v-autocomplete>
            <!--            <v-select-->
            <!--              v-model="customer"-->
            <!--              :items="customers"-->
            <!--              item-text="name"-->
            <!--              item-value="id"-->
            <!--              filled-->
            <!--              label="Customer"-->
            <!--              outlined-->
            <!--              dense-->
            <!--              hide-details="auto"-->
            <!--            ></v-select>-->
          </v-col>
          <v-col
            v-show="modeData === 'Selecting'"
            cols="8"
            class="pa-8"
          >
          </v-col>
          <v-col
            v-if="modeData !== 'Create'"
            cols="6"
            class="pr-8 pl-8"
          >
            <v-text-field
              id="email"
              v-model="formData.code"
              :error-messages="errors.code"
              readonly
              outlined
              dense
              hide-details="auto"
              label="Code"
            ></v-text-field>
          </v-col>
          <v-col
            cols="3"
            class="pr-8 pl-8"
          >
            <v-switch
              v-model="formData.is_active"
              :readonly="modeData === 'Selecting'"
              :disabled="formData.is_bad_account === true"
              :error-messages="errors.is_active"
              label="Active"
            ></v-switch>
          </v-col>
          <v-col
            cols="3"
            mb="6"
            class="pr-8 pl-8"
          >
            <v-switch
              v-model="formData.is_bad_account"
              :disabled="formData.is_active === true"
              :readonly="modeData === 'Selecting'"
              label="Bad Account"
            ></v-switch>
          </v-col>

          <v-col
            cols="6"
            class="pr-8 pl-8"
          >
            <v-text-field
              id="email"
              v-model="formData.name"
              :error-messages="errors.name"
              :readonly="modeData === 'Selecting'"
              outlined
              dense
              hide-details="auto"
              label="Customer Name"
            ></v-text-field>
          </v-col>

          <v-col
            cols="6"
            mb="6"
            class="pr-8 pl-8"
          >
            <v-select
              v-model="formData.salesman_id_1"
              clearable
              :items="salesmans"
              item-text="salesman_name"
              item-value="id"
              filled
              label="Agent 1"
              :error-messages="errors.salesman_id_1"
              :readonly="modeData === 'Selecting'"
              outlined
              dense
              hide-details="auto"
            ></v-select>
          </v-col>
          <v-col
            cols="6"
            mb="6"
            class="pr-8 pl-8"
          >
            <v-textarea
              id="email"
              v-model="formData.address"
              rows="2"
              :error-messages="errors.address"
              :readonly="modeData === 'Selecting'"
              outlined
              dense
              hide-details="auto"
              label="Address"
            ></v-textarea>
          </v-col>
          <v-col
            cols="6"
            mb="6"
            class="pr-8 pl-8"
          >
            <v-select
              v-model="formData.salesman_id_2"
              :items="salesmans"
              clearable
              item-text="salesman_name"
              item-value="id"
              filled
              label="Agent 2"
              :error-messages="errors.salesman_id_2"
              :readonly="modeData === 'Selecting'"
              outlined
              dense
              hide-details="auto"
            ></v-select>
          </v-col>
          <v-col
            cols="6"
            mb="6"
            class="pr-8 pl-8"
          >
            <v-textarea
              id="email"
              v-model="formData.delivery_address"
              rows="2"
              :error-messages="errors.delivery_address"
              :readonly="modeData === 'Selecting'"
              outlined
              dense
              hide-details="auto"
              label="Delivery Address"
            ></v-textarea>
          </v-col>
          <v-col
            cols="3"
            mb="6"
            class="pr-8 pl-8 mt-n6"
          >
            <v-text-field
              id="email"
              v-model="formData.area"
              :readonly="modeData === 'Selecting'"
              :error-messages="errors.area"
              outlined
              dense
              hide-details="auto"
              label="Area"
            ></v-text-field>
          </v-col>
          <v-col
            cols="3"
            mb="6"
            class="pr-8 pl-8 mt-n6"
          ></v-col>
          <v-col
            cols="6"
            mb="6"
            class="pr-8 pl-8"
          >
            <v-text-field
              id="email"
              v-model="formData.email"
              :error-messages="errors.email"
              :readonly="modeData === 'Selecting'"
              outlined
              dense
              hide-details="auto"
              label="Email"
            ></v-text-field>
          </v-col>

          <v-col
            cols="6"
            mb="6"
            class="pr-8 pl-8 mt-n14"
          >
            <v-select
              v-model="formData.term_id"
              clearable
              :items="terms"
              item-text="code"
              :readonly="modeData === 'Selecting'"
              item-value="id"
              filled
              label="Terms"
              :error-messages="errors.term_id"
              outlined
              dense
              hide-details="auto"
            ></v-select>
          </v-col>
          <v-col
            cols="6"
            mb="6"
            class="pr-8 pl-8"
          >
            <v-text-field
              id="email"
              v-model="formData.contact_no"
              :error-messages="errors.contact_no"
              :readonly="modeData === 'Selecting'"
              outlined
              dense
              hide-details="auto"
              label="Contact Number"
            ></v-text-field>
          </v-col>
          <v-col
            cols="6"
            mb="6"
            class="pr-8 pl-8 mt-n14"
          >
            <v-select
              v-model="formData.vat_id"
              clearable
              :items="vats"
              item-text="code"
              :readonly="modeData === 'Selecting'"
              item-value="id"
              filled
              label="Vat"
              :error-messages="errors.vat_id"
              outlined
              dense
              hide-details="auto"
            ></v-select>
          </v-col>

          <v-col
            cols="6"
            mb="6"
            class="pr-8 pl-8"
          >
            <v-text-field
              id="email"
              v-model="formData.contact_name"
              :error-messages="errors.contact_name"
              :readonly="modeData === 'Selecting'"
              outlined
              dense
              hide-details="auto"
              label="Contact Person"
            ></v-text-field>
          </v-col>
          <v-col
            cols="6"
            mb="6"
            class="pr-8 pl-8 mt mt-n14"
          >
            <v-select
              v-model="formData.type"
              clearable
              :items="types"
              filled
              label="Customer Types"
              :error-messages="errors.type"
              :readonly="modeData === 'Selecting'"
              outlined
              dense
              hide-details="auto"
            ></v-select>
          </v-col>

          <v-col
            cols="6"
            mb="6"
            class="pr-8 pl-8"
          >
            <v-text-field
              id="email"
              v-model="formData.tin"
              :error-messages="errors.tin"
              :readonly="modeData === 'Selecting'"
              outlined
              dense
              hide-details="auto"
              label="TIN"
            ></v-text-field>
          </v-col>
          <v-col
            cols="6"
            mb="6"
            class="pr-8 pl-8"
          ></v-col>
          <v-col
            cols="6"
            mb="6"
            class="pr-8 pl-8"
          >
            <v-currency-field
              v-model="formData.credit_limit"
              class="text-green"
              prefix="PHP"
              :error-messages="errors.credit_limit"
              outlined
              :readonly="modeData === 'Selecting'"
              dense
              hide-details="auto"
              label="Credit Limit"
            ></v-currency-field>
          </v-col>

          <v-col
            cols="6"
            mb="6"
            class="pr-8 pl-8 mt-n14"
          >
            <v-textarea
              id="email"
              v-model="formData.notes"
              rows="3"
              :error-messages="errors.notes"
              :readonly="modeData === 'Selecting'"
              outlined
              dense
              hide-details="auto"
              label="Notes"
            ></v-textarea>
          </v-col>
          <v-col
            cols="12"
            class="d-flex"
          >
            <v-btn
              color="primary"
              class="me-3 mt-4"
              @click="submit"
            >
              Submit
            </v-btn>
            <v-btn
              outlined
              class="me-3 mt-4"
              type="reset"
              @click.prevent="cancel"
            >
              Cancel
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
    <v-card-actions>
    </v-card-actions>
  </v-card>
</template>

<script>
import {
  ref,
  toRef,
  computed,
  watch,
} from '@vue/composition-api'
import { customerTypes } from '@/constants/CustomerTypes'
import { mdiAlertOutline, mdiInformation } from '@mdi/js'
import store from '@/store'

export default {
  props: {
    mode: {
      type: String,
      required: true,
      default: (() => 'Selecting'),
    },
    data: {
      type: Object,
      required: false,
      default: null,
    },
  },
  setup(props, { emit }) {
    const modeData = toRef(props, 'mode')

    store.dispatch('TermStore/list')
    store.dispatch('VatStore/list')
    store.dispatch('SalesmanStore/list')

    if (modeData.value === 'Selecting') {
      store.dispatch('CustomerStore/list')
    }

    const dataProp = toRef(props, 'data')
    const errors = computed(() => store.state.CustomerStore.errors)
    const customers = computed(() => store.state.CustomerStore.list)
    const customersLoading = computed(() => store.state.CustomerStore.loading)
    const terms = computed(() => store.state.TermStore.terms)
    const vats = computed(() => store.state.VatStore.vats)
    const types = customerTypes()
    const customer = ref({})
    const salesmans = computed(() => store.state.SalesmanStore.salesmans)
    const initializeFormData = ref({
      is_active: false,
      is_bad_account: false,
      code: '',
      name: '',
      address: '',
      delivery_address: '',
      email: '',
      contact_person: '',
      contact_no: '',
      tin: '',
      credit_limit: '',
      is_bad: '',
      salesman_id_1: '',
      salesman_id_2: '',
      area: '',
      term_id: '',
      vat_id: '',
      type: '',
      notes: '',
    })
    const formData = ref({
      is_active: false,
      is_bad_account: false,
      code: '',
      name: '',
      address: '',
      delivery_address: '',
      email: '',
      contact_person: '',
      contact_no: '',
      tin: '',
      credit_limit: '',
      is_bad: '',
      salesman_id_1: '',
      salesman_id_2: '',
      area: '',
      term_id: '',
      vat_id: '',
      type: '',
      notes: '',
    })

    formData.value = dataProp.value ?? formData.value

    watch(customer, () => {
      if (customer.value === null) {
        formData.value = {
          is_active: false,
          is_bad_account: false,
          code: '',
          name: '',
          address: '',
          delivery_address: '',
          email: '',
          contact_person: '',
          contact_no: '',
          tin: '',
          credit_limit: '',
          is_bad: '',
          salesman_id_1: '',
          salesman_id_2: '',
          area: '',
          term_id: '',
          vat_id: '',
          type: '',
          notes: '',
        }

        return
      }

      formData.value = customers.value.find(user => user.id === customer.value)
    })

    watch(dataProp, () => {
      formData.value = dataProp.value
    })

    const cancel = () => {
      store.dispatch('CustomerStore/removeErrors')
      emit('submit', {})
    }

    const submit = () => {
      if (modeData.value === 'Create') {
        formData.value.is_active = formData.value.is_active === '' ? false : formData.value.is_active
        formData.value.is_bad_account = formData.value.is_bad_account === '' ? false : formData.value.is_bad_account

        store.dispatch('CustomerStore/create', formData.value).then(
          response => {
            if (response.status === undefined) {
              emit('submit')
              store.dispatch('CustomerStore/list')
            }
          },
        )
      } else if (modeData.value === 'Selecting') {
        emit('submit', formData.value)
        customer.value = null
      } else {
        store.dispatch('CustomerStore/update', formData.value).then(
          response => {
            if (response.status === undefined) {
              emit('submit')
              store.dispatch('CustomerStore/list')
            }
          },
        )
      }
    }

    return {
      terms,
      types,
      vats,
      customer,
      salesmans,
      customersLoading,
      modeData,
      customers,
      cancel,
      submit,
      errors,
      formData,
      icons: {
        mdiAlertOutline,
        mdiInformation,
      },
    }
  },
}
</script>
.text-green input {
color: #009900 !important;
}
<style>
.text-green input {
  color: #009900 !important;
}
</style>
