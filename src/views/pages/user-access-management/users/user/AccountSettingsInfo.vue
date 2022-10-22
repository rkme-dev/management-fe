<template>
  <v-card
    flat
    class="pa-3 mt-2"
  >
    <v-alert
      v-show="successInfo"
      dense
      text
      type="success"
      dismissible
    >
      Successfully updated
    </v-alert>
    <v-form class="multi-col-validation">
      <v-card-text class="pt-5">
        <v-row>
          <v-col
            cols="6"
            mb="6"
          >
            <v-text-field
              id="firstname"
              v-model="user.first_name"
              :prepend-inner-icon="icons.mdiAccountOutline"
              :error-messages="errors.first_name"
              outlined
              dense
              hide-details="auto"
              placeholder="First Name*"
            ></v-text-field>
          </v-col>
          <v-col
            cols="6"
            mb="6"
          >
            <v-text-field
              id="middlename"
              v-model="user.middle_name"
              :prepend-inner-icon="icons.mdiAccountOutline"
              :error-messages="errors.middle_name"
              outlined
              dense
              hide-details="auto"
              placeholder="Middle Name"
            ></v-text-field>
          </v-col>
          <v-col
            cols="6"
            mb="6"
          >
            <v-text-field
              id="lastname"
              v-model="user.last_name"
              :prepend-inner-icon="icons.mdiAccountOutline"
              :error-messages="errors.last_name"
              outlined
              dense
              hide-details="auto"
              placeholder="Last Name*"
            ></v-text-field>
          </v-col>
          <v-col
            cols="6"
            mb="6"
          >
            <v-select
              v-model="user.gender"
              dense
              outlined
              placeholder="Gender*"
              :prepend-inner-icon="icons.mdiGenderNonBinary"
              :error-messages="errors.gender"
              :items="genders"
            ></v-select>
          </v-col>
          <v-col
            cols="6"
            mb="6"
          >
            <v-text-field
              id="number"
              v-model="user.number"
              :prepend-inner-icon="icons.mdiCellphone"
              :error-messages="errors.number"
              outlined
              dense
              hide-details="auto"
              placeholder="Mobile/Phone Number"
            ></v-text-field>
          </v-col>
          <v-col
            cols="6"
            mb="6"
          >
            <v-menu
              v-model="menu2"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="user.birth_date"
                  label="Date of Birth"
                  persistent-hint
                  :prepend-icon="icons.mdiCalendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>

              <v-date-picker
                v-model="birthDate"
                no-title
                color="primary"
                @input="menu2 = false"
              ></v-date-picker>
            </v-menu>
          </v-col>
          <v-col
            cols="6"
            mb="6"
          >
            <v-text-field
              id="pagibig"
              v-model="user.pagibig"
              :prepend-inner-icon="icons.mdiIdCard"
              :error-messages="errors.pagibig"
              outlined
              dense
              hide-details="auto"
              placeholder="Pagibig Number #"
            ></v-text-field>
          </v-col>
          <v-col
            cols="6"
            mb="6"
          >
            <v-text-field
              id="tin"
              v-model="user.tin"
              :prepend-inner-icon="icons.mdiIdCard"
              :error-messages="errors.tin"
              outlined
              dense
              hide-details="auto"
              placeholder="TIN #"
            ></v-text-field>
          </v-col>
          <v-col
            cols="6"
            mb="6"
          >
            <v-text-field
              id="sss"
              v-model="user.sss"
              :prepend-inner-icon="icons.mdiIdCard"
              :error-messages="errors.sss"
              outlined
              dense
              hide-details="auto"
              placeholder="SSS #"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-alert
              color="warning"
              text
              style="margin-top: 25px; margin-bottom: -10px"
            >
              <div class="d-flex align-start">
                <v-icon color="warning">
                  {{ icons.mdiAlertOutline }}
                </v-icon>

                <div class="ms-3">
                  <p class="text-base font-weight-medium mb-1">
                    Emergency Contact Information
                  </p>
                </div>
              </div>
            </v-alert>
          </v-col>
          <v-col
            cols="6"
            mb="6"
          >
            <v-text-field
              id="emergecnyContactName"
              v-model="user.emergency_contact_name"
              :prepend-inner-icon="icons.mdiAccountOutline"
              :error-messages="errors.emergency_contact_name"
              outlined
              dense
              hide-details="auto"
              placeholder="Contact Name"
            ></v-text-field>
          </v-col>
          <v-col
            cols="6"
            mb="6"
          >
            <v-text-field
              id="emergencyContactAddress"
              v-model="user.emergency_contact_address"
              :prepend-inner-icon="icons.mdiHomeFloor0"
              :error-messages="errors.emergency_contact_address"
              outlined
              dense
              hide-details="auto"
              placeholder="Contact Address"
            ></v-text-field>
          </v-col>
          <v-col
            cols="6"
            mb="6"
          >
            <v-text-field
              id="emergencyContactNumber"
              v-model="user.emergency_contact_number"
              :prepend-inner-icon="icons.mdiCellphone"
              :error-messages="errors.emergency_contact_number"
              outlined
              dense
              hide-details="auto"
              placeholder="Contact Number"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-text>
        <v-btn
          color="primary"
          class="me-3 mt-3"
          @click.prevent="submit"
        >
          Save changes
        </v-btn>
        <v-btn
          outlined
          class="mt-3"
          color="secondary"
          type="reset"
          @click.prevent="goBack"
        >
          Go Back To Users Page
        </v-btn>
      </v-card-text>
    </v-form>
  </v-card>
</template>

<script>
import { computed, ref, toRef } from '@vue/composition-api'
import store from '@/store'
import router from '@/router'
import {
  mdiAccessPointCheck,
  mdiAccountOutline,
  mdiCalendar,
  mdiCellphone,
  mdiEmailOutline,
  mdiEye,
  mdiEyeOff,
  mdiGenderNonBinary,
  mdiGroup,
  mdiHomeFloor0,
  mdiHomePlus,
  mdiHumanEdit,
  mdiIdCard,
  mdiIdentifier,
  mdiListStatus,
  mdiLockOutline,
  mdiOrigin,
  mdiOutdoorLamp,
  mdiPackage,
} from '@mdi/js'

export default {
  props: {
    informationData: {
      type: Object,
      default: () => {},
    },
  },
  setup(props) {
    const errors = computed(() => store.state.UserAccessManagementStore.errors)
    const loading = computed(() => store.state.UserAccessManagementStore.loading)
    const user = toRef(props, 'informationData')
    const successInfo = ref(false)

    const birthDate = ref(new Date().toISOString().substr(0, 10))

    const menu2 = ref(false)
    const formatDate = dates => {
      if (!dates) return null
      const [year, month, day] = dates.split('-')

      return `${month}/${day}/${year}`
    }

    const parseDate = dates => {
      if (!dates) return null
      const [month, day, year] = dates.split('/')

      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    }

    user.value.birth_date = computed(() => formatDate(birthDate.value))

    const genders = [
      'Male',
      'Female',
      'Others',
    ]

    const cancel = () => {
      router.push('/users')
    }

    const goBack = () => {
      router.push('/users')
    }

    const submit = () => {
      const formData = {
        id: user.value.id,
        first_name: user.value.first_name,
        middle_name: user.value.middle_name,
        last_name: user.value.last_name,
        gender: user.value.gender,
        pagibig: user.value.pagibig,
        tin: user.value.tin,
        sss: user.value.sss,
        emergency_contact_address: user.value.emergency_contact_address,
        emergency_contact_name: user.value.emergency_contact_name,
        emergency_contact_number: user.value.emergency_contact_number,
        birth_date: user.value.birth_date,
      }
      store.dispatch('UserAccessManagementStore/updateUser', formData)
        .then(
          response => {
            if (response.status === undefined) {
              successInfo.value = true

              setTimeout(() => {
                successInfo.value = false
              }, 1500)
            }
          },
        )
    }

    return {
      successInfo,
      birthDate,
      menu2,
      loading,
      parseDate,
      formatDate,
      errors,
      genders,
      cancel,
      icons: {
        mdiPackage,
        mdiOutdoorLamp,
        mdiGenderNonBinary,
        mdiGroup,
        mdiCalendar,
        mdiAccountOutline,
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
      submit,
      user,
      goBack,
    }
  },
}
</script>
