<template>
  <v-card>
    <v-row>
      <v-col cols="3">
        <v-select
          v-model="product.product_id"
          label="Raw Material"
          item-text="name"
          item-value="id"
          dense
          :items="productDropdown"
          :item-disabled="handleDisabledItem"
        ></v-select>
      </v-col>

      <v-col cols="3">
        <v-text-field
          v-model="product.total_boxes"
          label="Total Boxes"
          hide-details="auto"
          dense
          @keypress="handleIsNumber"
        />
      </v-col>

      <v-col cols="3">
        <v-text-field
          v-model="product.total_pieces"
          disabled
          label="Total Pieces"
          hide-details="auto"
          dense
          @keypress="handleIsNumber"
        />
      </v-col>

      <v-col cols="1">
        <v-btn
          v-show="itemNumber !== productDropdown.length"
          class="mx-2"
          x-small
          fab
          :disabled="isDisabled"
          @click="addProductRow"
        >
          <v-icon dark>
            {{ icons.mdiPlus }}
          </v-icon>
        </v-btn>
      </v-col>
      <v-col cols="1">
        <v-btn
          class="mx-2"
          x-small
          fab
          @click="removeProduct"
        >
          <v-icon dark>
            {{ icons.mdiMinus }}
          </v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { ref, watch, toRef } from '@vue/composition-api/dist/vue-composition-api'

import {
  mdiMinus,
  mdiPlus,
} from '@mdi/js'

export default {
  name: 'RawMaterialAddSelector',
  props: {
    productData: {
      type: Object,
      required: true,
    },
    itemNumber: {
      type: Number,
      default: 0,
    },
    productDropdown: {
      type: Array,
      default: () => [],
    },
  },
  setup(props, { emit }) {
    const product = toRef(props, 'productData')
    const productSelection = ref([])
    const isDisabled = ref(true)

    if (product.value.id) {
      isDisabled.value = false
    }

    const handleIsNumber = evt => {
      const event = (evt) || window.event
      const code = (event.which) ? event.which : event.keyCode

      if ((code > 31 && (code < 48 || code > 57)) && code !== 46) {
        event.preventDefault()

        return false
      }

      return true
    }

    const addProductRow = () => {
      emit('addProductRow', product)
    }

    const removeProduct = () => {
      emit('removeProductRow', props.itemNumber)
    }

    // disable item in dropdown
    const handleDisabledItem = item => (!!item.disabled)

    watch(
      product,
      () => {
        if (product.value.id) {
          isDisabled.value = false
        }
      },
    )

    watch(
      product.value,
      () => {
        if (product.value.total_boxes) {
          const productModel = props.productDropdown.find(item => item.id === product.value.product_id)

          product.value.total_pieces = parseInt(product.value.total_boxes, 0) * productModel?.items_per_box
        }

        if (product.value.product_id && product.value.total_pieces && product.value.total_boxes) {
          isDisabled.value = false
        } else {
          isDisabled.value = true
        }
      },
    )

    return {
      addProductRow,
      removeProduct,
      product,
      productSelection,
      isDisabled,
      icons: {
        mdiPlus,
        mdiMinus,
      },
      handleIsNumber,
      handleDisabledItem,
    }
  },
}
</script>
