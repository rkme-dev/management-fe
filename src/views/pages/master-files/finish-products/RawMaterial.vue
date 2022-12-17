<template>
  <v-row>
    <v-col
      cols="12"
    >
      <v-data-table
        :headers="headers"
        :items="rawMaterialItems"
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
                  Modify Raw Materials
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
                                Raw Materials needed to produce the finish product.
                              </p>
                            </div>
                          </div>
                        </v-alert>
                      </v-col>
                      <v-col
                        cols="12"
                      >
                        <v-select
                          v-model="currentItem.raw_materials"
                          :items="rawMaterialList"
                          item-text="name"
                          item-value="id"
                          :error-messages="errors.raw_materials"
                          label="Raw Materials"
                          multiple
                          clearable
                        >
                        </v-select>
                      </v-col>
                      <v-col
                        cols="12"
                        class="d-flex"
                      >
                        <v-btn
                          v-if="currentItem.raw_materials.length > 0"
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
  computed, ref, toRef, watch,
} from '@vue/composition-api'
import store from '@/store'

export default {
  name: 'RawMaterial',
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
    existingItems: {
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
    const itemFormModal = ref(false)
    const errors = computed(() => store.state.FinishProductStore.errors)
    const formData = ref({})
    const formTitle = ref('Add Raw Materials')
    const rawMaterialItems = toRef(props, 'existingItems')

    const rawMaterialList = computed(() => store.state.RawMaterialStore.list)
    const currentItem = ref({
      raw_materials: [],
    })

    currentItem.value.raw_materials = rawMaterialItems.value.map(rawMaterial => rawMaterial.id)

    const addItem = () => {
      emit('addedRawMaterial', rawMaterialList.value.filter(item => currentItem.value.raw_materials.includes(item.id)))

      currentItem.value.packing = null
      currentItem.value.unit_id = null
      itemFormModal.value = false
    }

    const deleteItem = item => {
      const reducedMaterials = []

      rawMaterialItems.value.forEach(rawMaterial => {
        if (currentItem.value.raw_materials.includes(rawMaterial.id) && rawMaterial.id !== item.id) {
          reducedMaterials.push(rawMaterial)
        }
      })

      emit('addedRawMaterial', reducedMaterials)

      itemFormModal.value = false
    }

    watch(rawMaterialItems, () => {
      currentItem.value.raw_materials = rawMaterialItems.value.map(rawMaterial => rawMaterial.id)
    })

    const cancel = () => {
      itemFormModal.value = false
    }

    return {
      rawMaterialList,
      errors,
      addItem,
      cancel,
      deleteItem,
      isDisabled,
      formTitle,
      currentItem,
      rawMaterialItems,
      formData,
      itemFormModal,
      headers: [
        { text: 'ID', sortable: true, value: 'id' },
        { text: 'Raw Material Name', sortable: true, value: 'name' },
        { text: 'SKU', value: 'sku', sortable: true },
        { text: 'Brand', sortable: true, value: 'brand' },
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
  color: #009900 !important;
}
</style>
