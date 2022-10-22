<template>
  <v-card
    flat
    class="pa-3 mt-2"
  >
    <v-alert
      dense
      text
      v-show="showAlert"
      type="success"
      dismissible
    >
      Successfully updated
    </v-alert>
    <v-card-text>
      <v-dialog
        v-model="resetPassword.show"
        max-width="800px"
      >
        <v-card>
          <v-card-title>
            <span class="headline">Change Password</span>
          </v-card-title>
          <v-card-text>
            <ResetPasswordForm
              :user-data="accountDataLocale"
              @clicked="alert"
            ></ResetPasswordForm>
          </v-card-text>
        </v-card>
      </v-dialog>
      <v-progress-linear
        v-show="loadingLocale"
        indeterminate
        color="primary"
      ></v-progress-linear>
      <v-form
        v-if="!loadingLocale"
        class="multi-col-validation mt-6"
      >
        <v-row>
          <v-col
            md="6"
            cols="12"
          >
            <v-text-field
              v-model="accountDataLocale.email"
              label="Email"
              :error-messages="errors.email"
              dense
              outlined
            ></v-text-field>
          </v-col>

          <v-col
            md="6"
            cols="12"
          >
            <v-text-field
              v-model="accountDataLocale.name"
              label="Name"
              :error-messages="errors.name"
              dense
              outlined
            ></v-text-field>
          </v-col>

          <v-col
            cols="12"
            md="6"
          >
            <v-select
              v-model="accountDataLocale.status"
              dense
              outlined
              label="Status"
              :error-messages="errors.status"
              :items="status"
            ></v-select>
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
              color="info"
              outlined
              class="me-3 mt-3"
              type="reset"
              @click.prevent="goBack"
            >
              Back to Users Page
            </v-btn>
            <v-btn
              color="warning"
              outlined
              class="mt-3"
              type="reset"
              @click.prevent="toggleResetPassword"
            >
              Reset Password
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import { mdiAlertOutline, mdiCloudUploadOutline } from '@mdi/js'
import { computed, ref, toRef } from '@vue/composition-api'
import router from '@/router'
import store from '@/store'
import ResetPasswordForm from '@/views/pages/user-access-management/users/ResetPasswordForm.vue'

export default {
  components: {
    ResetPasswordForm,
  },
  props: {
    accountData: {
      type: Object,
      default: null,
    },
    loading: {
      type: Boolean,
      default: true,
      required: true,
    },
  },
  setup(props) {
    const errors = computed(() => store.state.UserAccessManagementStore.errors)
    const status = ['Active', 'Inactive', 'Pending', 'Deleted', 'Deactivated']
    const accountDataLocale = toRef(props, 'accountData')
    const loadingLocale = toRef(props, 'loading')
    const showAlert = ref(false)
    const resetPassword = ref({
      show: false,
    })

    accountDataLocale.value.avatarImg = require('@/assets/images/avatars/1.png')

    const goBack = () => {
      router.push('/users')
    }

    const toggleResetPassword = () => {
      resetPassword.value.show = true
    }

    const alert = (value) => {
      resetPassword.value.show = false

      if (value !== false) {
        showAlert.value = true
        setTimeout(() => {
          showAlert.value = false
        }, 1500)
      }
    }

    const submit = () => {
      store.dispatch('UserAccessManagementStore/updateUser', {
        name: accountDataLocale.value.name,
        email: accountDataLocale.value.email,
        status: accountDataLocale.value.status,
        id: accountDataLocale.value.id,
      }).then(
        response => {
          if (response.status === undefined) {
            alert()
          }
        },
      )
    }

    return {
      alert,
      errors,
      loadingLocale,
      goBack,
      status,
      accountDataLocale,
      icons: {
        mdiAlertOutline,
        mdiCloudUploadOutline,
      },
      resetPassword,
      showAlert,
      submit,
      toggleResetPassword,
    }
  },
}
</script>
