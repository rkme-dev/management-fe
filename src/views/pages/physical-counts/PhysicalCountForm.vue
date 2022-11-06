<template>
  <v-card>
    <v-card-title class="pa-6">
      {{ mode }} Physical Count
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
            class="pr-8 pl-8"
          >
            <v-menu
              v-model="formData.dateModal"
              :disabled="formData.status === 'Posted'"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="datePosted"
                  :disabled="formData.status === 'Posted'"
                  label="Date"
                  persistent-hint
                  :prepend-icon="icons.mdiCalendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>

              <v-date-picker
                v-model="datePosted"
                no-title
                :disabled="formData.status === 'Posted'"
                color="primary"
                @input="formData.dateModal = false"
              ></v-date-picker>
            </v-menu>
          </v-col>
          <v-col
            cols="4"
            class="pr-8 pl-8"
          >
            <v-text-field
              v-model="formData.count_by"
              outlined
              :error-messages="errors.count_by"
              dense
              hide-details="auto"
              label="Count By"
            ></v-text-field>
          </v-col>
          <v-col
            cols="4"
            class="pr-8 pl-8"
          >
            <v-menu
              v-model="formData.countDateModal"
              :disabled="formData.status === 'Posted'"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="countDate"
                  :disabled="formData.status === 'Posted'"
                  label="Count Date"
                  persistent-hint
                  :prepend-icon="icons.mdiCalendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>

              <v-date-picker
                v-model="countDate"
                no-title
                :disabled="formData.status === 'Posted'"
                color="primary"
                @input="formData.countDateModal = false"
              ></v-date-picker>
            </v-menu>
          </v-col>
          <v-col
            cols="4"
            class="pr-8 pl-8"
          >
            <v-select
              v-model="formData.document_id"
              :items="documents"
              item-text="title"
              item-value="id"
              :disabled="formData.status === 'Posted'"
              label="Document"
              :error-messages="errors.document_id"
              outlined
              dense
              clearable
              hide-details="auto"
            ></v-select>
          </v-col>
          <v-col
            cols="4"
            class="pr-8 pl-8"
          >
            <v-text-field
              v-model="formData.account_title"
              outlined
              :error-messages="errors.account_title"
              dense
              hide-details="auto"
              label="Account Title"
            ></v-text-field>
          </v-col>
          <v-col
            cols="4"
            class="pr-8 pl-8"
          >
            <v-text-field
              v-model="formData.group_1"
              outlined
              :error-messages="errors.group_1"
              dense
              hide-details="auto"
              label="Group 1"
            ></v-text-field>
          </v-col>
          <v-col
            cols="4"
            class="pr-8 pl-8"
          >
            <v-select
              v-model="formData.location_id"
              :items="locations"
              item-text="address"
              item-value="id"
              :disabled="formData.status === 'Posted'"
              label="Location"
              :error-messages="errors.location_id"
              outlined
              dense
              clearable
              hide-details="auto"
            ></v-select>
          </v-col>
          <v-col
            cols="4"
            class="pr-8 pl-8"
          >
            <v-textarea
              v-model="formData.remarks"
              outlined
              rows="2"
              dense
              :disabled="formData.status === 'Posted'"
              :error-messages="errors.remarks"
              hide-details="auto"
              label="Remarks"
            ></v-textarea>
          </v-col>
          <v-col
            cols="4"
            class="pr-8 pl-8"
          >
            <v-text-field
              v-model="formData.group_2"
              outlined
              :error-messages="errors.group_2"
              dense
              hide-details="auto"
              label="Group 2"
            ></v-text-field>
          </v-col>
        </v-row>
        <CountItems
          class="mt-6"
          :mode="modeData"
          :items="countItems"
          :disabled="formData.status === 'Posted'"
          @addItem="fetchCountItems"
          @totalAmount="fetchTotalAmount"
        />
        <v-row>
          <v-col
            cols="auto"
            class="d-flex"
          >
            <v-btn
              v-if="formData.status !== 'Posted'"
              color="primary"
              class="me-3 mt-4"
              @click="submit"
            >
              <v-icon>
                {{ icons.mdiContentSave }}
              </v-icon>
              {{ modeData === 'Create' ? 'Create' : 'Update' }}
            </v-btn>
            <v-btn
              v-if="formData.status === 'for_review'"
              color="success"
              class="me-3 mt-4"
              @click="postCount"
            >
              <v-icon>
                {{ icons.mdiFinance }}
              </v-icon>
              Post
            </v-btn>
            <v-btn
              v-if="formData.status === 'posted'"
              color="error"
              class="me-3 mt-4"
              @click="unpostCount"
            >
              <v-icon>
                {{ icons.mdiFinance }}
              </v-icon>
              Unpost
            </v-btn>
            <v-btn
              outlined
              class="me-3 mt-4"
              type="reset"
              color="info"
              @click.prevent="cancel"
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
import {
  computed, ref, toRef, watch,
} from '@vue/composition-api'
import {
  mdiInformation,
  mdiBookInformationVariant,
  mdiAccountPlusOutline,
  mdiContentSave,
  mdiFinance,
  mdiProgressClose,
} from '@mdi/js'
import CountItems from '@/views/pages/physical-counts/CountItems.vue'
import store from '@/store'

export default {
  name: 'PhysicalCountForm',
  components: {
    CountItems,
  },
  props: {
    mode: {
      type: String,
      required: true,
      default: (() => 'Create'),
    },
    id: {
      type: Number,
      required: false,
      default: null,
    },
    data: {
      type: Object,
      required: false,
      default: null,
    },
  },
  setup(props, { emit }) {
    store.dispatch('DocumentStore/list')
    store.dispatch('LocationStore/list')
    store.dispatch('PhysicalCountStore/list')
    const modeData = toRef(props, 'mode')
    const dataProp = toRef(props, 'data')
    const formData = ref({
      dateModal: false,
      countDateModal: false,
      date_posted: null,
      document_id: null,
      location_id: null,
      group_1: null,
      group_2: null,
      remarks: null,
      count_by: null,
      count_date: null,
      account_title: null,
    })
    const physicalCountTotalAmount = ref(0)
    const countItems = ref([])
    const terms = computed(() => store.state.TermStore.terms)
    const vats = computed(() => store.state.VatStore.vats)
    const documents = computed(() => store.state.DocumentStore.documents.map(documentItem => {
      documentItem.title = `${documentItem.document_name}`

      return documentItem
    }))
    const locations = computed(() => store.state.LocationStore.locations)

    const fetchTotalAmount = totalAmount => {
      physicalCountTotalAmount.value = totalAmount
    }

    const datePosted = ref(new Date().toISOString().substr(0, 10))
    const countDate = ref(new Date().toISOString().substr(0, 10))

    const fetchCountItems = items => {
      countItems.value = items
    }

    const cancel = () => {
      emit('submit')
    }

    if (modeData.value === 'Edit') {
      formData.value = dataProp.value
      fetchCountItems(dataProp.value.count_items)
    }

    watch(dataProp, () => {
      if (modeData.value === 'Edit') {
        formData.value = dataProp.value
        fetchCountItems(dataProp.value.count_items)
      } else {
        formData.value = {
          dateModal: false,
          countDateModal: false,
          date_posted: null,
          document_id: null,
          location_id: null,
          group_1: null,
          group_2: null,
          remarks: null,
          count_by: null,
          count_date: null,
          account_title: null,
        }

        countItems.value = []
      }
    })

    const postCount = () => {
      store.dispatch('PhysicalCountStore/postCount', formData.value.id).then(
        response => {
          if (response.status === undefined) {
            emit('submit', response.data)
          }
        },
      )
    }

    const unpostCount = () => {
      store.dispatch('PhysicalCountStore/unpostCount', formData.value.id).then(
        response => {
          if (response.status === undefined) {
            emit('submit', response.data)
          }
        },
      )
    }

    const submit = () => {
      if (modeData.value === 'Create') {
        const payload = formData.value
        payload.date_posted = datePosted.value
        payload.count_date = countDate.value
        payload.count_items = countItems.value
        payload.amount = physicalCountTotalAmount.value

        store.dispatch('PhysicalCountStore/create', payload).then(
          response => {
            if (response.status === undefined) {
              emit('submit', response.data)
            }
          },
        )
      } else if (modeData.value === 'Edit') {
        const payload = formData.value
        payload.date_posted = datePosted.value
        payload.count_date = countDate.value
        payload.count_items = countItems.value
        payload.amount = physicalCountTotalAmount.value

        store.dispatch('PhysicalCountStore/update', payload).then(
          response => {
            if (response.status === undefined) {
              emit('submit', response.data)
            }
          },
        )
      }
    }

    const errors = computed(() => store.state.PhysicalCountStore.errors)

    return {
      postCount,
      unpostCount,
      modeData,
      fetchTotalAmount,
      physicalCountTotalAmount,
      documents,
      errors,
      terms,
      vats,
      countItems,
      fetchCountItems,
      submit,
      datePosted,
      countDate,
      cancel,
      formData,
      icons: {
        mdiProgressClose,
        mdiFinance,
        mdiContentSave,
        mdiBookInformationVariant,
        mdiInformation,
        mdiAccountPlusOutline,
      },
      locations,
    }
  },
}
</script>

<style scoped>

</style>
