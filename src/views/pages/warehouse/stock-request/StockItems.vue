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
        :items="stockItems"
        :items-per-page="5"
      >
      </v-data-table>
    </v-col>
  </v-row>
</template>

<script>
  import {
    mdiInformation
  } from '@mdi/js'

  export default {
    name: 'StockItems',
    data() {
      return {
        stockItems: [],
        headers: [
          {
            text: 'Item Name',
            sortable: true,
            value: 'item_name',
          },
          {
            text: 'Item Description',
            sortable: true,
            value: 'description',
          },
          {
            text: 'Total Boxes',
            sortable: true,
            value: 'total_boxes',
          },
          {
            text: 'Total Pcs',
            sortable: true,
            value: 'total_pcs',
          },
        ]
      }
    },
    setup() {
      return {
        icons: {
          mdiInformation
        },
      }
    },
  }
</script>