<template>
  <div>
    <v-card
      class="overflow-hidden"
      elevation="3"
    >
      <v-row class="">
        <v-col cols="8">
          <v-select
            v-if="!isSupplierDisabled"
            v-model="supplier"
            class="white--text mb-3 pt-6 pl-6 pb-4"
            placeholder="Select a Supplier"
            label="Supplier *"
            item-text="name"
            item-value="id"
            dense
            :items="suppliers"
            :error-messages="errors.supplier_id"
            return-object
          ></v-select>
        </v-col>
        <v-col
          v-if="supplier.id"
          cols="12"
          sm="8"
          md="12"
          lg="8"
          order="2"
          order-lg="1"
        >
          <v-card-title>Supplier details</v-card-title>
          <v-card-text>
            <v-divider></v-divider>
          </v-card-text>
          <v-card-actions class="d-flex justify-center">
            <div class="me-auto pe-2">
              <p class="d-flex align-center mb-6">
                <v-icon color="primary">
                  {{ icons.mdiLockOpenOutline }}
                </v-icon>
                <span class="ms-3 white--text">
                  {{ supplier.name }}
                </span>
              </p>
              <p class="d-flex align-center mb-6 white--text">
                <v-icon color="primary">
                  {{ icons.mdiCardAccountPhoneOutline }}
                </v-icon>
                <span class="ms-3 white--text">
                  {{ supplier.contact_person }}
                </span>
              </p>
              <p class="d-flex align-center mb-6 white--text">
                <v-icon color="primary">
                  {{ icons.mdiWarehouse }}
                </v-icon>
                <span class="ms-3 white--text">
                  {{ supplier.address }}
                </span>
              </p>
            </div>

            <v-divider
              v-if="$vuetify.breakpoint.smAndUp"
              vertical
              inset
            >
            </v-divider>

            <div class="me-auto ps-4">
              <p class="d-flex align-center mb-6 white--text">
                <v-icon color="primary">
                  {{ icons.mdiBank }}
                </v-icon>
                <span class="ms-3 white--text"> {{ supplier.bank_details }}</span>
              </p>
              <p class="d-flex align-center mb-0">
                <v-icon color="primary">
                  {{ icons.mdiBankPlus }}
                </v-icon>
                <span class="ms-3 white--text"> {{ supplier.account_no }}</span>
              </p>
            </div>
          </v-card-actions>
        </v-col>
        <v-col
          v-show="supplier.id"
          cols="12"
          sm="4"
          md="12"
          lg="4"
          order="1"
          order-lg="2"
        >
          <v-img
            class="mt-10"
            aspect-ratio="1.7"
            max-height="250"
            contain
            lazy-src="https://specright.com/wp-content/uploads/2019/12/Supplier-and-Vendor-Cooperation.jpg"
            src="https://specright.com/wp-content/uploads/2019/12/Supplier-and-Vendor-Cooperation.jpg"
          ></v-img>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
import {
  APPROVE_PURCHASE_ORDER,
  GET_PRODUCTS,
  GET_SUPPLIERS,
} from '@/store/actions.type'
import {
  watch,
  computed,
  toRef,
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
  mdiBankPlus,
} from '@mdi/js'
import store from '@/store'

export default {
  props: {
    title: {
      type: String,
      default: 'Supplier detail',
    },
    supplierData: {
      type: Object,
      default: null,
    },
    supplierDisabled: {
      type: Boolean,
      required: false,
      default: null,
    },
  },
  setup(props, { emit }) {
    const supplier = toRef(props, 'supplierData')
    const errors = computed(() => store.getters.errors)
    const suppliers = computed(() => store.getters.suppliers)
    const isSupplierDisabled = toRef(props, 'supplierDisabled')

    isSupplierDisabled.value = isSupplierDisabled.value ?? false

    store.dispatch(GET_SUPPLIERS)

    watch(supplier, newValue => {
      emit('getData', {
        supplier_id: newValue.id,
      })
    })

    return {
      supplier,
      suppliers,
      errors,
      isSupplierDisabled,
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
      },
    }
  },
}
</script>
