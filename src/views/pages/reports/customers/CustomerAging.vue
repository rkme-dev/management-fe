<template>
  <div>
    <v-alert :type="alert.type" dismissible :value="alert.show">
      {{ alert.message }}
    </v-alert>
    <v-data-table
      :headers="headers"
      :items="aging"
      :search="search"
      class="elevation-1 font-weight-light"
      :loading="loading"
      sort-by="name"
      fixed-header
    >
      <!-- is_active -->
      <template #[`item.status`]="{ item }">
        <div class="d-flex justify-center">
          <v-chip
            small
            :class="`${statusColor[item.status]}--text`"
            class="v-chip-light-bg text-center"
          >
            {{ item.status }}
          </v-chip>
        </div>
      </template>
      <template v-slot:top>
        <v-toolbar flat>
          <v-col cols="3" offset-md="12" md="3">
            <v-toolbar-title>Customer Aging</v-toolbar-title>
          </v-col>
          <v-divider class="mx-2" inset vertical></v-divider>
          <v-card-text>
            <v-row>
              <v-col cols="4">
                <v-text-field
                  v-model="search"
                  :append-icon="icons.mdiMagnify"
                  label="Search"
                  single-line
                  hide-details
                ></v-text-field>
              </v-col>
              <v-col cols="4" offset-md="4">
                <v-select
                  v-model="filter"
                  dense
                  outlined
                  multiple
                  :prepend-inner-icon="icons.mdiHumanEdit"
                  item-text="title"
                  item-value="id"
                  label="Status"
                  :items="statusOptions"
                  hide-details="auto"
                ></v-select>
              </v-col>
            </v-row>
          </v-card-text>
          <v-dialog
            v-model="dialog"
            width="900px"
            fullscreen
            max-width="900px"
            max-height="900px"
            height="500px"
            transition="dialog-bottom-transition"
          >
            <v-card class="elevation-13">
              <customer-form
                :mode="mode"
                :data="editedItem"
                @submit="closeModal"
                @clicked="dialog = false"
              ></customer-form>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>

      <template #item.total="{ item }">
        <v-currency-field
          v-model="item.total"
          prefix="PHP"
          class="text-green"
          disabled
        >
        </v-currency-field>
      </template>

      <template v-slot:item.actions="{ item }">
        <v-icon medium class="mr-2" @click="editItem(item)">
          {{ icons.mdiAccountEdit }}
        </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary"> Refresh </v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { mdiAccountEdit, mdiDeleteCircle } from "@mdi/js";
import { ref, watch } from "@vue/composition-api";
import CustomerForm from "@/views/pages/reports/customers/CustomerForm.vue";
import store from "@/store";

export default {
  components: {
    CustomerForm,
  },
  setup() {
    const statusColor = {
      Active: "success",
      Inactive: "info",
      "Bad Account": "error",
    };

    const search = ref();
    const filter = ref();
    const statusOptions = ref([
      {
        title: "Active",
        id: "Active",
      },
      {
        title: "Inactive",
        id: "Inactive",
      },
    ]);

    watch(filter, () => {
      store.dispatch("CustomerStore/filter", filter.value);
    });

    return {
      statusOptions,
      filter,
      icons: {
        mdiAccountEdit,
        mdiDeleteCircle,
      },
      search,
      statusColor,
    };
  },
  data: () => ({
    alert: {
      message: "",
      type: "success",
      show: false,
    },
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: "Code",
        align: "start",
        sortable: true,
        value: "code",
      },
      { text: "Name", value: "name" },
      { text: "Type", value: "type", align: "left" },
      { text: "Current", value: "one_thirty_total", align: "left" },
      { text: "31-60", value: "thirtyone_sixty_total", align: "left" },
      { text: "61-90", value: "sixtyone_ninety_total", align: "left" },
      { text: "91-120", value: "ninetyone_htwenty_total", align: "left" },
      { text: "121-150", value: "htwentyone_hfifty_total", align: "left" },
      { text: "151-180", value: "hfiftyone_heighty_total", align: "left" },
      { text: "Above 180", value: "heightyone_above_total", align: "left" },
      { text: "Total", value: "total", align: "left" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    editedIndex: -1,
    editedItem: {
      code: "",
      description: "",
      days: "",
      is_active: "",
      is_bad_account: "",
      actions: "",
    },
    defaultItem: {
      code: "",
      description: "",
      days: "",
      is_active: false,
      is_bad_account: "",
      actions: "",
    },
    mode: "Create",
  }),

  computed: {
    formTitle() {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.mode = this.editedIndex === -1 ? "Create" : "Edit";

      return this.editedIndex === -1 ? "New Customer" : "Edit Customer";
    },
    aging() {
      return this.$store.state.CustomerStore.aging;
    },
    loading() {
      return this.$store.state.CustomerStore.loading;
    },
  },

  watch: {
    dialog(val) {
      return val || this.close();
    },
    dialogDelete(val) {
      return val || this.closeDelete();
    },
  },
  created() {
    let params = '';

    if (this.$route.query.cId) {
      params = `?cId=${this.$route.query.cId}`
    }
    this.$store.dispatch("CustomerStore/aging", params);
    
    this.$store.dispatch("CustomerStore/removeErrors");
  },
  methods: {
    closeModal() {
      this.dialog = false;
      this.editedItem = {};
      this.editedIndex = -1;
      this.mode = "Create";
    },
    closeUserCreate(value) {
      this.dialog = false;
      this.alert.message = value.alertMessage;
      this.alert.type = value.alertType;
      this.alert.show = true;

      setTimeout(() => {
        this.alert.show = false;
      }, 1500);
    },

    editItem(item) {
      this.mode = item.name;
      this.editedItem = { ...item };
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.aging.indexOf(item);
      this.editedItem = { ...item };
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.aging[this.editedIndex].is_active = false;
      store
        .dispatch("CustomerStore/update", this.aging[this.editedIndex])
        .then((response) => {
          if (response.status === undefined) {
            store.dispatch("CustomerStore/aging");
          }
        });
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = { ...this.defaultItem };
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = { ...this.defaultItem };
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.users[this.editedIndex], this.editedItem);
      } else {
        this.users.push(this.editedItem);
      }
      this.close();
    },
  },
};
</script>
