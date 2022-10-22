<template>
  <v-card
    id="account-setting-card"
  >
    <v-card-text>
      <!-- tabs -->
      <v-tabs
        v-model="tab"
        show-arrows
      >
        <v-tab
          v-for="tab in tabs"
          :key="tab.icon"
        >
          <v-icon
            size="20"
            class="me-3"
          >
            {{ tab.icon }}
          </v-icon>
          <span>{{ tab.title }}</span>
        </v-tab>
      </v-tabs>

      <!-- tabs item -->
      <v-tabs-items v-model="tab">
        <v-tab-item class="pa-10">
          <finish-product-form
            :mode="mode"
            :row="formData"
            @submit="submit"
          ></finish-product-form>
        </v-tab-item>
      </v-tabs-items>
    </v-card-text>
  </v-card>
</template>

<script>
import store from '@/store'
import {
  ref,
  toRef,
} from '@vue/composition-api'
import FinishProductForm from '@/views/pages/master-files/finish-products/FinishProductForm.vue'
import {
  mdiAccountOutline,
} from '@mdi/js'

export default {
  name: 'FinishProductWithUnitForm',
  components: {
    FinishProductForm,
  },
  props: {
    mode: {
      type: String,
      required: true,
      default: null,
    },
    row: {
      type: Object,
      required: false,
      default: (() => {}),
    },
  },
  setup(props, { emit }) {
    const formData = toRef(props, 'row')
    const tab = ref('')
    const step = ref(1)
    const submit = () => {
      emit('submit')
    }

    return {
      step,
      submit,
      tab,
      tabs: [
        { title: 'Product Info', icon: mdiAccountOutline },
      ],
      formData,
    }
  },
}
</script>

<style scoped>

</style>
