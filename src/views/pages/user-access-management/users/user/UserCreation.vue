<template>
  <div>
    <v-card
      id="client-creation-card"
      class="mb-3"
    >
      <v-card class="pa-3 mt-2">
        <v-card-title>Create User</v-card-title>
        <v-form class="pa-3">
          <v-row>
            <v-col cols="12">
              <v-alert
                color="primary"
                text
                style="margin-bottom: -10px"
              >
                <div class="d-flex align-start">
                  <v-icon color="primary">
                    {{ icons.mdiAlertOutline }}
                  </v-icon>

                  <div class="ms-3">
                    <p class="text-base font-weight-medium mb-1">
                      Account Information
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
                id="email"
                v-model="user.email"
                :prepend-inner-icon="icons.mdiEmailOutline"
                :error-messages="errors.email"
                outlined
                dense
                hide-details="auto"
                placeholder="Email*"
              ></v-text-field>
            </v-col>
            <v-col
              cols="6"
              mb="6"
            >
              <v-text-field
                id="passwordHorizontalIcons"
                v-model="user.password"
                :prepend-inner-icon="icons.mdiLockOutline"
                outlined
                dense
                :error-messages="errors.password"
                placeholder="Password"
                hide-details="auto"
                :append-icon="value ? icons.mdiEye : icons.mdiEyeOff"
                :type="value ? 'password' : 'text'"
                @click:append="() => (value = !value)"
              ></v-text-field>
            </v-col>
            <v-col
              cols="6"
              mb="6"
              class="mb-3"
            >
              <v-text-field
                id="passwordConfirmation"
                v-model="user.password_confirmation"
                :prepend-inner-icon="icons.mdiLockOutline"
                outlined
                dense
                :error-messages="errors.password_confirmation"
                placeholder="Password Confirmation"
                hide-details="auto"
                :append-icon="value ? icons.mdiEye : icons.mdiEyeOff"
                :type="value ? 'password' : 'text'"
                @click:append="() => (value = !value)"
              ></v-text-field>
            </v-col>
            <v-col
              cols="6"
              mb="6"
            >
              <v-select
                v-model="user.status"
                dense
                outlined
                placeholder="Status*"
                :prepend-inner-icon="icons.mdiListStatus"
                :error-messages="errors.status"
                :items="statusOptions"
              ></v-select>
            </v-col>
            <v-col
              cols="6"
              mb="6"
            >
              <v-select
                v-model="user.access_level_id"
                dense
                outlined
                placeholder="Access Level*"
                :prepend-inner-icon="icons.mdiAccessPointCheck"
                :error-messages="errors.access_level_id"
                :items="accessLevels"
                item-value="id"
                item-text="name"
              ></v-select>
            </v-col>
            <v-col
              cols="6"
              mb="6"
            >
              <v-select
                v-model="user.department_id"
                dense
                outlined
                placeholder="Department*"
                :error-messages="errors.department_id"
                :prepend-inner-icon="icons.mdiGroup"
                :items="departments"
                item-value="id"
                item-text="name"
              ></v-select>
            </v-col>
            <v-col
              cols="6"
              mb="6"
            >
              <v-menu
                v-model="menu1"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="user.date_hired"
                    label="Date Hired"
                    persistent-hint
                    :prepend-icon="icons.mdiCalendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>

                <v-date-picker
                  v-model="dateHired"
                  no-title
                  color="primary"
                  @input="menu1 = false"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <v-col
              cols="6"
              mb="6"
            >
              <v-select
                v-model="user.employment_type"
                dense
                outlined
                placeholder="Employment Type"
                :prepend-icon="icons.mdiPackage"
                :error-messages="errors.employment_type"
                :items="employmentTypes"
              ></v-select>
            </v-col>
            <v-col
              cols="6"
              mb="6"
            >
              <v-text-field
                id="designation"
                v-model="user.designation"
                :prepend-inner-icon="icons.mdiOrigin"
                :error-messages="errors.designation"
                outlined
                dense
                hide-details="auto"
                placeholder="Designation"
              ></v-text-field>
            </v-col>

            <v-col cols="12">
              <v-alert
                color="info"
                text
                style="margin-top: 25px; margin-bottom: -10px"
              >
                <div class="d-flex align-start">
                  <v-icon color="info">
                    {{ icons.mdiAlertOutline }}
                  </v-icon>

                  <div class="ms-3">
                    <p class="text-base font-weight-medium mb-1">
                      Personal Information
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
          <v-col cols="12">
            <v-btn
              color="primary"
              class="me-3 mt-4"
              @click="submit"
            >
              Submit
            </v-btn>
            <v-btn
              outlined
              class="me-3 mt-3"
              type="reset"
              @click.prevent="cancel"
            >
              Cancel
            </v-btn>
          </v-col>
        </v-form>
      </v-card>
    </v-card>
  </div>
</template>

<script>
import UserAccessManagementService from '@/service/UserAccessManagementService'
import { computed, onMounted, ref, watch } from '@vue/composition-api/dist/vue-composition-api'
import store from '@/store'
import {
  mdiAccessPointCheck,
  mdiAccountOutline,
  mdiCalendar,
  mdiCellphone,
  mdiEmailOutline,
  mdiEye,
  mdiEyeOff, mdiGenderNonBinary, mdiGroup,
  mdiHomeFloor0,
  mdiHomePlus,
  mdiHumanEdit,
  mdiIdCard,
  mdiIdentifier,
  mdiListStatus,
  mdiLockOutline, mdiOrigin, mdiOutdoorLamp, mdiPackage,
} from '@mdi/js'
import router from '@/router'

export default {
  name: 'UserCreation',
  components: {
  },
  data: () => ({
    value: String,
  }),
  setup() {
    const service = new UserAccessManagementService()
    const errors = computed(() => store.state.UserAccessManagementStore.errors)
    const loading = computed(() => store.state.UserAccessManagementStore.loading)
    const user = ref({
      name: '',
      email: '',
      status: '',
      role: '',
      password: '',
      password_confirmation: '',
      birth_date: '',
      date_hired: '',
    })

    const birthDate = ref(new Date().toISOString().substr(0, 10))
    const dateHired = ref(new Date().toISOString().substr(0, 10))
    const menu2 = ref(false)
    const menu1 = ref(false)

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

    const computedDateBirthFormatted = computed(() => formatDate(birthDate.value))
    const computedDateHiredFormatted = computed(() => formatDate(dateHired.value))

    user.value.birth_date = computedDateBirthFormatted
    user.value.date_hired = computedDateHiredFormatted

    const statusOptions = [
      'Active',
      'Pending',
      'Deleted',
      'Deactivated',
      'Inactive',
    ]

    const employmentTypes = [
      'Regular',
      'Contractual',
      'Probationary',
      'N/A',
    ]

    const genders = [
      'Male',
      'Female',
      'Others',
    ]

    const abilitiesOptions = ref([])
    const accessLevels = ref([])
    const departments = ref([])
    const roleOptions = ref([])
    const abilitiesSelected = ref([])

    onMounted(async () => {
      await service.getAccessLevels(true)
        .then(response => {
          accessLevels.value = response.data
        })

      await service.getDepartments()
        .then(response => {
          departments.value = response.data
        })

      await service.getRoles(true)
        .then(response => {
          roleOptions.value = response.data
        })
    })

    const cancel = () => {
      router.push('/users')
    }

    const submit = () => {
      store.dispatch('UserAccessManagementStore/createUser', user.value).then(
        response => {
          if (response.status === undefined) {
            router.push(`/users/${response.data.id}`)
          }
        },
      )
    }

    return {
      accessLevels,
      departments,
      employmentTypes,
      birthDate,
      dateHired,
      menu2,
      menu1,
      loading,
      parseDate,
      formatDate,
      abilitiesSelected,
      abilitiesOptions,
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
      roleOptions,
      statusOptions,
      submit,
      user,
    }
  },
  computed: {
  },
  methods: {
  },
}
</script>

<style scoped>

</style>
