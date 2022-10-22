<template>
  <v-form>
    <v-row>
      <v-col
        cols="4"
        md="3"
      >
        <label for="firstnameHorizontalIcons">Name</label>
      </v-col>

      <v-col
        cols="7"
      >
        <v-text-field
          id="firstnameHorizontalIcons"
          v-model="formData.name"
          outlined
          dense
          :error-messages="errors.name"
          placeholder="Name"
          hide-details="auto"
        ></v-text-field>
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
          v-model="formData.is_active"
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
    row: {
      type: Object,
      required: false,
      default: null,
    },
  },
  setup(props, { emit }) {
    const rowProp = toRef(props, 'row')

    const formData = ref({
      name: null,
      is_active: true,
    })

    if (props.mode === 'edit') {
      formData.value = rowProp.value

      if (formData.value.is_active === 'Inactive') {
        formData.value.is_active = 0
      } else {
        formData.value.is_active = 1
      }
    }

    watch(rowProp, value => {
      if (props.mode === 'edit') {
        formData.value = rowProp.value

        if (formData.value.is_active === 'Inactive') {
          formData.value.is_active = 0
        } else {
          formData.value.is_active = 1
        }
      } else {
        formData.value = {
          code: null,
          name: null,
          percentage: 0,
          notes: null,
          is_active: false,
        }
      }
    })

    const errors = computed(() => store.state.UnitPackingStore.errors)

    const cancel = () => {
      emit('clicked', false)
    }

    const submit = () => {
      if (formData.value.id === undefined) {
        store.dispatch('UnitPackingStore/create', formData.value).then(
          response => {
            if (response.status === undefined) {
              emit('clicked', {
                alertType: 'success',
                alertMessage: 'Successfully Added a Unit.',
              })
              store.dispatch('UnitPackingStore/list')
            }
          },
        )
      } else {
        store.dispatch('UnitPackingStore/update', formData.value).then(
          response => {
            if (response.status === undefined) {
              emit('clicked', {
                alertType: 'success',
                alertMessage: 'Successfully Added a Vat.',
              })
              store.dispatch('UnitPackingStore/list')
            }
          },
        )
      }
    }

    return {
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
