<template>
  <v-card
    flat
    class="pa-3 mt-2"
  >
    <v-alert
      v-show="showAlert"
      dense
      text
      type="success"
    >
      Successfully <strong>{{ mode }}d</strong> a client information. You will be automatically
      redirected in a bit.
    </v-alert>
    <v-form class="multi-col-validation">
      <v-card-text class="pt-5">
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="optionsLocal.name"
              outlined
              dense
              label="Name"
              :readonly="mode === 'show'"
              hide-details="auto"
              :error-messages="errors.name"
              :persistent-placeholder="mode === 'show'"
            ></v-text-field>
          </v-col>

          <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              v-model="optionsLocal.tin"
              outlined
              dense
              label="Tin"
              :readonly="mode === 'show'"
              hide-details="auto"
              :error-messages="errors.tin"
              :persistent-placeholder="mode === 'show'"
            ></v-text-field>
          </v-col>

          <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              v-model="optionsLocal.contact_no"
              outlined
              dense
              label="Contact No."
              :readonly="mode === 'show'"
              hide-details="auto"
              :error-messages="errors.contact_no"
              :persistent-placeholder="mode === 'show'"
            ></v-text-field>
          </v-col>

          <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              v-model="optionsLocal.contact_person"
              outlined
              dense
              label="Contact Person"
              :readonly="mode === 'show'"
              hide-details="auto"
              :error-messages="errors.contact_person"
              :persistent-placeholder="mode === 'show'"
            ></v-text-field>
          </v-col>

          <v-col
            cols="12"
            md="6"
          >
            <v-textarea
              v-model="optionsLocal.delivery_address"
              outlined
              rows="3"
              label="Delivery Address"
              :readonly="mode === 'show'"
              hide-details="auto"
              :error-messages="errors.delivery_address"
              :persistent-placeholder="mode === 'show'"
            ></v-textarea>
          </v-col>

          <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              v-model="optionsLocal.email"
              outlined
              dense
              label="Email"
              :readonly="mode === 'show'"
              hide-details="auto"
              :error-messages="errors.email"
              :persistent-placeholder="mode === 'show'"
            ></v-text-field>
          </v-col>

          <v-col
            cols="12"
            md="6"
          >
            <v-textarea
              v-model="optionsLocal.terms"
              outlined
              rows="3"
              label="Terms"
              :readonly="mode === 'show'"
              hide-details="auto"
              :error-messages="errors.terms"
              :persistent-placeholder="mode === 'show'"
            ></v-textarea>
          </v-col>

          <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              v-model="optionsLocal.vat_rate"
              outlined
              dense
              label="Vat Rate"
              :readonly="mode === 'show'"
              hide-details="auto"
              :error-messages="errors.vat_rate"
              :persistent-placeholder="mode === 'show'"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-text>
        <v-btn
          v-show="mode === 'create' || mode === 'update'"
          outlined
          class="mt-3 mr-3"
          color="primary"
          @click="save"
        >
          {{ buttonLabel }}
        </v-btn>
        <v-btn
          outlined
          class="mt-3"
          type="reset"
          @click.prevent="goBack"
        >
          Back to List
        </v-btn>
      </v-card-text>
    </v-form>
  </v-card>
</template>

<script>
import { computed, ref, watch } from '@vue/composition-api'
import router from '@/router'
import store from '@/store'
import { CREATE_CUSTOMER, UPDATE_CUSTOMER } from '@/store/actions.type'
import { SET_ERROR } from '@/store/mutations.type'

export default {
  props: {
    informationData: {
      type: Object,
      default: () => ({
        name: '',
        vat: '',
        tin: '',
        contact_no: '',
        contact_person: '',
        delivery_address: '',
        email: '',
        terms: '',
        vat_rate: '',
      }),
    },
    mode: {
      type: String,
    },
  },
  setup(props) {
    const errors = computed(() => store.getters.errors)
    const optionsLocal = computed(() => props.informationData)
    const showAlert = ref(false)
    const buttonLabel = props.mode === 'create' ? 'Save' : 'Update'

    const goBack = () => {
      router.push('/sales/clients')
    }

    const resolveFormSuccess = () => {
      showAlert.value = true
      setTimeout(() => {
        goBack()
      }, 5000)
    }

    const save = () => {
      const form = optionsLocal.value

      if (props.mode === 'update') {
        store.dispatch(UPDATE_CUSTOMER, form).then(data => {
          if (data != null) {
            resolveFormSuccess()
          }
        })
      }

      if (props.mode === 'create') {
        store.dispatch(CREATE_CUSTOMER, form).then(data => {
          if (data != null) {
            resolveFormSuccess()
          }
        })
      }
    }

    return {
      optionsLocal,
      goBack,
      save,
      showAlert,
      errors,
      buttonLabel,
    }
  },
}
</script>
