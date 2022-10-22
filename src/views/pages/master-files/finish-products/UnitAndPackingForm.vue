<template>
  <v-row>
    <v-col
      cols="12"
    >
      <v-data-table
        :headers="headers"
        :items="unitItems"
        :items-per-page="5"
      >
        <template v-slot:top>
          <v-toolbar
            flat
            color="primary"
          >
            <v-dialog
              v-model="itemFormModal"
              width="1200px"
              height="500px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  elevation="10"
                  dark
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  Add Unit
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">{{ formTitle }}</span>
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
                              {{ icons.mdiTextBoxPlus }}
                            </v-icon>
                            <div class="ms-3">
                              <p class="text-base font-weight-medium mb-1">
                                Unit and Packing
                              </p>
                            </div>
                          </div>
                        </v-alert>
                      </v-col>
                      <v-col
                        cols="6"
                      >
                        <v-select
                          v-model="currentItem.unit_id"
                          :items="unitsList"
                          item-text="name"
                          item-value="id"
                          :error-messages="errors.unit_id"
                          label="Unit"
                        >
                        </v-select>
                      </v-col>
                      <v-col
                        cols="6"
                      >
                        <v-text-field
                          v-model="currentItem.packing"
                          outlined
                          dense
                          type="number"
                          min="0"
                          step="1"
                          onfocus="this.previousValue = this.value"
                          onkeydown="this.previousValue = this.value"
                          oninput="validity.valid || (value = this.previousValue)"
                          hide-details="auto"
                          :error-messages="errors.packing"
                          label="Packing"
                        ></v-text-field>
                      </v-col>
                      <v-col
                        cols="12"
                        class="d-flex"
                      >
                        <v-btn
                          v-if="currentItem.unit_id && currentItem.packing"
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
                          @click.prevent="cancel"
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
  mdiAccountEdit,
  mdiDeleteCircle,
  mdiInformation,
  mdiTextBoxPlus,
} from '@mdi/js'
import {
  computed, ref, toRef,
} from '@vue/composition-api'
import store from '@/store'

export default {
  name: 'UnitAndPackingForm',
  props: {
    disabled: {
      type: Boolean,
      required: false,
      default: (() => false),
    },
    mode: {
      type: String,
      required: false,
      default: (() => 'Create'),
    },
    existingUnits: {
      type: Array,
      required: true,
      default: (() => []),
    },
    items: {
      type: Array,
      required: false,
      default: null,
    },
  },
  setup(props, { emit }) {
    const isDisabled = toRef(props, 'disabled')
    const productData = toRef(props, 'product')
    const itemFormModal = ref(false)
    const errors = computed(() => store.state.FinishProductStore.errors)
    const formData = ref({})
    const formTitle = ref('Add Unit and Packing')
    const unitItems = toRef(props, 'existingUnits')

    const unitsList = computed(() => store.state.UnitPackingStore.list)
    const currentItem = ref({})

    const units = ref([])

    const addItem = () => {
      const exist = unitItems.value.find(rowItem => rowItem.id === currentItem.value.unit_id)

      if (exist === undefined || exist === null) {
        const unit = unitsList.value.find(item => currentItem.value.unit_id === item.id)

        emit('addedUnitPacking', {
          name: unit.name,
          pivot: {
            unit_packing_id: unit.id,
            packing: currentItem.value.packing,
          },
          id: unit.id,
        })
      }

      currentItem.value.packing = null
      currentItem.value.unit_id = null
      itemFormModal.value = false
    }

    const deleteItem = item => {
      const indexItem = unitItems.value.findIndex(unitItem => unitItem.id === item.id)
      unitItems.value.splice(indexItem, 1)
      itemFormModal.value = false
    }

    const cancel = () => {
      itemFormModal.value = false
    }

    return {
      unitsList,
      errors,
      addItem,
      cancel,
      deleteItem,
      isDisabled,
      formTitle,
      currentItem,
      unitItems,
      formData,
      itemFormModal,
      units,
      headers: [
        { text: 'ID', sortable: true, value: 'pivot.unit_packing_id' },
        { text: 'Unit Name', sortable: true, value: 'name' },
        { text: 'Packing', value: 'pivot.packing' },
        { text: 'Actions', value: 'actions' },
      ],
      icons: {
        mdiAccountEdit,
        mdiDeleteCircle,
        mdiInformation,
        mdiTextBoxPlus,
      },
    }
  },
}
</script>

<style>
.text-green input {
  color: chartreuse !important;
}
</style>
