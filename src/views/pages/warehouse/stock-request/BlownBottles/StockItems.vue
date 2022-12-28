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
        :items="data"
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
                      <v-col cols="6" class="pr-8 pl-8">
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

                      <!-- UNIT -->
                      <v-col cols="6" class="pr-8 pl-8">
                        <v-select
                          v-model="form.unit_id"
                          :items="filteredUnits"
                          item-text="label"
                          item-value="value"
                          label="Unit"
                          clearable
                          @change="toggleUnitName"
                        ></v-select>
                      </v-col>

                      <!-- AMOUNT -->
                      <v-col cols="6" class="pr-8 pl-8 pt-10">
                        <v-currency-field
                          v-model="form.quantity_of_unit"
                          label="Quantity"
                          outlined
                          dense
                          type="number"
                          :decimal-length="0"
                          hide-details="auto"
                          class="text-green mt-n8"
                        ></v-currency-field>
                      </v-col>

                      <!-- TOTAL PCS -->
                      <v-col cols="6" class="pr-8 pl-8 pt-10">
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
                      <v-col cols="12" class="d-flex">
                        <v-btn
                          v-if="form.raw_material_id && form.unit_id"
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
      <template v-slot:item.actions="{ item }">
        <v-icon
          small
          @click="deleteItem(item)"
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
    mdiDeleteCircle
  } from '@mdi/js'

  export default {
    name: 'StockItems',
    props: {
      data: {
        type: Array,
        required: true,
        default: (() => []),
      }
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
            text: 'Unit',
            sortable: true,
            value: 'unit_name',
          },
          {
            text: 'Total Boxes',
            sortable: true,
            value: 'quantity_of_unit',
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
        units: []
      }
    },
    computed: {
      rawMaterials() {
        const combinedUnits = []

        return this.$store.state.RawMaterialStore.list.filter(rawMaterialItem => {
          rawMaterialItem.value = rawMaterialItem.id
          rawMaterialItem.label = rawMaterialItem.name
          
          /**
           * Store all units
           */
          rawMaterialItem.units.forEach(function(item) {
            item.raw_material_id = rawMaterialItem.id
            combinedUnits.push(item)
          })
          this.units = combinedUnits
          return rawMaterialItem
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
      }
    },
    setup() {
      return {
        icons: {
          mdiInformation,
          mdiTextBoxPlus,
          mdiDeleteCircle
        },
      }
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
        var rawMaterialName = ''
        this.rawMaterials.filter(rawMaterialItem => {
          if (rawMaterialItem.id === id) {
            rawMaterialName = rawMaterialItem.name
          }
        })

        this.form.name = rawMaterialName
      },
      toggleUnitName(id) {
        var unitName = ''
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
      deleteItem(item) {
        this.data.splice(item, 1)
        this.addItem()
      }
    },
    created() {
      this.$store.dispatch('RawMaterialStore/list')
    },
  }
</script>