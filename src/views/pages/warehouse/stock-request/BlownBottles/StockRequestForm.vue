<template>
  <v-card>
    <v-card-title class="pa-6">
      {{ mode }} Stock Request Module for Blowing Bottles
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

          <!-- DATE -->
          <v-col
            cols="6"
            class="pr-8 pl-8"
          >
            <v-menu
              v-model="form.dateModal"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              :disabled="disabled"
              max-width="290px"
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="form.date"
                  label="Date"
                  persistent-hint
                  :prepend-icon="icons.mdiCalendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>

              <v-date-picker
                v-model="form.date"
                no-title
                color="primary"
                @input="form.dateModal = false"
              ></v-date-picker>
            </v-menu>
          </v-col>

          <!-- WAREHOUSE -->
          <v-col
            cols="6"
            class="pr-8 pl-8"
          >
            <v-select
              v-model="form.location_id"
              :items="warehouses"
              item-text="location_code"
              item-value="id"
              label="Warehouse"
              :disabled="disabled"
              :error-messages="errors.location_id"
              outlined
              dense
              hide-details="auto"
            ></v-select>
          </v-col>

          <!-- DOCUMENT -->
          <v-col
            cols="6"
            class="pr-8 pl-8"
          >
            <v-select
              v-model="form.document_id"
              :items="documents"
              item-text="label"
              item-value="value"
              label="Document"
              :disabled="disabled"
              :error-messages="errors.document_id"
              outlined
              dense
              hide-details="auto"
            ></v-select>
          </v-col>

          <!-- REMARKS -->
          <v-col
            cols="6"
            class="pr-8 pl-8"
          >
            <v-textarea
              v-model="form.remarks"
              outlined
              :disabled="disabled"
              rows="2"
              dense
              :error-messages="errors.remarks"
              hide-details="auto"
              label="Remarks"
              no-resize
            ></v-textarea>
          </v-col>

          <!-- DOCUMENT NUMBER -->
          <v-col
            v-if="form.code"
            cols="6"
            class="pr-8 pl-8 "
          >
            <v-text-field
              v-model="form.code"
              outlined
              dense
              placeholder="Code"
              hide-details
              disabled
            ></v-text-field>
          </v-col>
        </v-row>
        <stock-items
          :data="form.stock_items"
          @addedItems="addedItems"
        />
        <!-- <stock-items
            class="mt-6"
            :mode="modeData"
            :items="stockItems"
            :disabled="formData.status === 'Posted'"
            @addItem="fetchOrderItems"
            @totalAmount="fetchTotalAmount"
        ></stock-items> -->
      </v-form>
      <v-row>
        <v-col
          cols="auto"
          class="d-flex"
        >
          <!-- CREATE/UPDATE BTN -->
          <v-btn
            v-if="form.status !== 'posted'"
            color="primary"
            class="me-3 mt-4"
            :disabled="form.document_id === null"
            @click="submit"
          >
            <v-icon>
              {{ icons.mdiContentSave }}
            </v-icon>
            {{ mode.toUpperCase() }}
          </v-btn>

          <!-- POST BTN -->
          <v-btn
            v-if="form.status === 'for_review'"
            color="success"
            class="me-3 mt-4"
            @click="updateStatus('post')"
          >
            <v-icon>
              {{ icons.mdiFinance }}
            </v-icon>
            Post
          </v-btn>

          <!-- UNPOST BTN -->
          <v-btn
            v-if="form.status === 'posted'"
            color="error"
            class="me-3 mt-4"
            @click="updateStatus('unpost')"
          >
            <v-icon>
              {{ icons.mdiClipboardRemoveOutline }}
            </v-icon>
            Unpost
          </v-btn>

          <!-- CANCEL BTN -->
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
    </v-card-text>
  </v-card>
</template>

<script>
import {
  mdiInformation,
  mdiCalendar,
  mdiContentSave,
  mdiFinance,
  mdiClipboardRemoveOutline,
  mdiProgressClose,
} from '@mdi/js'
import store from '@/store'
import router from '@/router'

import RawMaterialsMixin from '@/components/mixins/RawMaterialsMixin'
import StockItems from './StockItems.vue'

export default {
  name: 'StockRequestForm',
  components: {
    StockItems,
  },
  mixins: [
    RawMaterialsMixin,
  ],
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
  },
  data() {
    return {
      form: {
        process_type: 'Bottle Blowing',
        dateModal: false,
        status: null,
        date: new Date().toISOString().substr(0, 10),
        document_id: null,
        location_id: null,
        remarks: null,
        stock_items: [],
      },
    }
  },
  computed: {
    disabled() {
      return this.form.status === 'Posted'
    },
    itemTypes() {
      return RawMaterialsMixin.computed.rawMaterialsType()
    },
    warehouses() {
      return this.$store.state.LocationStore.locations.filter(warehouseItem => {
        if (warehouseItem.type === 'Warehouse') {
          return warehouseItem
        }
      })
    },
    documents() {
      return this.$store.state.DocumentStore.documents.filter(documentItem => {
        documentItem.value = documentItem.id
        documentItem.label = documentItem.document_name

        return documentItem
      })
    },
    errors() {
      return store.state.StockRequestStore.errors
    },
  },
  created() {
    this.$store.dispatch('LocationStore/list')
    this.$store.dispatch('DocumentStore/list')
  },
  mounted() {
    if (this.mode === 'Edit') {
      this.initializeData()
    }
  },
  methods: {
    initializeData() {
      store.dispatch('StockRequestStore/getStockRequestDetails', this.id).then(
        response => {
          if (response.status === undefined) {
            this.form.id = response.data.id
            this.form.status = response.data.status
            this.form.code = response.data.code
            this.form.date = new Date().toISOString().substr(0, 10)
            this.form.document_id = response.data.document_id
            this.form.location_id = response.data.location_id
            this.form.remarks = response.data.remarks
            this.form.stock_items = response.data.stock_request_items.map(item => ({
              name: item.raw_material.name,
              output_material: item.raw_material.raw_material.name,
              raw_material_id: item.raw_material.id,
              total_pieces: item.total_pieces,
            }))
          }
        },
      )
    },
    addedItems(items) {
      this.form.stock_items.push(items)
    },
    submit() {
      const payload = this.form

      if (this.mode === 'Edit') {
        store.dispatch('StockRequestStore/updateBottleBlowing', payload).then(
          response => {
            if (response.status === undefined) {
              router.push('/stock-requests')

              this.$emit('submit')
            }
          },
        )
      } else {
        store.dispatch('StockRequestStore/createBottleBlowing', payload).then(
          response => {
            if (response.status === undefined) {
              router.push('/stock-requests')

              this.$emit('submit')
            }
          },
        )
      }
    },
    updateStatus(status) {
      if (status === 'post') {
        store.dispatch('StockRequestStore/postOrder', this.form.id).then(
          response => {
            if (response.status === undefined) {
              router.push('/stock-requests')

              this.$emit('submit')
            }
          },
        )
      } else {
        store.dispatch('StockRequestStore/unpostOrder', this.form.id).then(
          response => {
            if (response.status === undefined) {
              router.push('/stock-requests')

              this.$emit('submit')
            }
          },
        )
      }
    },
    cancel() {
      this.$emit('submit')
    },
  },
  setup() {
    return {
      icons: {
        mdiInformation,
        mdiCalendar,
        mdiContentSave,
        mdiFinance,
        mdiClipboardRemoveOutline,
        mdiProgressClose,
      },
    }
  },
}
</script>
