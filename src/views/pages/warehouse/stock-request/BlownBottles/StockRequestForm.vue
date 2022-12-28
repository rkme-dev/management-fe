<template>
  <v-card>
    <v-card-title class="pa-6">
      {{ mode }} Stock Request Module for Blowing Bottles
    </v-card-title>
    <v-card-text>
      <v-form>
        <v-row>
          <v-col cols="12">
            <v-alert color="primary" text style="margin-bottom: -10px">
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
          <v-col cols="6" class="pr-8 pl-8">
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
          <v-col cols="6" class="pr-8 pl-8">
            <v-select
              v-model="form.location_id"
              :items="warehouses"
              item-text="label"
              item-value="value"
              label="Warehouse"
              :disabled="disabled"
              :error-messages="errors.warehouse"
              outlined
              dense
              hide-details="auto"
            ></v-select>
          </v-col>

          <!-- DOCUMENT -->
          <v-col cols="6" class="pr-8 pl-8">
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
          <v-col cols="6" class="pr-8 pl-8">
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
          <v-col cols="6" class="pr-8 pl-8 ">
            <v-text-field
              v-model="form.document_number"
              outlined
              dense
              placeholder="Doc No."
              hide-details
              disabled
            ></v-text-field>
          </v-col>
        </v-row>
        <stock-items
          :data="form.stock_items"
          @addedItems="addedItems"/>
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
        <v-col cols="auto" class="d-flex">
          <!-- CREATE/UPDATE BTN -->
          <v-btn
            v-if="form.status !== 'Posted'"
            color="primary"
            class="me-3 mt-4"
            @click="submit"
            :disabled="form.document_id === null"
          >
            <v-icon>
              {{ icons.mdiContentSave }}
            </v-icon> 
            {{ mode.toUpperCase() }}
          </v-btn>

          <!-- POST BTN -->
          <v-btn
            v-if="form.status === 'For Review'"
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
            v-if="form.status === 'Posted'"
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
    mdiProgressClose
  } from '@mdi/js'
  import store from '@/store'
  import router from '@/router'

  import StockItems from './StockItems.vue'
  import RawMaterialsMixin from '@/components/mixins/RawMaterialsMixin'
    
  export default {
    name: 'StockRequestForm',
    components: {
      StockItems
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
          stock_items: []
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
        return this.$store.state.WarehouseStore.list.filter(warehouseItem => {
          warehouseItem.value = warehouseItem.id
          warehouseItem.label = warehouseItem.name
          return warehouseItem
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
      }
    },
    methods: {
      initializeData() {
        store.dispatch('StockRequestStore/getStockRequestDetails', this.id).then(
          response => {
            if (response.status === undefined) {
              this.form.status = response.data.status,
              this.form.date = new Date().toISOString().substr(0, 10),
              this.form.document_id = response.data.document_id,
              this.form.remarks = response.data.remarks
            }
          },
        )
      },
      addedItems(items) {
        this.form.stock_items.push(items)
      },
      submit() {
        const payload = this.form

        store.dispatch('StockRequestStore/createBottleBlowing', payload).then(
          response => {
            router.push('/stock-requests')
          },
        )
      },
      updateStatus(status) {
        // POST METHOD HERE
      },
      cancel() {
        this.form = {
          dateModal: false,
          status: null,
          date: new Date().toISOString().substr(0, 10),
          document_id: null,
          location_id: null,
          remarks: null
        }

        this.$emit('cancel')
      }
    },
    setup() {
      return {
        icons: {
          mdiInformation,
          mdiCalendar,
          mdiContentSave,
          mdiFinance,
          mdiClipboardRemoveOutline,
          mdiProgressClose
        },
      }
    },
    created() {
      this.$store.dispatch('WarehouseStore/list')
      this.$store.dispatch('DocumentStore/list')
    },
    mounted() {
      if (this.mode == 'Edit') {
        this.initializeData()
      }
    }
  }
</script>
  