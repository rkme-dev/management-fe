<template>
  <v-card
    flat
    class="pa-3 mt-2"
  >
    <v-alert
      v-show="showAlert"
      dense
      text
      type="success"
    >
      Successfully <strong>{{ mode }}d</strong> a raw material. You will be automatically
      redirected in a bit.
    </v-alert>
    <v-form class="multi-col-validation">
      <v-card-text class="pt-5">
        <v-row>
          <v-col
            cols="4"
            md="12"
          >
            <v-text-field
              v-if="optionsLocal.product_number !== ''"
              v-model="optionsLocal.product_number"
              outlined
              dense
              label="Product Number"
              :readonly="true"
              :persistent-placeholder="mode === 'show'"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model="optionsLocal.name"
              outlined
              dense
              label="Name"
              :readonly="mode === 'show'"
              hide-details="auto"
              :error-messages="errors.name"
              :persistent-placeholder="mode === 'show'"
            ></v-text-field>
          </v-col>

          <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              v-model="optionsLocal.sku"
              outlined
              dense
              label="SKU"
              :readonly="mode === 'show'"
              hide-details="auto"
              :error-messages="errors.sku"
              :persistent-placeholder="mode === 'show'"
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
          >
            <v-text-field
              v-model="optionsLocal.description"
              outlined
              dense
              label="Description"
              :readonly="mode === 'show'"
              hide-details="auto"
              :error-messages="errors.description"
              :persistent-placeholder="mode === 'show'"
            ></v-text-field>
          </v-col>
          <v-col
            cols="4"
          >
            <v-select
              v-model="optionsLocal.raw_material_type"
              outlined
              :items="rawTypes"
              item-value="value"
              item-text="label"
              label="Raw Material Type"
              dense
              :readonly="mode === 'show'"
              hide-details="auto"
              :error-messages="errors.raw_material_type"
              :persistent-placeholder="mode === 'show'"
            ></v-select>
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-text>
        <v-btn
          v-show="mode === 'create' || mode === 'update'"
          outlined
          class="mt-3 mr-3"
          color="primary"
          @click="save"
        >
          {{ buttonLabel }}
        </v-btn>
        <v-btn
          outlined
          class="mt-3"
          type="reset"
          @click.prevent="goBack"
        >
          Back to List
        </v-btn>
      </v-card-text>
    </v-form>
  </v-card>
</template>

<script>
import { computed, ref, watch } from '@vue/composition-api'
import router from '@/router'
import store from '@/store'
import { CREATE_PRODUCT, UPDATE_PRODUCT } from '@/store/actions.type'
import { SET_ERROR } from '@/store/mutations.type'

export default {
  props: {
    informationData: {
      type: Object,
      default: () => ({
        name: '',
        product_number: '',
        sku: '',
        description: '',
        in_stock: '',
        items_per_box: '',
        raw_material_type: '',
      }),
    },
    mode: {
      type: String,
    },
  },
  setup(props) {
    const errors = computed(() => store.getters.errors)
    const optionsLocal = computed(() => props.informationData)
    const showAlert = ref(false)
    const buttonLabel = props.mode === 'create' ? 'Save' : 'Update'
    const rawTypes = [
      {
        value: 'preform',
        label: 'Preform',
      },
      {
        value: 'bottle_cap',
        label: 'Bottle Cap',
      },
      {
        value: 'bottle_label',
        label: 'Bottle Label',
      },
      {
        value: 'blown_bottle',
        label: 'Blown Bottle',
      },
    ]

    const goBack = () => {
      router.push('/products')
    }

    const resolveFormSuccess = () => {
      showAlert.value = true
      setTimeout(() => {
        goBack()
      }, 1500)
    }

    const save = () => {
      if (props.mode === 'update') {
        store.dispatch(UPDATE_PRODUCT, optionsLocal.value).then(data => {
          if (data != null) {
            resolveFormSuccess()
          }
        })
      }

      if (props.mode === 'create') {
        optionsLocal.value.type = 'raw_material'

        store.dispatch(CREATE_PRODUCT, optionsLocal.value).then(data => {
          if (data != null) {
            resolveFormSuccess()
          }
        })
      }
    }

    return {
      optionsLocal,
      rawTypes,
      goBack,
      save,
      showAlert,
      errors,
      buttonLabel,
    }
  },
}
</script>
