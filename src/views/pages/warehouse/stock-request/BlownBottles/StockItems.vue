<template>
  <v-row>
    <v-col cols="12">
      <v-alert
        color="success"
        text
        style="margin-bottom: -30px"
      >
        <div class="d-flex align-start">
          <v-icon color="success">
            {{ icons.mdiInformation }}
          </v-icon>
          <div class="ms-3">
            <p class="text-base font-weight-medium mb-1">
              Items
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
              @click="create"
            >
              Add Item
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
                          :items="rawMaterials"
                          item-text="label"
                          item-value="value"
                          label="Raw Material"
                          clearable
                          @change="toggleRawMaterialName"
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
                          label="Total Pcs"
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
                          v-if="form.raw_material_id && form.total_pieces"
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
        <!-- ACTIONS -->
        <template v-slot:item.actions="{ item, index }">
          <v-icon
            small
            @click="deleteItem(item, index)"
          >
            {{ icons.mdiDeleteCircle }}
          </v-icon>
        </template>
      </v-data-table>
    </v-col>
  </v-row>
</template>

<script>
import {
  mdiInformation,
  mdiTextBoxPlus,
  mdiDeleteCircle,
} from '@mdi/js'

export default {
  name: 'StockItems',
  props: {
    data: {
      type: Array,
      required: true,
      default: (() => []),
    },
  },
  data() {
    return {
      stockItems: [],
      stockItemDialog: false,
      headers: [
        {
          text: 'Item Name',
          sortable: true,
          value: 'name',
        },
        {
          text: 'Output Material',
          sortable: true,
          value: 'output_material',
        },
        {
          text: 'Total Pcs',
          sortable: true,
          value: 'total_pieces',
        },
        {
          text: 'Actions',
          value: 'actions',
        },
      ],
      form: {
        raw_material_id: null,
        name: null,
        unit_id: null,
        unit_name: null,
        quantity_of_unit: null,
        total_pieces: null,
      },
      units: [],
    }
  },
  computed: {
    items() {
      return this.data
    },
    rawMaterials() {
      return this.$store.state.RawMaterialStore.list.filter(rawMaterialItem => {
        if (rawMaterialItem.type === 'preform') {
          // eslint-disable-next-line no-param-reassign
          rawMaterialItem.value = rawMaterialItem.id
          // eslint-disable-next-line no-param-reassign
          rawMaterialItem.label = rawMaterialItem.name

          return rawMaterialItem
        }
      })
    },
    filteredUnits() {
      return this.units.filter(unitItems => {
        if (this.form.raw_material_id === unitItems.raw_material_id) {
          unitItems.value = unitItems.id
          unitItems.label = unitItems.name

          return unitItems
        }
      })
    },
  },
  setup() {
    return {
      icons: {
        mdiInformation,
        mdiTextBoxPlus,
        mdiDeleteCircle,
      },
    }
  },
  created() {
    this.$store.dispatch('RawMaterialStore/list')
  },
  methods: {
    create() {
      this.resetForm()
      this.stockItemDialog = true
    },
    addItem() {
      this.$emit('addedItems', this.form)
      this.stockItemDialog = false
    },
    toggleRawMaterialName(id) {
      const rawMaterial = this.rawMaterials.find(material => material.id === id)
      this.form.name = rawMaterial.name

      if (rawMaterial.raw_material_id) {
        const outputMaterial = this.$store.state.RawMaterialStore.list.find(material => material.id === rawMaterial.raw_material_id)
        this.form.output_material = outputMaterial.name
      }
    },
    toggleUnitName(id) {
      let unitName = ''
      this.units.filter(unitItem => {
        if (unitItem.id === id) {
          unitName = unitItem.name
        }
      })

      this.form.unit_name = unitName
    },
    resetForm() {
      this.form = {
        raw_material_id: null,
        unit_id: null,
        quantity_of_unit: null,
        total_pieces: null,
      }
    },
    resetData() {
      this.resetForm()
      this.units = []
      this.stockItemDialog = false
    },
    deleteItem(item, index) {
      console.log(index, item)
      this.data.splice(index, 1)
    },
  },
}
</script>
