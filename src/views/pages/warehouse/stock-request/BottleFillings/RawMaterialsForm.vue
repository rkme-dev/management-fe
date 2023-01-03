<template>
  <v-row>
    <v-col cols="12">
      <v-alert
        color="secondary"
        text
        style="margin-bottom: -30px"
      >
        <div class="d-flex align-start">
          <v-icon color="secondary">
            {{ icons.mdiInformation }}
          </v-icon>
          <div class="ms-3">
            <p class="text-base font-weight-medium mb-1">
              Bill Of Materials (Raw Materials)
            </p>
          </div>
        </div>
      </v-alert>
    </v-col>

    <!-- TABLE -->
    <v-col cols="12">
      <v-data-table
        :headers="headers"
        :items="items"
      >
        <!-- TOP -->
        <template v-slot:top>
          <!-- TOOLBAR -->
          <v-toolbar flat>
            <v-spacer></v-spacer>
            <v-btn
              color="success"
              dark
              class="mb-2"
              @click="resetData"
            >
              Add Raw Material
            </v-btn>

            <!-- MODAL -->
            <v-dialog
              v-model="stockItemDialog"
              width="1200px"
              height="500px"
              transition="dialog-bottom-transition"
            >
              <v-card>
                <v-card-title class="pa-6">
                  Add Item
                </v-card-title>
                <v-card-text>
                  <!-- START OF FORM -->
                  <v-form>
                    <v-row>
                      <!-- LABEL -->
                      <v-col cols="12">
                        <v-alert
                          color="primary"
                          text
                          style="margin-bottom: -10px"
                        >
                          <div class="d-flex align-start">
                            <v-icon color="primary">
                              {{ icons.mdiTextBoxPlus }}
                            </v-icon>
                            <div class="ms-3">
                              <p class="text-base font-weight-medium mb-1">
                                Item
                              </p>
                            </div>
                          </div>
                        </v-alert>
                      </v-col>

                      <!-- RAW MATERIAL -->
                      <v-col
                        cols="6"
                        class="pr-8 pl-8"
                      >
                        <v-select
                          v-model="form.raw_material_id"
                          :items="rawMaterialsOptions"
                          item-text="name"
                          item-value="id"
                          label="Raw Materials"
                          clearable
                          @change="onSelectFinishProduct"
                        >
                        </v-select>
                      </v-col>

                      <!-- TOTAL PCS -->
                      <v-col
                        cols="6"
                        class="pr-8 pl-8 pt-10"
                      >
                        <v-currency-field
                          v-model="form.total_pieces"
                          label="Total Pieces"
                          outlined
                          dense
                          type="number"
                          :decimal-length="0"
                          hide-details="auto"
                          class="text-green mt-n8"
                        ></v-currency-field>
                      </v-col>

                      <!-- BUTTONS -->
                      <v-col
                        cols="12"
                        class="d-flex"
                      >
                        <v-btn
                          v-if="form.raw_material_id"
                          color="primary"
                          class="me-3 mt-4"
                          @click="addItem"
                        >
                          Submit
                        </v-btn>
                        <v-btn
                          outlined
                          class="me-3 mt-4"
                          type="reset"
                          @click.prevent="resetData"
                        >
                          Cancel
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-form>
                </v-card-text>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <!--  TOTAL PIECES      -->
        <template #[`item.total_pieces`]="{item}">
          <div class="text-green text--primary">
            <span class="text-green">{{ item.total_pieces.toLocaleString('en-US') }}</span>
          </div>
        </template>
        <!-- ACTIONS -->
        <template v-slot:item.actions="{ index }">
          <v-icon
            small
            @click="deleteItem(index)"
          >
            {{ icons.mdiDeleteCircle }}
          </v-icon>
        </template>
      </v-data-table>
    </v-col>
  </v-row>
</template>

<script>
import { mdiDeleteCircle, mdiInformation, mdiTextBoxPlus } from '@mdi/js'
import {
  computed, ref, toRef, watch,
} from '@vue/composition-api/dist/vue-composition-api'
import store from '@/store'

const headers = [
  {
    text: 'Item Name',
    sortable: true,
    value: 'raw_material.name',
  },
  {
    text: 'Total Pieces',
    sortable: true,
    value: 'total_pieces',
  },
  {
    text: 'Actions',
    value: 'actions',
  },
]

export default {
  name: 'RawMaterialsForm',
  props: {
    rawMaterials: {
      type: Object,
      required: false,
      default: null,
    },
  },
  setup(props, { emit }) {
    const stockItemDialog = ref(false)
    const form = ref({
      units: [],
    })
    const rawMaterialsProp = toRef(props, 'rawMaterials')
    const items = ref([])
    const rawMaterialsOptions = computed(() => store.state.RawMaterialStore.list)

    const resetData = () => {
      form.value = {
        units: [],
      }

      stockItemDialog.value = !stockItemDialog.value
    }

    watch(rawMaterialsProp.value, () => {
      items.value = []

      if (rawMaterialsProp.value.items.length > 0) {
        rawMaterialsProp.value.items.forEach(item => {
          items.value.push(item)
        })
      }
    })

    const addItem = () => {
      if (form.value.raw_material_id) {
        items.value.push(form.value)
        emit('syncRawMaterials', items.value)
      }

      resetData()
    }

    const deleteItem = index => {
      items.value.splice(index, 1)
      emit('syncRawMaterials', items.value)
    }

    const onSelectFinishProduct = () => {
      form.value.raw_material = rawMaterialsOptions.value.find(productItem => productItem.id === form.value.raw_material_id)
    }

    return {
      form,
      headers,
      items,
      rawMaterialsOptions,
      stockItemDialog,
      addItem,
      deleteItem,
      resetData,
      onSelectFinishProduct,
      icons: {
        mdiInformation,
        mdiTextBoxPlus,
        mdiDeleteCircle,
      },
    }
  },
}
</script>

<style scoped>

</style>
