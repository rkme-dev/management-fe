<template>
  <v-card>
    <v-card-title class="pa-6"> {{ mode }} </v-card-title>
    <v-card-text>
      <v-form>
        <v-row>
          <v-col cols="12">
            <v-progress-linear
              v-if="customersLoading"
              indeterminate
              color="primary"
            ></v-progress-linear>
          </v-col>
        </v-row>

        <customer-aging-items
          class="mt-2"
          :mode="modeData"
          :items="formData.sales_drs"
          :customerTotal="formData.total"
          :customer-id="formData.customer_id"
        ></customer-aging-items>

        <v-row>
          <v-col cols="12" class="d-flex">
            <v-btn
              outlined
              class="me-3 mt-4"
              type="reset"
              @click.prevent="cancel"
            >
              Close
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
    <v-card-actions> </v-card-actions>
  </v-card>
</template>
  
  <script>
import {
  ref,
  toRef,
  computed,
  watch,
  onUnmounted,
  onMounted,
} from "@vue/composition-api";
import { mdiAlertOutline, mdiInformation } from "@mdi/js";
import store from "@/store";
import CustomerAgingItems from "./CustomerAgingItems.vue";

export default {
  components: {
    CustomerAgingItems,
  },

  props: {
    mode: {
      type: String,
      required: true,
      default: () => "Selecting",
    },
    data: {
      type: Object,
      required: false,
      default: null,
    },
  },

  setup(props, { emit }) {
    const modeData = toRef(props, "mode");
    const dataProp = toRef(props, "data");
    const customersLoading = computed(() => store.state.CustomerStore.loading);

    const formData = ref({
      id: null,
      dateModal: false,
      customer_name: null,
      customer_id: null,
      date_posted: null,
      sales_order_number: null,
      document_id: null,
      address: null,
      remarks: null,
      area: null,
      salesman_id_1: null,
      salesman_id_2: null,
      term_id: null,
      vat_id: null,
      sales_drs: [],
    });

    formData.value = dataProp.value ?? formData.value;

    const initialize = () => {
      store.dispatch("CustomerStore/agingItems", dataProp.value.id);
    };

    const cancel = () => {
      store.dispatch("CustomerStore/removeErrors");
      emit("submit", {});
    };

    onMounted(() => {
      initialize();
    });

    const salesDrTotalAmount = ref(0);

    const fetchTotalAmount = (totalAmount) => {
      salesDrTotalAmount.value = totalAmount;
    };

    return {
      customersLoading,
      modeData,
      formData,
      fetchTotalAmount,
      cancel,
      icons: {
        mdiAlertOutline,
        mdiInformation,
      },
    };
  },
};
</script>
  .text-green input {
  color: chartreuse !important;
  }
  <style>
.text-green input {
  color: chartreuse !important;
}
</style>
  