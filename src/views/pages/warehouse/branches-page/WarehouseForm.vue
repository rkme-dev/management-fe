<template>
  <v-form class="pa-3">
    <v-row>
      <v-col cols="12">
        <v-alert
          color="primary"
          text
          style="margin-bottom: -10px"
        >
          <div class="d-flex align-start">
            <v-icon color="primary">
              {{ icons.mdiAlertOutline }}
            </v-icon>

            <div class="ms-3">
              <p class="text-base font-weight-medium mb-1">
                Warehouse Information
              </p>
            </div>
          </div>
        </v-alert>
      </v-col>
      <v-col
        cols="6"
        mb="6"
      >
        <v-text-field
          id="email"
          v-model="form.name"
          :prepend-inner-icon="icons.mdiEmailOutline"
          :error-messages="errors.name"
          outlined
          dense
          hide-details="auto"
          placeholder="Name*"
          label="Name"
        ></v-text-field>
      </v-col>
      <v-col
        cols="6"
        mb="6"
      >
        <v-select
          v-model="form.status"
          dense
          outlined
          placeholder="Status*"
          :prepend-inner-icon="icons.mdiListStatus"
          :error-messages="errors.status"
          :items="statusOptions"
          label="Status"
        ></v-select>
      </v-col>
      <v-col
        cols="6"
        mb="6"
      >
        <v-textarea
          id="email"
          v-model="form.address"
          :prepend-inner-icon="icons.mdiEmailOutline"
          :error-messages="errors.address"
          outlined
          dense
          hide-details="auto"
          placeholder="Address*"
          label="Address"
        ></v-textarea>
      </v-col>
      <v-col
        cols="6"
        mb="6"
      >
        <v-text-field
          id="email"
          v-model="form.contact_number"
          :prepend-inner-icon="icons.mdiCellphone"
          :error-messages="errors.contact_number"
          outlined
          dense
          hide-details="auto"
          placeholder="Contact Number"
          label="Contact Number"
        ></v-text-field>
      </v-col>
      <v-col
        cols="6"
        mb="6"
      >
        <v-checkbox
          v-model="form.is_main"
          label="Main Branch"
          class="mt-0"
          hide-details
        ></v-checkbox>
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
</template>

<script>
import {
  computed, ref, toRef, watch,
} from '@vue/composition-api'
import {
  mdiAccountOutline,
  mdiEmailOutline,
  mdiCellphone,
  mdiLockOutline,
} from '@mdi/js'
import store from '@/store'
import router from '@/router'

export default {
  name: 'WarehouseForm',
  props: {
    warehouse: {
      type: Object,
      required: false,
      default: null,
    },
  },
  setup(props) {
    const warehouseData = toRef(props, 'warehouse')
    const form = ref({
      name: '',
      address: '',
      contact_number: '',
      is_main: null,
      status: 'Active',
    })

    watch(
      warehouseData, () => {
        if (warehouseData.value.id !== null) {
          form.value = warehouseData.value
        }
      },
    )

    const errors = computed(() => store.state.WarehouseStore.errors)

    const statusOptions = [
      'Active',
      'Deactivated',
      'Inactive',
    ]

    const cancel = () => {
      router.push('/warehouses')
    }

    const submit = () => {
      const payload = {
        status: form.value.status,
        name: form.value.name,
        address: form.value.address,
        contact_number: form.value.contact_number,
        is_main: form.value.is_main ?? false,
      }

      if (warehouseData.value.id !== null) {
        payload.id = warehouseData.value.id

        store.dispatch('WarehouseStore/update', payload).then(
          response => {
            if (response.status === undefined) {
              router.push('/warehouses')
            }
          },
        )
      } else {
        store.dispatch('WarehouseStore/create', payload).then(
          response => {
            if (response.status === undefined) {
              router.push('/warehouses')
            }
          },
        )
      }
    }

    return {
      cancel,
      errors,
      icons: {
        mdiAccountOutline,
        mdiEmailOutline,
        mdiCellphone,
        mdiLockOutline,
      },
      form,
      statusOptions,
      submit,
    }
  },
}
</script>

<style scoped>

</style>
