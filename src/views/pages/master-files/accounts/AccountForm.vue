<template>
  <v-form>
    <v-row>
      <v-col
        cols="4"
        md="3"
      >
        <label for="firstnameHorizontalIcons">Account code</label>
      </v-col>

      <v-col
        cols="7"
        md="7"
      >
        <v-text-field
          id="firstnameHorizontalIcons"
          v-model="accountData.account_code"
          outlined
          dense
          :error-messages="errors.account_code"
          placeholder="Account Code"
          hide-details="auto"
        ></v-text-field>
      </v-col>
      <v-col
        cols="4"
        md="3"
      >
        <label for="firstnameHorizontalIcons">Account Title</label>
      </v-col>

      <v-col
        cols="7"
      >
        <v-text-field
          id="firstnameHorizontalIcons"
          v-model="accountData.account_title"
          outlined
          dense
          :error-messages="errors.account_title"
          placeholder="Account Title"
          hide-details="auto"
        ></v-text-field>
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
          :items="typelist"
          v-model="accountData.type"
          filled
          label="Filled style"
        ></v-select>
      </v-col>

      <v-col
        cols="4"
        md="3"
      >
        <label for="firstnameHorizontalIcons">Normal</label>
      </v-col>

      <v-col
        cols="7"
        md="7"
      >
      <v-select
          :items="normallist"
          v-model="accountData.normal"
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
          v-model="accountData.is_active"
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

    const typelist = [
      'Accounts Receivable',
      'Accounts Payable',
      'Bank',
      'Cash',
      'Fixed Asset',
      'Cost of Goods Sold',
      'Income',
      'Expenses',
      'Other Income',
      'Other Expenses',
    ];

    const normallist = [
      'C',
      'D',
    ];

    const accountData = ref({
      account_code: null,
      account_title: null,
      type: null,
      normal: null,
      is_active: false,
    })

    if (props.mode === 'edit') {
      accountData.value = documentProp.value

      if (accountData.value.is_active === 'Inactive') {
        accountData.value.is_active = 0
      } else {
        accountData.value.is_active = 1
      }
    }

    watch(documentProp, value => {
      if (props.mode === 'edit') {
        accountData.value = documentProp.value

        if (accountData.value.is_active === 'Inactive') {
          accountData.value.is_active = 0
        } else {
          accountData.value.is_active = 1
        }
      } else {
        accountData.value = {
          account_code: null,
          account_title: null,
          type: null,
          normal: null,
          is_active: false,
        }
      }
    })

    const errors = computed(() => store.state.AccountStore.errors)

    const cancel = () => {
      emit('clicked', false)
    }

    const submit = () => {
      if (accountData.value.id === undefined) {
        store.dispatch('AccountStore/create', accountData.value).then(
          response => {
            if (response.status === undefined) {
              emit('clicked', {
                alertType: 'success',
                alertMessage: 'Successfully Added an Account.',
              })
              store.dispatch('AccountStore/list')
            }
          },
        )
      } else {
        store.dispatch('AccountStore/update', accountData.value).then(
          response => {
            if (response.status === undefined) {
              emit('clicked', {
                alertType: 'success',
                alertMessage: 'Successfully updated a Document.',
              })
              store.dispatch('AccountStore/list')
            }
          },
        )
      }
    }

    return {
      cancel,
      errors,
      accountData,
      submit,
      typelist,
      normallist,
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
