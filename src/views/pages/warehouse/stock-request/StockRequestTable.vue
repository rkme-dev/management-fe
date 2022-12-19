<template>
    <div>
      <v-btn @click="editItem(1)">EDIT</v-btn>

      <v-dialog
        v-model="stockRequestDialog"
        width="900px"
        fullscreen
        max-width="900px"
        max-height="900px"
        height="500px"
        transition="dialog-bottom-transition"
        >
        <stock-request-form
            :mode="mode"
            :id="stockRequestId"
            @cancel="cancel"
            @submit="submit"
        >
        </stock-request-form>
        here
        </v-dialog>
    </div>
</template>
  
<script>
    import StockRequestForm from './StockRequestForm.vue'
    import store from '@/store'

    export default {
        name: 'StockRequestTable',
        components: {
            StockRequestForm
        },
        data: () => ({
            mode: 'Edit',
            stockRequestDialog: false,
            stockRequestId: null,
            stockRequestData: {}
        }),
        methods: {
            editItem(id) {
                this.mode = 'Edit'
                this.stockRequestDialog = true
                this.stockRequestId = id
            },
            submit() {
                window.location.reload()
            },
            cancel() {
                this.stockRequestDialog = !this.stockRequestDialog
            }
        },
    }
  </script>
  