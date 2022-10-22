<template>
  <v-card
    id="raw-mats-release-form-card"
  >
    <v-card-title>Raw Materials Release Form</v-card-title>
    <v-alert
      v-show="isRawMaterialsEmpty"
      dense
      text
      type="error"
      dismissible
    >
      Raw Materials are required
    </v-alert>
    <v-form class="pa-3">
      <v-row>
        <v-col
          cols="12"
        >
          <div
            v-for="(item, index) in attachedProducts"
            :key="index"
          >
            <raw-material-add-selector
              :product-data="item"
              :product-dropdown="productDropdown"
              :item-number="index"
              @removeProductRow="handleRemoveProductRow"
              @addProductRow="handleAddProductRow"
            />
          </div>
        </v-col>

        <v-col
          cols="12"
          md="9"
        >
          <v-textarea
            id="description"
            v-model="releaseForm.description"
            outlined
            rows="4"
            label="Description"
            :readonly="false"
            hide-details="auto"
            :prepend-inner-icon="icons.mdiViewList"
            :error-messages="errors.description"
            :persistent-placeholder="false"
          ></v-textarea>
        </v-col>
        <v-col cols="12">
          <v-btn
            color="primary"
            class="me-3 mt-4"
            @click="submit"
          >
            Submit
          </v-btn>
          <v-btn
            color="error"
            outlined
            class="me-3 mt-3"
            type="reset"
            @click.prevent="cancel"
          >
            Cancel
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-card>
</template>

<script>
import {
  ref, computed, onMounted, watch, toRef,
} from '@vue/composition-api'
import {
  mdiAccessPointCheck,
  mdiAccountOutline,
  mdiPuzzle,
  mdiCalendar,
  mdiCellphone,
  mdiEmailOutline, mdiEye, mdiEyeOff,
  mdiGenderNonBinary,
  mdiGroup,
  mdiHomeFloor0,
  mdiHomePlus,
  mdiHumanEdit,
  mdiIdCard,
  mdiIdentifier,
  mdiListStatus,
  mdiLockOutline, mdiOrigin,
  mdiOutdoorLamp,
  mdiPackage, mdiPlusBoxOutline, mdiViewList,
} from '@mdi/js'
import store from '@/store'
import RawMaterialAddSelector from '@/views/pages/warehouse/raw-materials-release/components/RawMaterialAddSelector.vue'
import router from '@/router'

export default {
  name: 'ReleaseForm',
  components: {
    RawMaterialAddSelector,
  },
  props: {
    releaseOrder: {
      type: Object,
      default: () => null,
      required: false,
    },
  },
  setup(props) {
    const releaseOrderData = toRef(props, 'releaseOrder')
    const releaseForm = ref({
      description: '',
    })
    const products = computed(() => store.state.ReleaseOrderStore.rawMaterials)
    const errors = computed(() => store.state.UserAccessManagementStore.errors)
    const selectedProductIds = ref([])
    const attachedProducts = ref([
      {
        product_id: '',
        total_pieces: '',
        total_boxes: '',
        items_per_box: '',
      },
    ])
    const isRawMaterialsEmpty = ref(false)
    const productDropdown = ref([])

    const arrayColumn = (array, column) => array.map(item => item[column])

    const validateSelectedProduct = () => {
      productDropdown.value = productDropdown.value.map(product => {
        // eslint-disable-next-line no-param-reassign
        product.disabled = selectedProductIds.value.includes(product.id)

        return product
      })
    }

    watch(
      products,
      () => {
        productDropdown.value = products.value
        validateSelectedProduct()
      },
      { immediate: true },
    )

    watch(
      releaseOrderData,
      () => {
        attachedProducts.value = releaseOrderData.value.raw_materials
        releaseForm.value.description = releaseOrderData.value.description
        selectedProductIds.value = arrayColumn(releaseOrderData.value.raw_materials, 'product_id')
        validateSelectedProduct()
      },
    )

    const handleRemoveProductRow = index => {
      if (attachedProducts.value.length === 1) {
        attachedProducts.value = [
          {
            product_id: '',
            total_pieces: '',
            total_boxes: '',
          },
        ]

        return
      }

      attachedProducts.value.splice(index, 1)

      selectedProductIds.value = arrayColumn(attachedProducts.value, 'product_id')

      validateSelectedProduct()
    }

    const handleAddProductRow = () => {
      selectedProductIds.value = arrayColumn(attachedProducts.value, 'product_id')

      if (selectedProductIds.value[0] === '') {
        return
      }

      attachedProducts.value.push({
        product_id: '',
        total_pieces: '',
        total_boxes: '',
      })

      validateSelectedProduct()
    }

    onMounted(() => {
      store.dispatch('ReleaseOrderStore/getRawMaterials')
    })

    const submit = () => {
      const rawMaterials = []

      attachedProducts.value.forEach(product => {
        if (product.product_id !== '' && product.total_boxes !== '') {
          rawMaterials.push(product)
        }
      })

      if (rawMaterials.length === 0) {
        isRawMaterialsEmpty.value = true

        return
      }

      const formData = {
        description: releaseForm.value.description,
        raw_materials: rawMaterials,
        id: releaseOrderData.value?.id ?? null,
      }

      if (releaseOrderData.value === null) {
        store.dispatch('ReleaseOrderStore/createReleaseOrder', formData)
          .then(
            response => {
              if (response.status === undefined) {
                router.push('/raw-materials-release')
              }
            },
          )

        return
      }

      store.dispatch('ReleaseOrderStore/updateReleaseOrder', formData)
        .then(
          response => {
            if (response.status === undefined) {
              store.dispatch('ReleaseOrderStore/getReleaseOrder', releaseOrderData.value.id)
            }
          },
        )
    }

    const cancel = () => {
      router.push('/raw-materials-release')
    }

    return {
      isRawMaterialsEmpty,
      handleRemoveProductRow,
      attachedProducts,
      handleAddProductRow,
      productDropdown,
      cancel,
      submit,
      errors,
      releaseForm,
      products,
      icons: {
        mdiPuzzle,
        mdiViewList,
        mdiPackage,
        mdiOutdoorLamp,
        mdiGenderNonBinary,
        mdiGroup,
        mdiCalendar,
        mdiAccountOutline,
        mdiPlusBoxOutline,
        mdiEmailOutline,
        mdiCellphone,
        mdiAccessPointCheck,
        mdiLockOutline,
        mdiHomeFloor0,
        mdiIdentifier,
        mdiIdCard,
        mdiHomePlus,
        mdiListStatus,
        mdiHumanEdit,
        mdiEye,
        mdiEyeOff,
        mdiOrigin,
      },
    }
  },
}
</script>

<style scoped>

</style>
