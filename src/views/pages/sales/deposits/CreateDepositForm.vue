<template>
  <v-card>
    <v-card-title class="">
      Create Deposit
    </v-card-title>
    <v-card-text>
      <v-form>
        <v-row>
          <v-col cols="12">
            <v-alert
                color="primary"
                text
                style="margin-bottom: -10px"
            >
              <div class="d-flex align-start">
                <v-icon color="primary">
                  {{ icons.mdiInformation }}
                </v-icon>
                <div class="ms-3">
                  <p class="text-base font-weight-medium mb-1">
                    Information
                  </p>
                </div>
              </div>
            </v-alert>
          </v-col>
          <v-col
              cols="4"
              class="pr-8 pl-8 mr-16"
          >
            <v-menu
                v-model="formData.dateModal"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                :disabled="formData.status === 'In Transit'"
                max-width="290px"
                min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                    v-model="datePosted"
                    label="Transaction Date"
                    persistent-hint
                    :prepend-icon="icons.mdiCalendar"
                    readonly
                    outlined
                    v-bind="attrs"
                    v-on="on"
                ></v-text-field>
              </template>

              <v-date-picker
                  v-model="datePosted"
                  no-title
                  color="primary"
                  @input="formData.dateModal = false"
              ></v-date-picker>
            </v-menu>
          </v-col>
          <v-col
              cols="4"
              class="pr-8 pl-8"
          >
            <v-textarea
                v-model="formData.remarks"
                rows="3"
                outlined
                dense
                :disabled="formData.status === 'In Transit'"
                label="Remarks"
            ></v-textarea>

          </v-col>
          <v-col cols="4" class="pr-8 pl-8 mr-16  mt-n16">
            <v-select
                v-model="formData.document_id"
                :items="documents"
                item-text="title"
                item-value="id"
                label="Document"
                :disabled="formData.status === 'In Transit'"
                :error-messages="errors.document_id"
                outlined
                dense
                hide-details="auto"
            ></v-select>
          </v-col>
          <v-col
              cols="4"
              class="pr-8 pl-8"
          >
          </v-col>
          <v-col
              cols="4"
              class="pr-8 pl-8 mr-16 mt-n4"
          >
            <v-menu
                v-model="formData.clearingDate"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                    v-model="clearingDate"
                    label="Clearing Date"
                    persistent-hint
                    :prepend-icon="icons.mdiCalendar"
                    readonly
                    outlined
                    v-bind="attrs"
                    v-on="on"
                ></v-text-field>
              </template>

              <v-date-picker
                  v-model="clearingDate"
                  no-title
                  color="primary"
                  @input="formData.clearingDate = false"
              ></v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols="10"></v-col>
          <v-col cols="4" class="pr-8 pl-8 mt-n14">
            <v-select
                v-model="formData.account_id"
                :items="accounts"
                item-text="account_title"
                item-value="id"
                label="Account"
                :error-messages="errors.account_id"
                outlined
                dense
                hide-details="auto"
            >
            </v-select>
          </v-col>
          <v-col cols="12">
            <v-alert
                color="success"
                text
                style="margin-bottom: -10px"
            >
              <div class="d-flex align-start">
                <v-icon color="success">
                  {{ icons.mdiCurrencyPhp }}
                </v-icon>
                <div class="ms-3">
                  <p class="text-base font-weight-medium mb-1">
                    Checks
                  </p>
                </div>
              </div>
            </v-alert>
          </v-col>
          <v-col cols="10"></v-col>
          <v-col cols="1" class="ml-n10">
            <v-dialog
                v-model="selectCheckDialog"
                width="1000"
                height="1000"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                    color="success"
                    dark
                    v-bind="attrs"
                    v-on="on"
                >
                  Get Collected Checks
                </v-btn>
              </template>
              <check-selection-component
                  :ids="selectedIds"
                  @onSubmit="onSubmit"
                  @onCancel="onCancel"
              ></check-selection-component>
            </v-dialog>
          </v-col>
          <v-col cols="12">
            <v-data-table
                :headers="headers"
                :items="selectedChecks"
            >
              <template #item.collection_payment.amount="{ item }">
                <v-currency-field
                    v-model="item.collection_payment.amount"
                    prefix="PHP"
                    class="text-green"
                    disabled
                >
                </v-currency-field>
              </template>
            </v-data-table>
          </v-col>
        </v-row>
        <v-row>
          <v-col
              cols="auto"
              class="d-flex"
          >
            <v-btn
                color="primary"
                class="me-3 mt-4"
                @click="create"
            >
              <v-icon>
                {{ icons.mdiContentSave }}
              </v-icon>
              Create
            </v-btn>
            <v-btn
                outlined
                class="me-3 mt-4"
                type="reset"
                color="error"
                @click.prevent="close"
            >
              <v-icon>
                {{ icons.mdiProgressClose }}
              </v-icon>
              Close
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import {computed, ref} from "@vue/composition-api";
import store from "@/store";
import {mdiAccountPlusOutline, mdiCardOff, mdiCurrencyPhp, mdiCurrencySign, mdiInformation} from "@mdi/js";
import CheckSelectionComponent from '@/views/pages/sales/deposits/CheckSelectionComponent.vue'
import {onMounted} from "@vue/composition-api/dist/vue-composition-api";

export default {
  name: "CreateDepositForm.vue",
  components: {
    CheckSelectionComponent,
  },
  setup(props, { emit }) {
    store.dispatch('DocumentStore/list')
    store.dispatch('AccountStore/list')

    const datePosted = ref(new Date().toISOString().substr(0, 10))
    const clearingDate = ref(new Date().toISOString().substr(0, 10))
    const formData = ref({})
    const errors = computed(() => store.state.DepositStore.errors)
    const accounts = computed(() => store.state.AccountStore.accounts.filter(account => account.type === 'Bank'))
    const documents = computed(() => store.state.DocumentStore.documents.filter(documentItem => {
      if (documentItem.module === 'Deposit') {
        documentItem.title = `${documentItem.document_name}`

        return documentItem
      }
    }))
    const selectCheckDialog = ref(false)
    const selectedChecks = ref([])
    const selectedIds = ref([])

    const headers = [
      {
        text: 'Date',
        align: 'start',
        sortable: false,
        value: 'collection_payment.payment_date',
      },
      { text: 'Check Number', value: 'check_number' },
      { text: 'Bank', value: 'bank' },
      { text: 'Type', value: 'check_type' },
      { text: 'Amount', value: 'collection_payment.amount' },
    ]
    const amount = ref(0)

    const onSubmit = (checks) => {
      selectedChecks.value = checks
      selectedChecks.value.forEach(check => {
        amount.value += parseFloat(check.collection_payment.amount)
      })

      selectCheckDialog.value = false
    }

    const onCancel = () => {
      selectCheckDialog.value = false
    }

    onMounted(async () => {
      selectedIds.value = []
    })

    const create = () => {
      const payload = formData.value
      payload.date_posted = datePosted.value
      payload.clearing_date = clearingDate.value
      payload.check_ids = selectedChecks.value.map(check => check.id)
      payload.amount = amount.value

      store.dispatch('DepositStore/create', payload).then(
          response => {
            if (response.status === undefined) {
              selectedIds.value = []
              selectedChecks.value = []
              emit('onSubmit')
            }
          },
      )
    }

    const close = () => {
      selectedIds.value = []
      selectedChecks.value = []
      emit('onSubmit')
    }

    return {
      close,
      create,
      selectedIds,
      headers,
      accounts,
      clearingDate,
      documents,
      errors,
      formData,
      datePosted,
      onCancel,
      onSubmit,
      selectedChecks,
      icons: {
        mdiInformation,
        mdiAccountPlusOutline,
        mdiCardOff,
        mdiCurrencySign,
        mdiCurrencyPhp,
      },
      selectCheckDialog,
    }
  },
}
</script>

<style scoped>

</style>
