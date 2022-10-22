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
      Successfully <strong>{{ mode }}d</strong> a product. You will be automatically
      redirected in a bit.
    </v-alert>
    <v-form class="multi-col-validation">
      <v-card-text class="pt-5">
        <v-row>
          <v-col cols="12">
            <v-alert
              color="primary"
              text
              style="margin-bottom: -10px"
            >
              <div class="d-flex align-start">
                <div class="ms-3">
                  <p class="text-base font-weight-medium mb-1">
                    Supplier Information
                  </p>
                </div>
              </div>
            </v-alert>
          </v-col>
          <v-col cols="6">
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
          >
            <v-text-field
              v-model="optionsLocal.address"
              outlined
              dense
              label="Address"
              :readonly="mode === 'show'"
              hide-details="auto"
              :error-messages="errors.address"
              :persistent-placeholder="mode === 'show'"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-alert
              color="info"
              text
              style="margin-top: 25px; margin-bottom: -10px"
            >
              <div class="d-flex align-start">
                <div class="ms-3">
                  <p class="text-base font-weight-medium mb-1">
                    Bank Details
                  </p>
                </div>
              </div>
            </v-alert>
          </v-col>
          <v-col
            cols="2"
          >
            <v-text-field
              v-model="optionsLocal.bank_name"
              outlined
              dense
              label="Bank Name"
              :readonly="mode === 'show'"
              hide-details="auto"
              :error-messages="errors.bank_name"
              :persistent-placeholder="mode === 'show'"
            ></v-text-field>
          </v-col>
          <v-col
            cols="2"
          >
            <v-text-field
              v-model="optionsLocal.bank_account_no"
              outlined
              dense
              label="Account No."
              :readonly="mode === 'show'"
              hide-details="auto"
              :error-messages="errors.bank_account_no"
              :persistent-placeholder="mode === 'show'"
            ></v-text-field>
          </v-col>
          <v-col
            cols="4"
          >
            <v-text-field
              v-model="optionsLocal.bank_account_address"
              :error-messages="errors.bank_account_address"
              outlined
              dense
              label="Bank Address"
              :readonly="mode === 'show'"
              :persistent-placeholder="true"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-alert
              color="primary"
              text
              style="margin-top: 25px; margin-bottom: -10px"
            >
              <div class="d-flex align-start">
                <div class="ms-3">
                  <p class="text-base font-weight-medium mb-1">
                    Raw Materials
                  </p>
                </div>
              </div>
            </v-alert>
          </v-col>
          <v-col
            cols="6"
          >
            <v-select
              v-model="optionsLocal.product_ids"
              dense
              outlined
              multiple
              :prepend-inner-icon="icons.mdiHumanEdit"
              item-text="name"
              item-value="id"
              label="Raw Materials"
              :items="rawMaterials"
              hide-details="auto"
            ></v-select>
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
import { computed, ref, onMounted, watch } from '@vue/composition-api'
import router from '@/router'
import store from '@/store'
import { CREATE_SUPPLIER, UPDATE_SUPPLIER, GET_PRODUCTS } from '@/store/actions.type'
import { mdiAlertOutline } from '@mdi/js'

export default {
  props: {
    informationData: {
      type: Object,
      default: () => ({
        name: '',
        contact_person: '',
        address: '',
        bank_details: '',
        bank_account_no: '',
      }),
    },
    mode: {
      type: String,
    },
  },
  setup(props) {
    const errors = computed(() => store.getters.errors)
    const optionsLocal = computed(() => props.informationData)

    const rawMaterials = computed(() => store.getters.products)
    const showAlert = ref(false)
    const buttonLabel = props.mode === 'create' ? 'Save' : 'Update'

    const goBack = () => {
      router.push('/suppliers')
    }

    const resolveFormSuccess = () => {
      showAlert.value = true
      setTimeout(() => {
        goBack()
      }, 5000)
    }

    watch(optionsLocal, value => {
      if (props.mode === 'update') {
        optionsLocal.value.product_ids = optionsLocal.value.products?.map(product => product.id)
      }
    })

    const save = () => {
      const form = optionsLocal.value

      if (props.mode === 'update') {
        store.dispatch(UPDATE_SUPPLIER, form).then(data => {
          if (data != null) {
            resolveFormSuccess()
          }
        })
      }

      if (props.mode === 'create') {
        store.dispatch(CREATE_SUPPLIER, form).then(data => {
          if (data != null) {
            resolveFormSuccess()
          }
        })
      }
    }

    onMounted(() => {
      store.dispatch(GET_PRODUCTS)
    })

    return {
      icons: {
        mdiAlertOutline,
      },
      rawMaterials,
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
