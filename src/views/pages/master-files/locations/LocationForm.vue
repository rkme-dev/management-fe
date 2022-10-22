<template>
  <v-form>
    <v-row>
      <v-col
        cols="4"
        md="3"
      >
        <label for="firstnameHorizontalIcons">Location Code</label>
      </v-col>

      <v-col
        cols="7"
        md="7"
      >
        <v-text-field
          id="firstnameHorizontalIcons"
          v-model="locationData.location_code"
          outlined
          dense
          :error-messages="errors.location_code"
          placeholder="Location code"
          hide-details="auto"
        ></v-text-field>
      </v-col>
      <v-col
        cols="4"
        md="3"
      >
        <label for="firstnameHorizontalIcons">Description</label>
      </v-col>

      <v-col
        cols="7"
      >
        <v-textarea
          id="firstnameHorizontalIcons"
          v-model="locationData.description"
          outlined
          dense
          rows="2"
          :error-messages="errors.description"
          placeholder="Description"
          hide-details="auto"
        ></v-textarea>
      </v-col>
      <v-col
        cols="4"
        md="3"
      >
        <label for="firstnameHorizontalIcons">Address</label>
      </v-col>

      <v-col
        cols="7"
      >
        <v-textarea
          id="firstnameHorizontalIcons"
          v-model="locationData.address"
          rows="3"
          outlined
          dense
          :error-messages="errors.address"
          placeholder="Address"
          hide-details="auto"
        ></v-textarea>
      </v-col>
      <v-col
        cols="4"
        md="3"
      >
        <label for="firstnameHorizontalIcons">Type</label>
      </v-col>

      <v-col
        cols="7"
        md="7"
      >
      <v-select
          v-model="locationData.type"
          :items="typeList"
          filled
          label="Filled style"
        ></v-select>
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
          v-model="locationData.is_active"
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
    document: {
      type: Object,
      required: false,
      default: null,
    },
  },
  setup(props, { emit }) {
    const documentProp = toRef(props, 'document')

    const typeList = [
      'Office',
      'Warehouse',
    ]

    const locationData = ref({
      location_code: null,
      description: null,
      address: null,
      type: null,
      is_active: false,
    })

    if (props.mode === 'edit') {
      locationData.value = documentProp.value

      if (locationData.value.is_active === 'Inactive') {
        locationData.value.is_active = 0
      } else {
        locationData.value.is_active = 1
      }
    }

    watch(documentProp, () => {
      if (props.mode === 'edit') {
        locationData.value = documentProp.value

        if (locationData.value.is_active === 'Inactive') {
          locationData.value.is_active = 0
        } else {
          locationData.value.is_active = 1
        }
      } else {
        locationData.value = {
          location_code: null,
          description: null,
          address: null,
          type: null,
          is_active: false,
        }
      }
    })

    const errors = computed(() => store.state.LocationStore.errors)

    const cancel = () => {
      emit('clicked', false)
    }

    const submit = () => {
      if (locationData.value.id === undefined) {
        store.dispatch('LocationStore/create', locationData.value).then(
          response => {
            if (response.status === undefined) {
              emit('clicked', {
                alertType: 'success',
                alertMessage: 'Successfully Added a Location.',
              })
              store.dispatch('LocationStore/list')
            }
          },
        )
      } else {
        store.dispatch('LocationStore/update', locationData.value).then(
          response => {
            if (response.status === undefined) {
              emit('clicked', {
                alertType: 'success',
                alertMessage: 'Successfully updated a Location.',
              })
              store.dispatch('LocationStore/list')
            }
          },
        )
      }
    }

    return {
      cancel,
      errors,
      locationData,
      submit,
      typeList,
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
