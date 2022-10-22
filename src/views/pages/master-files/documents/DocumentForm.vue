<template>
  <v-form>
    <v-row>
      <v-col
        cols="4"
        md="3"
      >
        <label for="firstnameHorizontalIcons">Document Name</label>
      </v-col>

      <v-col
        cols="7"
        md="7"
      >
        <v-text-field
          id="firstnameHorizontalIcons"
          v-model="documentData.document_name"
          outlined
          dense
          :error-messages="errors.name"
          placeholder="Document Name"
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
          v-model="documentData.description"
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
        <label for="firstnameHorizontalIcons">Notes</label>
      </v-col>

      <v-col
        cols="7"
      >
        <v-textarea
          id="firstnameHorizontalIcons"
          v-model="documentData.notes"
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
        <label for="firstnameHorizontalIcons">Module</label>
      </v-col>

      <v-col
        cols="7"
        md="7"
      >
      <v-select
          v-model="documentData.module"
          :items="modulesList"
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
          v-model="documentData.is_active"
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

    const modulesList = [
      'Purchase Order',
      'Sales',
      'Orders',
      'Trip-ticket',
      'Collection',
      'Deposit',
    ]

    const documentData = ref({
      document_name: null,
      description: null,
      module: null,
      notes: null,
      is_active: false,
    })

    if (props.mode === 'edit') {
      documentData.value = documentProp.value

      if (documentData.value.is_active === 'Inactive') {
        documentData.value.is_active = 0
      } else {
        documentData.value.is_active = 1
      }
    }

    watch(documentProp, () => {
      if (props.mode === 'edit') {
        documentData.value = documentProp.value

        if (documentData.value.is_active === 'Inactive') {
          documentData.value.is_active = 0
        } else {
          documentData.value.is_active = 1
        }
      } else {
        documentData.value = {
          document_name: null,
          description: null,
          module: null,
          notes: null,
          is_active: false,
        }
      }
    })

    const errors = computed(() => store.state.DocumentStore.errors)

    const cancel = () => {
      emit('clicked', false)
    }

    const submit = () => {
      if (documentData.value.id === undefined) {
        store.dispatch('DocumentStore/create', documentData.value).then(
          response => {
            if (response.status === undefined) {
              emit('clicked', {
                alertType: 'success',
                alertMessage: 'Successfully Added a Document.',
              })
              store.dispatch('DocumentStore/list')
            }
          },
        )
      } else {
        store.dispatch('DocumentStore/update', documentData.value).then(
          response => {
            if (response.status === undefined) {
              emit('clicked', {
                alertType: 'success',
                alertMessage: 'Successfully updated a Document.',
              })
              store.dispatch('DocumentStore/list')
            }
          },
        )
      }
    }

    return {
      cancel,
      errors,
      documentData,
      submit,
      modulesList,
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
