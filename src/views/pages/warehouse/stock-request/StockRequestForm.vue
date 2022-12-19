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
          <v-col cols="6" class="pr-8 pl-8 mt-16">
            <v-menu
              v-model="form.dateModal"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              :disabled="form.status === 'Posted'"
              max-width="290px"
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="form.datePosted"
                  label="Date"
                  persistent-hint
                  :prepend-icon="icons.mdiCalendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>

              <v-date-picker
                v-model="form.datePosted"
                no-title
                color="primary"
                @input="form.dateModal = false"
              ></v-date-picker>
            </v-menu>
          </v-col>

          <!-- WAREHOUSE -->
          <v-col cols="6" class="pr-8 pl-8 mt-16">
            <v-select
              v-model="form.warehouse_id"
              :items="warehouses"
              item-text="title"
              item-value="id"
              label="Warehouse"
              :disabled="form.status === 'Posted'"
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
              item-text="title"
              item-value="id"
              label="Document"
              :disabled="form.status === 'Posted'"
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
              :disabled="form.status === 'Posted'"
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
        <stock-items />
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
          <!-- UPDATE BTN -->
          <v-btn
            v-if="form.status !== 'Posted'"
            color="primary"
            class="me-3 mt-4"
            @click="submit"
          >
            <v-icon>
              {{ icons.mdiContentSave }}
            </v-icon> 
            UPDATE
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

  import StockItems from './StockItems.vue'
    
  export default {
    name: 'StockRequestForm',
    components: {
      StockItems
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
    },
    data() {
      return {
        form: {
          dateModal: false,
          status: null,
          datePosted: new Date().toISOString().substr(0, 10),
          document_id: null,
          warehouse_id: null,
          remarks: null
        },
        warehouses: []
      }
    },
    computed: {
      documents() {
        return store.state.DocumentStore.documents.filter(documentItem => {
          documentItem.title = `${documentItem.document_name}`

          return documentItem
        })
      },
      errors() {
        return store.state.StockRequestStore.errors
      }
    },
    methods: {
      getWarehouses() {
        store.dispatch('WarehouseStore/getWarehouses').then(
          response => {
            response.data.forEach((item) => {
              this.warehouses[item.id] = item.name
            })
          })
      },
      initializeData() {
        store.dispatch('StockRequestStore/getStockRequestDetails', this.id).then(
          response => {
            if (response.status === undefined) {
              this.form.status = response.data.status,
              this.form.datePosted = new Date().toISOString().substr(0, 10),
              this.form.document_id = response.data.document_id,
              this.form.remarks = response.data.remarks
            }
          },
        )
      },
      submit() {
        // POST METHOD HERE
      },
      updateStatus(status) {
        // POST METHOD HERE
      },
      cancel() {
        this.form = {
          dateModal: false,
          status: null,
          datePosted: new Date().toISOString().substr(0, 10),
          document_id: null,
          warehouse_id: null,
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
      this.getWarehouses()
    },
    mounted() {
      this.initializeData()
    }
  }
</script>
  