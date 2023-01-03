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
              Finish Product to Produce
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
              Add Finish Product
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
                          v-model="form.product_id"
                          :items="products"
                          item-text="name"
                          item-value="id"
                          label="Finished Products"
                          clearable
                          @change="onSelectFinishProduct"
                        >
                        </v-select>
                      </v-col>

                      <!-- UNIT -->
                      <v-col
                        cols="6"
                        class="pr-8 pl-8"
                      >
                        <v-select
                          v-model="form.unit_id"
                          :items="form.units"
                          item-text="name"
                          item-value="id"
                          label="Unit"
                          clearable
                          @change="onSelectUnit"
                        ></v-select>
                      </v-col>

                      <!-- TOTAL PCS -->
                      <v-col
                        cols="6"
                        class="pr-8 pl-8 pt-10"
                      >
                        <v-currency-field
                          v-model="form.quantity_of_unit"
                          label="Unit Quantity"
                          outlined
                          dense
                          type="number"
                          :decimal-length="0"
                          hide-details="auto"
                          class="text-green mt-n8"
                          @change="onChangeTotalPieces"
                        ></v-currency-field>
                      </v-col>

                      <!-- BUTTONS -->
                      <v-col
                        cols="12"
                        class="d-flex"
                      >
                        <v-btn
                          v-if="form.product_id && form.unit_id && form.quantity_of_unit"
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

        <!--  UNIT QUANTITY      -->
        <template #[`item.quantity_of_unit`]="{item}">
          <div class="text-green text--primary">
            <span class="text-green">{{ item.quantity_of_unit.toLocaleString('en-US') }}</span>
          </div>
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
import { computed, ref } from '@vue/composition-api/dist/vue-composition-api'
import store from '@/store'

const headers = [
  {
    text: 'Item Name',
    sortable: true,
    value: 'product.name',
  },
  {
    text: 'Unit',
    sortable: true,
    value: 'unit.name',
  },
  {
    text: 'Quantity Of Unit',
    sortable: true,
    value: 'quantity_of_unit',
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
  name: 'FinishProductForm',
  setup(props, { emit }) {
    const stockItemDialog = ref(false)
    const form = ref({
      units: [],
    })
    const items = ref([])
    const products = computed(() => store.state.FinishProductStore.list)

    const resetData = () => {
      form.value = {}
      stockItemDialog.value = !stockItemDialog.value
    }

    const addItem = () => {
      if (form.value.product_id) {
        items.value.push(form.value)
        emit('reSyncItemsToProduce', items.value)
      }

      resetData()
    }

    const deleteItem = index => {
      items.value.splice(index, 1)
      emit('reSyncItemsToProduce', items.value)
    }

    const onSelectFinishProduct = () => {
      const product = products.value.find(productItem => productItem.id === form.value.product_id)

      form.value.product = product
      form.value.units = product.units
    }

    const onSelectUnit = () => {
      form.value.unit = form.value.units.find(unitData => unitData.id === form.value.unit_id)
    }

    const onChangeTotalPieces = () => {
      // eslint-disable-next-line radix
      form.value.total_pieces = form.value.quantity_of_unit * parseInt(form.value.unit.pivot.packing)
    }

    return {
      form,
      products,
      headers,
      items,
      stockItemDialog,
      addItem,
      deleteItem,
      resetData,
      onChangeTotalPieces,
      onSelectFinishProduct,
      onSelectUnit,
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
