<template>
  <v-form>
    <v-row>
      <v-col
        cols="12"
        md="3"
      >
        <label for="passwordHorizontalIcons">Password</label>
      </v-col>

      <v-col
        cols="12"
        md="9"
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
        cols="12"
        md="3"
      >
        <label for="passwordHorizontalIcons">Password Confirmation</label>
      </v-col>

      <v-col
        cols="12"
        md="9"
      >
        <v-text-field
          id="passwordHorizontalIcons"
          v-model="user.password_confirmation"
          :prepend-inner-icon="icons.mdiLockOutline"
          :error-messages="errors.password_confirmation"
          outlined
          dense
          placeholder="Password Confirmation"
          hide-details="auto"
          :append-icon="value ? icons.mdiEye : icons.mdiEyeOff"
          :type="value ? 'password' : 'text'"
          @click:append="() => (value = !value)"
        ></v-text-field>
      </v-col>
      <v-col
        offset-md="3"
        cols="12"
      >
        <v-btn
          color="primary"
          @click="submit"
        >
          Submit
        </v-btn>
        <v-btn
          type="reset"
          outlined
          class="mx-2"
          @click="cancel"
        >
          Cancel
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import { computed, toRef } from '@vue/composition-api/dist/vue-composition-api'
import store from '@/store'
import UserAccessManagementService from '@/service/UserAccessManagementService'
import {
  mdiAccountOutline,
  mdiCellphone,
  mdiEmailOutline, mdiEye, mdiEyeOff, mdiHumanEdit, mdiListStatus,
  mdiLockOutline,
} from '@mdi/js'

export default {
  name: 'ResetPasswordForm',
  props: {
    userData: {
      type: Object,
      required: false,
      default: null,
    },
  },
  data: () => ({
    value: String,
  }),
  setup(props, { emit }) {
    const errors = computed(() => store.state.UserAccessManagementStore.errors)
    const service = new UserAccessManagementService()
    const user = toRef(props, 'userData')
    user.value.password = ''
    user.value.password_confirmation = ''

    const cancel = () => {
      emit('clicked', false)
    }

    const submit = () => {
      const formData = {
        id: user.value.id,
        password: user.value.password,
        password_confirmation: user.value.password_confirmation,
      }

      store.dispatch('UserAccessManagementStore/updatePassword', formData).then(
        response => {
          if (response.status === undefined) {
            user.value.password = ''
            user.value.password_confirmation = ''

            emit('clicked', {
              alertType: 'success',
              alertMessage: 'Successfully updated the password.',
            })
          }
        },
      )
    }

    return {
      cancel,
      errors,
      icons: {
        mdiAccountOutline,
        mdiEmailOutline,
        mdiCellphone,
        mdiLockOutline,
        mdiListStatus,
        mdiHumanEdit,
        mdiEye,
        mdiEyeOff,
      },
      service,
      submit,
      user,
    }
  },
}
</script>

<style scoped>

</style>
