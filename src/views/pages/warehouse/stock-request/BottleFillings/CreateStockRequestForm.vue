<template>
  <v-card>
    <v-card-title class="pa-6">
      Create Stock Request Module for Blowing Bottles
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
              :error-messages="errors.warehouse"
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
              item-text="document_name"
              item-value="id"
              label="Document"
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
              rows="2"
              dense
              :error-messages="errors.remarks"
              hide-details="auto"
              label="Remarks"
              no-resize
            ></v-textarea>
          </v-col>
        </v-row>
        <v-row class="mt-4">
          <v-col cols="12">
            <finish-product-form @reSyncItemsToProduce="syncItemsToProduce" />
          </v-col>
        </v-row>
        <v-row class="mt-12">
          <v-col cols="12">
            <raw-materials-form
              :raw-materials="rawMaterials"
              @reSyncItemsToProduce="syncItemsToProduce"
            />
          </v-col>
        </v-row>
      </v-form>
      <v-row>
        <v-col
          cols="auto"
          class="d-flex"
        >
          <v-btn
            color="primary"
            class="me-3 mt-4"
            @click="submit"
          >
            <v-icon>
              {{ icons.mdiContentSave }}
            </v-icon>
            Submit
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
  mdiCalendar,
  mdiClipboardRemoveOutline,
  mdiContentSave,
  mdiFinance,
  mdiInformation,
  mdiProgressClose,
} from '@mdi/js'
import { ref, computed } from '@vue/composition-api/dist/vue-composition-api'
import store from '@/store'
import RawMaterialsForm from './RawMaterialsForm.vue'
import FinishProductForm from './FinishProductForm.vue'

export default {
  name: 'CreateStockRequestFormVue',
  components: {
    RawMaterialsForm,
    FinishProductForm,
  },
  setup(props, { emit }) {
    store.dispatch('FinishProductStore/list')
    store.dispatch('RawMaterialStore/list')
    const form = ref({})

    const warehouses = computed(() => store.state.LocationStore.locations.filter(location => location.type === 'Warehouse'))
    const documents = computed(() => store.state.DocumentStore.documents)

    const errors = ref([])
    const rawMaterials = ref({
      items: [],
    })

    const submit = () => {
    }

    const syncItemsToProduce = items => {
      form.value.items_to_produce = items

      rawMaterials.value.items = []

      if (items.length > 0) {
        items.forEach(item => {
          console.log(item.product)
          if (item.product.raw_materials.length > 0) {
            item.product.raw_materials.forEach(rawMaterial => {
              rawMaterials.value.items.push({
                raw_material: rawMaterial,
                raw_material_id: rawMaterial.id,
                total_pieces: item.total_pieces,
              })
            })
          }

          store.dispatch('FinishProductStore/removeProductById', item.product_id)
        })
      }
    }

    const cancel = () => {
      emit('onClose')
    }

    return {
      documents,
      errors,
      form,
      icons: {
        mdiInformation,
        mdiCalendar,
        mdiContentSave,
        mdiFinance,
        mdiClipboardRemoveOutline,
        mdiProgressClose,
      },
      rawMaterials,
      warehouses,
      submit,
      cancel,
      syncItemsToProduce,
    }
  },
}
</script>

<style scoped>

</style>
