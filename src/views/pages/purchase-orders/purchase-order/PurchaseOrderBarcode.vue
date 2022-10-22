<template>
  <div class="grey lighten-5 my-6 mx-4">
    <div id="printData">
      <div class="d-flex mb-4">
        <div
          v-for="n in data.quantity"
          :key="n"
          class="bg-gray-500 h-12 mr-4">
          <vue-barcode :value="data.barcode" />
          <p class="text-center">Test</p>
        </div>
      </div>
    </div>

    <v-btn
      outlined
      class="mr-3"
      type="reset"
      @click="print"
    >
      Print barcode
    </v-btn>
  </div>
</template>
<script>
import VueBarcode from '@chenfengyuan/vue-barcode'
import {computed} from '@vue/composition-api/dist/vue-composition-api'

export default {
  components: {
    VueBarcode
  },
  props: {
    barcodeData: {
      type: Object,
      default: () => ({
        barcode: '',
        quantity: 0,
      }),
    },
  },
  setup(props, context) {
    const data = computed(() => props.barcodeData)
    const print = () => {
      context.root.$htmlToPaper('printData')
    }
    return {
      data,
      print
    }
  }
}
</script>
