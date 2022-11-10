<template>
  <v-row class="">
    <v-col cols="12">
      <v-alert color="success" text style="margin-bottom: -30px">
        <div class="d-flex align-start">
          <v-icon color="success">
            {{ icons.mdiInformation }}
          </v-icon>
          <div class="ms-3">
            <p class="text-base font-weight-medium mb-1">
              Aging By Transactions
            </p>
          </div>
        </div>
      </v-alert>
    </v-col>
    <v-col class="" cols="12">
      <v-data-table
        :headers="headers"
        :items="agingItems.sales_drs"
        :items-per-page="5"
        :search="search"
        item-key="order_item_id"
        show-select
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-card-text>
              <v-row class="mt-10">
                <v-col cols="4">
                  <v-text-field
                    v-model="search"
                    :append-icon="icons.mdiMagnify"
                    label="Search"
                    single-line
                    hide-details
                  ></v-text-field>
                </v-col>
                <v-col cols="4"> </v-col>
                <v-col class="" cols="4">
                  <v-currency-field
                    v-model="perCustomerTotal"
                    outlined
                    class="text-green"
                    disabled
                    dense
                    hide-details="auto"
                    label="Total Amount"
                  ></v-currency-field>
                </v-col>
                <v-col cols="4" offset-md="4"> </v-col>
              </v-row>
            </v-card-text>
          </v-toolbar>
        </template>
        <template #item.one_thirty="{ item }">
          <v-currency-field
            v-model="item.one_thirty"
            prefix="PHP"
            class="text-green"
            disabled
          >
          </v-currency-field>
        </template>
        <template #item.thirtyone_sixty="{ item }">
          <v-currency-field
            v-model="item.thirtyone_sixty"
            prefix="PHP"
            class="text-green"
            disabled
          >
          </v-currency-field>
        </template>
        <template #item.sixtyone_ninety="{ item }">
          <v-currency-field
            v-model="item.sixtyone_ninety"
            prefix="PHP"
            class="text-green"
            disabled
          >
          </v-currency-field>
        </template>
        <template #item.ninetyone_htwenty="{ item }">
          <v-currency-field
            v-model="item.ninetyone_htwenty"
            prefix="PHP"
            class="text-green"
            disabled
          >
          </v-currency-field>
        </template>
        <template #item.htwentyone_hfifty="{ item }">
          <v-currency-field
            v-model="item.htwentyone_hfifty"
            prefix="PHP"
            class="text-green"
            disabled
          >
          </v-currency-field>
        </template>
        <template #item.hfiftyone_heighty="{ item }">
          <v-currency-field
            v-model="item.hfiftyone_heighty"
            prefix="PHP"
            class="text-green"
            disabled
          >
          </v-currency-field>
        </template>
        <template #item.heightyone_above="{ item }">
          <v-currency-field
            v-model="item.heightyone_above"
            prefix="PHP"
            class="text-green"
            disabled
          >
          </v-currency-field>
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
} from "@mdi/js";
import { computed, ref, toRef, watch } from "@vue/composition-api";
import store from "@/store";

export default {
  name: "CustomerAgingItems",
  props: {
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
    mode: {
      type: String,
      required: false,
      default: () => "Create",
    },
    customerId: {
      type: Number,
      required: false,
      default: null,
    },
    items: {
      type: Array,
      required: false,
      default: null,
    },
    customerTotal: {
      type: String,
      required: true,
      default: null,
    },
  },
  setup(props, { emit }) {
    store.dispatch("CustomerStore/list");
    const search = ref();
    const formData = ref({});

    const agingItems = computed(() => {
      return store.state.CustomerStore.items;
    });

    const perCustomerTotal = toRef(props, "customerTotal");

    return {
      search,
      perCustomerTotal,
      agingItems,
      formData,
      headers: [
        { text: "Date", sortable: true, value: "date_posted" },
        { text: "DR No", value: "sales_dr_number", sortable: true },
        { text: "Terms", value: "term.code", sortable: true },
        { text: "Aged Days", value: "aged_days", sortable: true },
        { text: "1-30", value: "one_thirty", sortable: true },
        { text: "31-60", value: "thirtyone_sixty", sortable: true },
        { text: "61-90", value: "sixtyone_ninety", sortable: true },
        { text: "91-120", value: "ninetyone_htwenty", sortable: true },
        { text: "121-150", value: "htwentyone_hfifty", sortable: true },
        { text: "151-180", value: "hfiftyone_heighty", sortable: true },
        { text: "180-above", value: "heightyone_above", sortable: true },
        //   { text: 'Amount', value: 'total_amount', sortable: true },
      ],
      icons: {
        mdiAccountEdit,
        mdiDeleteCircle,
        mdiInformation,
        mdiTextBoxPlus,
      },
    };
  },
};
</script>
  
  <style>
.text-green input {
  color: chartreuse !important;
}
</style>
  