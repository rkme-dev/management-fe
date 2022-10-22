<template>
  <v-card>
    <v-row>
      <v-col cols="7">
        <v-select
          v-model="product.product_id"
          label="Select a Product"
          item-text="name"
          item-value="id"
          dense
          :items="productDropdown"
          :item-disabled="handleDisabledItem"
          :error-messages="errors.product"
        ></v-select>
      </v-col>

      <v-col cols="4">
        <v-text-field
          v-model="product.quantity"
          label="Quantity"
          hide-details="auto"
          dense
          :error-messages="errors.quantity"
          @keypress="handleIsNumber"
        />
      </v-col>

      <v-col cols="1">
        <v-btn
          class="mx-2"
          x-small
          fab
          :disabled="isDisabled"
          @click="$emit('addProductRow')"
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
import {ref, watch, reactive, computed} from '@vue/composition-api/dist/vue-composition-api'

import {
  mdiPlus
} from '@mdi/js'

export default {
  props: {
    itemNumber: {
      type: Number,
      default: 0,
    },
    productDropdown: {
      type: Array,
      default: () => [],
    },
    formSubmit: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, {emit}) {
    const formSubmission = computed(() => props.formSubmit)
    const product = reactive({product_id: null, quantity: null})
    const productSelection = ref([])
    const isDisabled = ref(true)
    const errors = reactive({quantity: ''})

    const handleIsNumber = (evt) => {
      evt = (evt) ? evt : window.event;
      const code = (evt.which) ? evt.which : evt.keyCode;
      if ((code > 31 && (code < 48 || code > 57)) && code !== 46) {
        evt.preventDefault()
      } else {
        return true
      }
    }

    // disable item in dropdown
    const handleDisabledItem = item => {
      return item.disabled ? true : false
    }


    watch(
      product,
      () => {
        if (product.product_id && product.quantity) isDisabled.value = false
        else isDisabled.value = true

        emit('selectedProduct', {...product, quantity: Number(product.quantity)}, props.itemNumber)
      },
    )

    watch(
      formSubmission,
      value => {
        if (value === true) {
          errors.value = {product: null, quantity: null}

          if (product.product_id === null) {
            errors.product = 'Please select a product.'
          }

          if (product.quantity === null) {
            errors.quantity = 'Quantity is required.'
          }
        }
      },
    )

    return {
      product,
      productSelection,
      isDisabled,
      icons: {
        mdiPlus,
      },
      handleIsNumber,
      handleDisabledItem,
      errors,
    }
  }
}
</script>
