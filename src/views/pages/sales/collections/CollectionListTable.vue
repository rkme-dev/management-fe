<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="collectionOrders"
      sort-by="name"
      class="elevation-1"
      :search="search"
      :loading="loading"
    >
      <template #item.created_at="{ item }">
        {{ dateFormat1(item.created_at) }}
      </template>
      <template #item.amount="{ item }">
        <v-currency-field
          prefix="PHP"
          class="text-green"
          v-model="item.amount"
          disabled
        >
        </v-currency-field>
      </template>
      <template v-slot:top>
        <v-toolbar color="teal" outlined>
          <v-toolbar-title>Collections</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
            class="mr-4"
          ></v-text-field>
          <v-btn color="success" dark class="mb-2 mr-4" @click="openQrModal">
            <v-icon>{{ icons.mdiQrcodeScan }}</v-icon>
            Scan DR QR
          </v-btn>
          <v-btn color="primary" dark class="mb-2" @click="createCollection">
            Create Collection
          </v-btn>
          <v-dialog
            v-model="collectionOrderDialog"
            width="900px"
            fullscreen
            max-width="900px"
            max-height="900px"
            height="500px"
            transition="dialog-bottom-transition"
          >
            <collection-form
              :mode="modeData"
              :data="collectionOrder"
              @submit="initialize"
            >
            </collection-form>
          </v-dialog>
          <v-dialog
            v-model="qrModal"
            width="900px"
            height="500px"
            transition="dialog-bottom-transition"
          >
            <v-card>
              <v-card-title> Scan Sales DR QR </v-card-title>
            </v-card>
            <v-card-text>
              <qrcode-stream
                :track="scannerOptions"
                @decode="onDecode"
                @init="onInit"
              >
              </qrcode-stream>
            </v-card-text>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon medium class="mr-2" @click="editItem(item)">
          {{ icons.mdiAccountEdit }}
        </v-icon>
        <v-icon
          v-if="item.is_active === 'Active'"
          small
          @click="deleteItem(item)"
        >
          {{ icons.mdiDeleteCircle }}
        </v-icon>
        <v-icon
          v-if="item.status === 'Posted'"
          color="info"
          style="margin-left: 10px"
          medium
          class="mr-2"
          @click="redirectPrint(item.id)"
        >
          {{ mdiPrinter }}
        </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize"> Reset </v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import {
  mdiAccountEdit,
  mdiDeleteCircle,
  mdiQrcodeScan,
  mdiPrinter,
} from "@mdi/js";
import { QrcodeStream } from "vue-qrcode-reader";
import { ref, computed, onMounted } from "@vue/composition-api";
import store from "@/store";
import { dateFormat1 } from "@/utils/time";
import CollectionForm from "./CollectionForm.vue";
import router from "@/router";

export default {
  name: "CollectionListTable",
  components: {
    CollectionForm,
    QrcodeStream,
  },
  setup() {
    store.dispatch("ProductStore/list");
    const modeData = ref("Create");
    const collectionOrderDialog = ref(false);
    const search = ref("");
    const headers = ref([
      {
        text: "Date",
        align: "start",
        sortable: false,
        value: "created_at",
      },
      { text: "Collection No", value: "collection_order_number" },
      { text: "Document", value: "document.document_name" },
      { text: "Customer", value: "customer.name" },
      { text: "Amount", value: "amount" },
      { text: "Status", value: "status" },
      { text: "Actions", value: "actions", sortable: false },
    ]);

    const defaultItem = ref({
      name: "",
      contact_person: "",
      email: "",
      tin: "",
      contact_no: "",
      delivery_address: "",
    });
    const collectionOrder = ref({
      dateModal: false,
      customer_name: null,
      customer_id: null,
      date_posted: null,
      collection_order_number: null,
      document_id: null,
      address: null,
      remarks: null,
      area: null,
      salesman_id_1: null,
      salesman_id_2: null,
      term_id: null,
      vat_id: null,
    });

    const collectionOrders = computed(() => store.state.CollectionStore.list);
    const errors = computed(() => store.getters.errors);
    const loading = computed(() => store.state.CollectionStore.loading);

    const initialize = () => {
      collectionOrderDialog.value = false;
      store.dispatch("CollectionStore/list");
    };

    const createCollection = () => {
      modeData.value = "Create";
      collectionOrderDialog.value = true;
      collectionOrder.value = {
        dateModal: false,
        customer_name: null,
        customer_id: null,
        date_posted: null,
        collection_order_number: null,
        document_id: null,
        address: null,
        remarks: null,
        area: null,
        salesman_id_1: null,
        salesman_id_2: null,
        term_id: null,
        vat_id: null,
      };
    };

    const qrModal = ref(false);

    const editItem = (item) => {
      collectionOrder.value = item;
      modeData.value = "Edit";
      collectionOrderDialog.value = true;
    };

    onMounted(() => {
      initialize();
    });

    const redirectPrint = (id) => {
      window.open(
        `https://management-api-v1.herokuapp.com/posted-collection-receipt/${id}`,
        "_blank"
      );
    };

    const openQrModal = () => {
      qrModal.value = !qrModal.value;
    };

    const onInit = (promise) => {
      promise.then().catch();
    };

    const onDecode = (result) => {
      router.replace(result);
    };

    const scannerOptions = (detectedCodes, ctx) => {
      for (const detectedCode of detectedCodes) {
        const [firstPoint, ...otherPoints] = detectedCode.cornerPoints;

        ctx.strokeStyle = "red";

        ctx.beginPath();
        ctx.moveTo(firstPoint.x, firstPoint.y);
        for (const { x, y } of otherPoints) {
          ctx.lineTo(x, y);
        }
        ctx.lineTo(firstPoint.x, firstPoint.y);
        ctx.closePath();
        ctx.stroke();
      }
    };

    return {
      onInit,
      onDecode,
      scannerOptions,
      openQrModal,
      editItem,
      collectionOrder,
      createCollection,
      modeData,
      collectionOrderDialog,
      mdiAccountEdit,
      mdiDeleteCircle,
      defaultItem,
      headers,
      search,
      collectionOrders,
      errors,
      initialize,
      loading,
      dateFormat1,
      icons: {
        mdiQrcodeScan,
        mdiAccountEdit,
        mdiDeleteCircle,
      },
      qrModal,
      mdiPrinter,
      redirectPrint,
    };
  },
};
</script>
<style>
.text-green input {
  color: chartreuse !important;
}
</style>
