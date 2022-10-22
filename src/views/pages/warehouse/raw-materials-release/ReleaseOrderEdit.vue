<template>
  <div>
    <ReleaseForm></ReleaseForm>
  </div>
</template>

<script>
import ReleaseForm from '@/views/pages/warehouse/raw-materials-release/ReleaseForm.vue'

export default {
  name: 'ReleaseOrderEdit',
  components: {
    ReleaseForm,
  },
  setup(props) {
    const selectedProduct = ref('')
    const attachedProducts = ref([])
    const selectedProductIds = ref([])
    const productRow = ref(1)
    const productDropdown = ref([])
  },
}
</script>

<style scoped>

</style>
