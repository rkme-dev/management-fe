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
        <label for="firstnameHorizontalIcons">Name</label>
      </v-col>

      <v-col
        cols="4"
        class="mr-16"
      >
        <v-text-field
          id="firstnameHorizontalIcons"
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
        <label for="firstnameHorizontalIcons">SKU / Product Code</label>
      </v-col>

      <v-col
        cols="4"
      >
        <v-text-field
          id="firstnameHorizontalIcons"
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
        <label for="firstnameHorizontalIcons">Brand</label>
      </v-col>

      <v-col
        cols="4"
        class="mr-16"
      >
        <v-text-field
          id="firstnameHorizontalIcons"
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
        <label for="firstnameHorizontalIcons">Grouping</label>
      </v-col>

      <v-col
        cols="4"
      >
        <v-text-field
          id="firstnameHorizontalIcons"
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
        <label for="firstnameHorizontalIcons">SRP</label>
      </v-col>

      <v-col
        cols="4"
        class="mr-16"
      >
        <v-currency-field
          id="firstnameHorizontalIcons"
          v-model="formData.price"
          outlined
          dense
          :error-messages="errors.price"
          label="SRP"
          hide-details="auto"
        ></v-currency-field>
      </v-col>
      <v-col
        cols="2"
      >
        <label for="firstnameHorizontalIcons">Inventory Unit</label>
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
import UnitAndPackingForm from '@/views/pages/master-files/finish-products/UnitAndPackingForm.vue'

export default {
  components: {
    UnitAndPackingForm,
  },
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
  setup(props, { emit }) {
    store.dispatch('UnitPackingStore/list')

    const rowProp = toRef(props, 'row')
    const units = computed(() => store.state.UnitPackingStore.list)
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
        }
      }
    })

    const errors = computed(() => store.state.FinishProductStore.errors)

    const addUnitPacking = unitAndPacking => {
      formData.value.units.push(unitAndPacking)
    }

    const cancel = () => {
      store.dispatch('FinishProductStore/removeErrors')
      emit('submit', false)
    }

    const submit = () => {
      if (formData.value.id === undefined) {
        store.dispatch('FinishProductStore/create', formData.value).then(
          response => {
            if (response.status === undefined) {
              emit('submit', false)

              emit('clicked', {
                alertType: 'success',
                alertMessage: 'Successfully Added.',
              })
              store.dispatch('FinishProductStore/list')
            }
          },
        )
      } else {
        store.dispatch('FinishProductStore/update', formData.value).then(
          response => {
            if (response.status === undefined) {
              emit('submit', false)

              emit('clicked', {
                alertType: 'success',
                alertMessage: 'Successful Update.',
              })
              store.dispatch('FinishProductStore/list')
            }
          },
        )
      }
    }

    return {
      addUnitPacking,
      units,
      cancel,
      errors,
      formData,
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
