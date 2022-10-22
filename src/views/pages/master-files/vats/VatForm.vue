<template>
  <v-form>
    <v-row>
      <v-col
        cols="4"
        md="3"
      >
        <label for="firstnameHorizontalIcons">VAT Code</label>
      </v-col>

      <v-col
        cols="7"
        md="7"
      >
        <v-text-field
          id="firstnameHorizontalIcons"
          v-model="vatData.code"
          outlined
          dense
          :error-messages="errors.code"
          placeholder="VAT Code"
          hide-details="auto"
        ></v-text-field>
      </v-col>
      <v-col
        cols="4"
        md="3"
      >
        <label for="firstnameHorizontalIcons">Name</label>
      </v-col>

      <v-col
        cols="7"
      >
        <v-textarea
          id="firstnameHorizontalIcons"
          v-model="vatData.name"
          outlined
          dense
          rows="2"
          :error-messages="errors.name"
          placeholder="Name"
          hide-details="auto"
        ></v-textarea>
      </v-col>
      <v-col
        cols="4"
        md="3"
      >
        <label for="firstnameHorizontalIcons">Notes</label>
      </v-col>

      <v-col
        cols="7"
      >
        <v-textarea
          id="firstnameHorizontalIcons"
          v-model="vatData.notes"
          rows="3"
          outlined
          dense
          :error-messages="errors.notes"
          placeholder="Notes"
          hide-details="auto"
        ></v-textarea>
      </v-col>
      <v-col
        cols="4"
        md="3"
      >
        <label for="firstnameHorizontalIcons">Vat Percentage</label>
      </v-col>

      <v-col
        cols="7"
        md="7"
      >
        <v-text-field
          id="firstnameHorizontalIcons"
          v-model="vatData.percentage"
          outlined
          type="number"
          dense
          :error-messages="errors.percentage"
          placeholder="Percentage"
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
          v-model="vatData.is_active"
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
    vat: {
      type: Object,
      required: false,
      default: null,
    },
  },
  setup(props, { emit }) {
    const vatProp = toRef(props, 'vat')

    const vatData = ref({
      code: null,
      description: null,
      days: 0,
      notes: null,
      is_active: false,
    })

    if (props.mode === 'edit') {
      vatData.value = vatProp.value

      if (vatData.value.is_active === 'Inactive') {
        vatData.value.is_active = 0
      } else {
        vatData.value.is_active = 1
      }
    }

    watch(vatProp, value => {
      if (props.mode === 'edit') {
        vatData.value = vatProp.value

        if (vatData.value.is_active === 'Inactive') {
          vatData.value.is_active = 0
        } else {
          vatData.value.is_active = 1
        }
      } else {
        vatData.value = {
          code: null,
          name: null,
          percentage: 0,
          notes: null,
          is_active: false,
        }
      }
    })

    const errors = computed(() => store.state.VatStore.errors)

    const cancel = () => {
      emit('clicked', false)
    }

    const submit = () => {
      if (vatData.value.id === undefined) {
        store.dispatch('VatStore/create', vatData.value).then(
          response => {
            if (response.status === undefined) {
              emit('clicked', {
                alertType: 'success',
                alertMessage: 'Successfully Added a VAT.',
              })
              store.dispatch('VatStore/list')
            }
          },
        )
      } else {
        store.dispatch('VatStore/update', vatData.value).then(
          response => {
            if (response.status === undefined) {
              emit('clicked', {
                alertType: 'success',
                alertMessage: 'Successfully Added a VAT.',
              })
              store.dispatch('VatStore/list')
            }
          },
        )
      }
    }

    return {
      cancel,
      errors,
      vatData,
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
