<template>
  <v-form>
    <v-row>
      <v-col
        cols="12"
      >
        <v-switch
          v-model="formData.active"
          :error-messages="errors.active"
          label="Active"
        ></v-switch>
      </v-col>
      <v-col
        cols="1"
      >
        <label for="rawMaterialName">Name</label>
      </v-col>

      <v-col
        cols="4"
        class="mr-16"
      >
        <v-text-field
          id="rawMaterialName"
          v-model="formData.name"
          outlined
          dense
          :error-messages="errors.name"
          label="Name"
          hide-details="auto"
        ></v-text-field>
      </v-col>

      <v-col
        cols="2"
      >
        <label for="rawMaterialSKU">SKU / Product Code</label>
      </v-col>

      <v-col
        cols="4"
      >
        <v-text-field
          id="rawMaterialSKU"
          v-model="formData.sku"
          outlined
          dense
          :error-messages="errors.sku"
          label="SKU / Product Code"
          hide-details="auto"
        ></v-text-field>
      </v-col>
      <v-col
        cols="1"
      >
        <label for="rawMaterialBrand">Brand</label>
      </v-col>

      <v-col
        cols="4"
        class="mr-16"
      >
        <v-text-field
          id="rawMaterialBrand"
          v-model="formData.brand"
          outlined
          dense
          :error-messages="errors.brand"
          label="Brand"
          hide-details="auto"
        ></v-text-field>
      </v-col>
      <v-col
        cols="2"
      >
        <label for="rawMaterialGrouping">Grouping</label>
      </v-col>

      <v-col
        cols="4"
      >
        <v-text-field
          id="rawMaterialGrouping"
          v-model="formData.grouping"
          outlined
          dense
          :error-messages="errors.grouping"
          label="Grouping"
          hide-details="auto"
        ></v-text-field>
      </v-col>
      <v-col
        cols="1"
      >
        <label for="rawMaterialCost">Cost</label>
      </v-col>

      <v-col
        cols="4"
        class="mr-16"
      >
        <v-currency-field
          id="rawMaterialCost"
          v-model="formData.price"
          outlined
          dense
          :error-messages="errors.price"
          label="Cost"
          hide-details="auto"
        ></v-currency-field>
      </v-col>
      <v-col
        cols="2"
      >
        <label for="rawMaterialInventoryUnit">Inventory Unit</label>
      </v-col>

      <v-col
        cols="4"
      >
        <v-select
          v-model="formData.unit_id"
          :items="units"
          item-text="name"
          item-value="id"
          label="Inventory Unit"
          :error-messages="errors.unit_id"
          outlined
          dense
          clearable
          hide-details="auto"
        ></v-select>
      </v-col>
      <v-col
        cols="1"
      >
        <label for="rawMaterialType">Type</label>
      </v-col>
      <v-col
        cols="4"
        class="mr-16"
      >
        <v-select
          v-model="formData.type"
          :items="rawTypes"
          item-text="label"
          item-value="value"
          label="Raw Material Type"
          :error-messages="errors.type"
          outlined
          dense
          clearable
          hide-details="auto"
        ></v-select>
      </v-col>
      <v-col
        v-if="formData.type === 'preform'"
        cols="2"
      >
        <label for="rawMaterialType">Blown Bottles</label>
      </v-col>
      <v-col
        v-if="formData.type === 'preform'"
        cols="4"
        class="mr-12"
      >
        <v-select
          v-model="formData.raw_material_id"
          :items="blownBottles"
          item-text="name"
          item-value="id"
          label="Blown Bottles"
          :error-messages="errors.raw_material_id"
          outlined
          dense
          clearable
          hide-details="auto"
        ></v-select>
      </v-col>
      <v-col
        cols="4"
        md="3"
      >
      </v-col>
      <v-col
        cols="12"
      >
        <unit-and-packing-form
          class="mt-6"
          :existing-units="formData.units"
          @addedUnitPacking="addUnitPacking"
        >
        </unit-and-packing-form>
      </v-col>
      <v-col
        offset-md="5"
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
import UnitAndPackingForm from '@/views/pages/master-files/raw-materials/UnitAndPackingForm.vue'
import RawMaterialsMixin from '@/components/mixins/RawMaterialsMixin'

export default {
  components: {
    UnitAndPackingForm,
  },
  mixins: [
    RawMaterialsMixin,
  ],
  props: {
    mode: {
      type: String,
      required: true,
      default: null,
    },
    row: {
      type: Object,
      required: false,
      default: null,
    },
  },
  computed: {
    rawTypes() {
      return RawMaterialsMixin.computed.rawMaterialsType()
    }
  },
  setup(props, { emit }) {
    store.dispatch('UnitPackingStore/list')

    const rowProp = toRef(props, 'row')
    const units = computed(() => store.state.UnitPackingStore.list)
    const blownBottles = computed(() => store.state.RawMaterialStore.list.filter(rawMaterial => rawMaterial.type === 'blown_bottle'))
    const formData = ref({})

    formData.value = JSON.parse(JSON.stringify(rowProp.value))

    if (props.mode === 'edit') {
      if (formData.value.active === 'Inactive') {
        formData.value.active = false
      } else {
        formData.value.active = true
      }
    } else {
      formData.value = {
        code: null,
        name: null,
        percentage: 0,
        notes: null,
        active: false,
        units: [],
        type: null,
      }
    }

    watch(rowProp, () => {
      formData.value = JSON.parse(JSON.stringify(rowProp.value))

      if (props.mode === 'edit') {
        if (formData.value.active === 'Inactive') {
          formData.value.active = 0
        } else {
          formData.value.active = 1
        }
      } else {
        formData.value = {
          code: null,
          name: null,
          percentage: 0,
          notes: null,
          active: false,
          units: [],
          type: null,
        }
      }
    })

    const errors = computed(() => store.state.RawMaterialStore.errors)

    const addUnitPacking = unitAndPacking => {
      formData.value.units.push(unitAndPacking)
    }

    const cancel = () => {
      store.dispatch('RawMaterialStore/removeErrors')
      emit('submit', false)
    }

    const submit = () => {
      if (formData.value.id === undefined) {
        store.dispatch('RawMaterialStore/create', formData.value).then(
          response => {
            if (response.status === undefined) {
              emit('submit', false)

              emit('clicked', {
                alertType: 'success',
                alertMessage: 'Successfully Added.',
              })
              store.dispatch('RawMaterialStore/list')
            }
          },
        )
      } else {
        store.dispatch('RawMaterialStore/update', formData.value).then(
          response => {
            if (response.status === undefined) {
              emit('submit', false)

              emit('clicked', {
                alertType: 'success',
                alertMessage: 'Successful Update.',
              })
              store.dispatch('RawMaterialStore/list')
            }
          },
        )
      }
    }

    return {
      addUnitPacking,
      blownBottles,
      units,
      cancel,
      errors,
      formData,
      submit,
    }
  },
  methods: {
  },
}
</script>
