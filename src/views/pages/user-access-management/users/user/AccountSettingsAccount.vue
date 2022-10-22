<template>
  <v-card
    flat
    class="pa-3 mt-2"
  >
    <v-alert
      dense
      text
      v-show="successInfo"
      type="success"
      dismissible
    >
      Successfully updated
    </v-alert>
    <v-card-text class="d-flex">
      <v-avatar
        rounded
        size="350"
        class="me-4"
      >
        <v-img v-if="!accountDataLocale.profile_url" :src="require('@/assets/images/avatars/1.png')"></v-img>
        <v-img v-else :src="accountDataLocale.profile_url">
        </v-img>
      </v-avatar>

      <!-- upload photo -->
      <div>
        <v-btn
          v-if="accountDataLocale.new_image"
          color="primary"
          class="me-3 mt-5"
          @click="uploadPhoto"
        >
          <v-icon class="d-sm-none">
            {{ icons.mdiCloudUploadOutline }}
          </v-icon>
          <span class="d-none d-sm-block">Upload new photo</span>
        </v-btn>
        <v-file-input
          v-model="accountDataLocale.new_image"
          :hide-details="true"
          @change="previewImage"
        >
        </v-file-input>
      </div>
    </v-card-text>

    <v-card-text>
      <v-progress-linear
        v-show="loadingLocale"
        indeterminate
        color="primary"
      ></v-progress-linear>
      <v-form class="multi-col-validation mt-6">
        <v-row>
          <v-col
            cols="6"
            mb="6"
          >
            <v-text-field
              id="employee_id"
              disabled
              v-model="accountDataLocale.employee_number"
              :prepend-inner-icon="icons.mdiEmailOutline"
              outlined
              dense
              label="Employee Number"
              placeholder="Email*"
            ></v-text-field>
          </v-col>
          <v-col
            cols="6"
            mb="6"
          >
            <v-text-field
              id="email"
              v-model="accountDataLocale.email"
              :prepend-inner-icon="icons.mdiEmailOutline"
              :error-messages="errors.email"
              outlined
              dense
              hide-details="auto"
              label="Email"
              placeholder="Email*"
            ></v-text-field>
          </v-col>
          <v-col
            cols="6"
            mb="6"
          >
            <v-select
              v-model="accountDataLocale.status"
              dense
              outlined
              label="Status"
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
              v-model="accountDataLocale.access_level_id"
              dense
              outlined
              label="Access Level"
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
              v-model="accountDataLocale.department_id"
              dense
              outlined
              label="Department"
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
                  v-model="accountDataLocale.date_hired"
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
              v-model="accountDataLocale.employment_type"
              dense
              outlined
              label="Employment Type"
              placeholder="Employment Type"
              :prepend-inner-icon="icons.mdiPackage"
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
              v-model="accountDataLocale.designation"
              :prepend-inner-icon="icons.mdiOrigin"
              :error-messages="errors.designation"
              outlined
              dense
              hide-details="auto"
              label="Designation"
              placeholder="Designation"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-btn
              color="primary"
              class="me-3 mt-4"
              @click="submit"
            >
              Save changes
            </v-btn>
            <v-btn
              color="secondary"
              outlined
              class="mt-4"
              type="reset"
              @click.prevent="goBack"
            >
              Back to Users
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import {
  mdiAccessPointCheck,
  mdiAccountOutline,
  mdiAlertOutline, mdiCalendar,
  mdiCloudUploadOutline, mdiEmailOutline, mdiGroup,
  mdiListStatus, mdiOrigin, mdiPackage,
} from '@mdi/js'
import {
  computed,
  onMounted,
  ref,
  toRef,
} from '@vue/composition-api/dist/vue-composition-api'
import store from '@/store'
import UserAccessManagementService from '@/service/UserAccessManagementService'
import router from '@/router'

export default {
  props: {
    accountData: {
      type: Object,
      default: () => {},
    },
    loading: {
      type: Boolean,
      default: true,
    },
  },
  setup(props) {
    const service = new UserAccessManagementService()
    const status = ['Active', 'Inactive', 'Pending', 'Closed']
    const errors = computed(() => store.state.UserAccessManagementStore.errors)
    const accountDataLocale = toRef(props, 'accountData')
    const loadingLocale = toRef(props, 'loading')
    const successInfo = ref(false)

    const dateHired = ref(new Date().toISOString().substr(0, 10))

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

    const computedDateHiredFormatted = computed(() => formatDate(dateHired.value))

    accountDataLocale.value.date_hired = computedDateHiredFormatted

    const accessLevels = ref([])
    const departments = ref([])

    onMounted(async () => {
      await service.getAccessLevels(true)
        .then(response => {
          accessLevels.value = response.data
        })

      await service.getDepartments()
        .then(response => {
          departments.value = response.data
        })
    })

    const previewImage = () => {
      accountDataLocale.value.profile_url = URL.createObjectURL(accountDataLocale.value.new_image)
    }

    const uploadPhoto = () => {
      const formData = new FormData()

      formData.append('file', accountDataLocale.value.new_image)
      formData.append('id', accountDataLocale.value.id)

      store.dispatch('UserAccessManagementStore/uploadProfilePhoto', formData).then(
        response => {
          if (response.status === undefined) {
            accountDataLocale.value.new_image = null
          }
        },
      )
    }

    const submit = () => {
      const formData = {
        id: accountDataLocale.value.id,
        employment_type: accountDataLocale.value.employment_type,
        department_id: accountDataLocale.value.department_id,
        access_level_id: accountDataLocale.value.access_level_id,
        designation: accountDataLocale.value.designation,
        date_hired: accountDataLocale.value.date_hired,
        email: accountDataLocale.value.email,
        status: accountDataLocale.value.status,
      }

      store.dispatch('UserAccessManagementStore/updateUser', formData).then(
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

    const goBack = () => {
      router.push('/users')
    }

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

    return {
      accessLevels,
      accountDataLocale,
      successInfo,
      submit,
      computedDateHiredFormatted,
      dateHired,
      departments,
      employmentTypes,
      errors,
      genders,
      loadingLocale,
      goBack,
      parseDate,
      previewImage,
      uploadPhoto,
      menu1,
      status,
      statusOptions,
      icons: {
        mdiEmailOutline,
        mdiListStatus,
        mdiAccessPointCheck,
        mdiGroup,
        mdiCalendar,
        mdiPackage,
        mdiOrigin,
        mdiAccountOutline,
        mdiAlertOutline,
        mdiCloudUploadOutline,
      },
    }
  },
}
</script>
