<template>
  <v-form>
    <v-row>
      <v-col
        cols="4"
        md="3"
      >
        <label for="firstnameHorizontalIcons">Term Code</label>
      </v-col>

      <v-col
        cols="7"
        md="7"
      >
        <v-text-field
          id="firstnameHorizontalIcons"
          v-model="termData.code"
          outlined
          dense
          :error-messages="errors.code"
          placeholder="Term Code"
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
          v-model="termData.description"
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
          v-model="termData.notes"
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
        <label for="firstnameHorizontalIcons">Actual Days</label>
      </v-col>

      <v-col
        cols="7"
        md="7"
      >
        <v-text-field
          id="firstnameHorizontalIcons"
          v-model="termData.days"
          outlined
          type="number"
          min="0"
          step="1"
          onfocus="this.previousValue = this.value"
          onkeydown="this.previousValue = this.value"
          oninput="validity.valid || (value = this.previousValue)"
          dense
          :error-messages="errors.days"
          placeholder="Days"
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
          v-model="termData.is_active"
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
    term: {
      type: Object,
      required: false,
      default: null,
    },
  },
  setup(props, { emit }) {
    const termProp = toRef(props, 'term')

    const termData = ref({
      code: null,
      description: null,
      days: 0,
      notes: null,
      is_active: true,
    })

    if (props.mode === 'edit') {
      termData.value = termProp.value

      if (termData.value.is_active === 'Inactive') {
        termData.value.is_active = 0
      } else {
        termData.value.is_active = 1
      }
    }

    watch(termProp, value => {
      if (props.mode === 'edit') {
        termData.value = termProp.value

        if (termData.value.is_active === 'Inactive') {
          termData.value.is_active = 0
        } else {
          termData.value.is_active = 1
        }
      } else {
        termData.value = {
          code: null,
          description: null,
          days: 0,
          notes: null,
          is_active: false,
        }
      }
    })

    const errors = computed(() => store.state.TermStore.errors)

    const cancel = () => {
      emit('clicked', false)
    }

    const submit = () => {
      if (termData.value.id === undefined) {
        store.dispatch('TermStore/create', termData.value).then(
          response => {
            if (response.status === undefined) {
              emit('clicked', {
                alertType: 'success',
                alertMessage: 'Successfully Added a Term.',
              })
              store.dispatch('TermStore/list')
            }
          },
        )
      } else {
        store.dispatch('TermStore/update', termData.value).then(
          response => {
            if (response.status === undefined) {
              emit('clicked', {
                alertType: 'success',
                alertMessage: 'Successfully Added a Term.',
              })
              store.dispatch('TermStore/list')
            }
          },
        )
      }
    }

    return {
      cancel,
      errors,
      termData,
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
