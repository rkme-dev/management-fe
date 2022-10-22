<template>
  <v-card
    id="raw-mats-release-form-card"
  >
    <v-card-title>Raw Materials Request Form</v-card-title>
    <v-form class="pa-3">
      <v-row>
        <v-col
          cols="12"
          md="2"
        >
          <label for="firstnameHorizontalIcons">Item Type</label>
        </v-col>
        <v-col
          cols="12"
          md="9"
        >
          <v-select
            v-model="releaseForm.item"
            dense
            outlined
            placeholder="Item Type"
            :prepend-inner-icon="icons.mdiListStatus"
            :error-messages="errors.item"
            :items="itemTypes"
          ></v-select>
        </v-col>
        <v-col
          cols="12"
          md="2"
        >
          <label for="totalPieces">Total Pieces</label>
        </v-col>

        <v-col
          cols="12"
          md="9"
        >
          <v-text-field
            id="totalPieces"
            v-model="releaseForm.total_pieces"
            hide-details="auto"
            :prepend-inner-icon="icons.mdiPuzzle"
            outlined
            dense
            :error-messages="errors.total_pieces"
            placeholder="123 eg."
          ></v-text-field>
        </v-col>
        <v-col
          cols="12"
          md="2"
        >
          <label for="totalBoxes">Total Boxes</label>
        </v-col>

        <v-col
          cols="12"
          md="9"
        >
          <v-text-field
            id="totalBoxes"
            v-model="releaseForm.total_boxes"
            hide-details="auto"
            :prepend-inner-icon="icons.mdiPlusBoxOutline"
            outlined
            dense
            :error-messages="errors.total_boxes"
            placeholder="123 eg."
          ></v-text-field>
        </v-col>
        <v-col
          cols="12"
          md="2"
        >
          <label for="description">Description</label>
        </v-col>
        <v-col
          cols="12"
          md="9"
        >
          <v-textarea
            id="description"
            v-model="releaseForm.description"
            outlined
            rows="4"
            label="Description"
            :readonly="false"
            hide-details="auto"
            :prepend-inner-icon="icons.mdiViewList"
            :error-messages="errors.description"
            :persistent-placeholder="false"
          ></v-textarea>
        </v-col>
        <v-col cols="12">
          <v-btn
            color="primary"
            class="me-3 mt-4"
            @click="submit"
          >
            Submit
          </v-btn>
          <v-btn
            color="error"
            outlined
            class="me-3 mt-3"
            type="reset"
            @click.prevent="cancel"
          >
            Cancel
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-card>
</template>

<script>
import { ref, computed } from '@vue/composition-api'
import {
  mdiAccessPointCheck,
  mdiAccountOutline,
  mdiPuzzle,
  mdiCalendar,
  mdiCellphone,
  mdiEmailOutline, mdiEye, mdiEyeOff,
  mdiGenderNonBinary,
  mdiGroup,
  mdiHomeFloor0,
  mdiHomePlus,
  mdiHumanEdit,
  mdiIdCard,
  mdiIdentifier,
  mdiListStatus,
  mdiLockOutline, mdiOrigin,
  mdiOutdoorLamp,
  mdiPackage, mdiPlusBoxOutline, mdiViewList,
} from '@mdi/js'
import store from '@/store'

export default {
  name: 'RequestForm',
  setup() {
    const releaseForm = ref({
      description: '',
      total_boxes: '',
      total_pieces: '',
      item: '',
    })

    const itemTypes = ['Pre Form', 'Caps']

    const errors = computed(() => store.state.UserAccessManagementStore.errors)

    return {
      errors,
      releaseForm,
      itemTypes,
      icons: {
        mdiPuzzle,
        mdiViewList,
        mdiPackage,
        mdiOutdoorLamp,
        mdiGenderNonBinary,
        mdiGroup,
        mdiCalendar,
        mdiAccountOutline,
        mdiPlusBoxOutline,
        mdiEmailOutline,
        mdiCellphone,
        mdiAccessPointCheck,
        mdiLockOutline,
        mdiHomeFloor0,
        mdiIdentifier,
        mdiIdCard,
        mdiHomePlus,
        mdiListStatus,
        mdiHumanEdit,
        mdiEye,
        mdiEyeOff,
        mdiOrigin,
      },
    }
  },
}
</script>

<style scoped>

</style>
