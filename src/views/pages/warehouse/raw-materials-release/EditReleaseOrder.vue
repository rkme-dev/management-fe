<template>
  <v-card id="release-order-creation-card">
    <v-toolbar
      color="teal"
      dark
      outlined
    >
      <v-toolbar-title>Edit Release Request Order</v-toolbar-title>
    </v-toolbar>
    <v-progress-linear
      v-show="loading"
      indeterminate
      color="primary"
    ></v-progress-linear>
    <release-form :release-order="releaseOrder" />
  </v-card>
</template>

<script>
import { mdiAccountOutline } from '@mdi/js'
import { onMounted, computed } from '@vue/composition-api/dist/vue-composition-api'
import store from '@/store'
import ReleaseForm from './ReleaseForm.vue'

export default {
  components: {
    ReleaseForm,
  },
  setup(props, context) {
    const releaseOrderId = context.root.$route.params.id

    onMounted(() => {
      store.dispatch('ReleaseOrderStore/getReleaseOrder', releaseOrderId)
    })

    const releaseOrder = computed(() => store.state.ReleaseOrderStore.releaseOrder)
    const loading = computed(() => store.state.ReleaseOrderStore.loading)

    return {
      releaseOrder,
      loading,
      icons: {
        mdiAccountOutline,
      },
    }
  },
}
</script>
