<template>
  <v-card
    flat
    class="mt-5"
  >
    <v-form>
      <div class="">
        <v-card-text class="pt-16 mt-lg-16">
          <v-row>
            <v-col
              cols="12"
              sm="8"
              md="6"
            >
              <!-- new password -->
              <v-text-field
                v-model="newPassword"
                :type="isNewPasswordVisible ? 'text' : 'password'"
                :append-icon="isNewPasswordVisible ? icons.mdiEyeOffOutline:icons.mdiEyeOutline"
                label="New Password"
                :error-messages="errors.password"
                outlined
                dense
                hide-details="auto"
                @click:append="isNewPasswordVisible = !isNewPasswordVisible"
              ></v-text-field>

              <!-- confirm password -->
              <v-text-field
                v-model="cPassword"
                :type="isCPasswordVisible ? 'text' : 'password'"
                :append-icon="isCPasswordVisible ? icons.mdiEyeOffOutline:icons.mdiEyeOutline"
                label="Confirm New Password"
                :error-messages="errors.password_confirmation"
                outlined
                dense
                hide-details="auto"
                class="mt-3"
                @click:append="isCPasswordVisible = !isCPasswordVisible"
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              sm="4"
              md="6"
              class="d-none d-sm-flex justify-center position-relative"
            >
              <v-img
                contain
                max-width="170"
                src="@/assets/images/3d-characters/pose-m-1.png"
                class="security-character"
              ></v-img>
            </v-col>
          </v-row>
        </v-card-text>
      </div>

      <!-- divider -->
      <v-divider></v-divider>

      <div class="pa-3">
        <v-card-title class="flex-nowrap">
          <v-icon class="text--primary me-3">
            {{ icons.mdiKeyOutline }}
          </v-icon>
          <span class="text-break">Two-factor authentication</span>
        </v-card-title>

        <v-card-text class="two-factor-auth text-center mx-auto">
          <v-avatar
            color="primary"
            class="primary mb-4"
            rounded
          >
            <v-icon
              size="25"
              color="white"
            >
              {{ icons.mdiLockOpenOutline }}
            </v-icon>
          </v-avatar>
          <p class="text-base text--primary font-weight-semibold">
            Two factor authentication is not enabled yet.
          </p>
          <p class="text-sm text--primary">
            Two-factor authentication adds an additional layer of
            security to your account by requiring more than just a
            password to log in. Learn more.
          </p>
        </v-card-text>

        <!-- action buttons -->
        <v-card-text>
          <v-btn
            color="primary"
            class="me-3 mt-3"
            @click="submit"
          >
            Save changes
          </v-btn>
          <v-btn
            color="secondary"
            outlined
            class="mt-3"
            @click="reset"
          >
            Cancel
          </v-btn>
        </v-card-text>
      </div>
    </v-form>
  </v-card>
</template>

<script>
// eslint-disable-next-line object-curly-newline
import { mdiKeyOutline, mdiLockOpenOutline, mdiEyeOffOutline, mdiEyeOutline } from '@mdi/js'
import { ref } from '@vue/composition-api'
import store from '@/store'
import { computed } from '@vue/composition-api/dist/vue-composition-api'

export default {
  setup(props, context) {
    const isNewPasswordVisible = ref(false)
    const isCPasswordVisible = ref(false)
    const newPassword = ref('')
    const cPassword = ref('')
    const userId = context.root.$route.params.id
    const errors = computed(() => store.state.UserAccessManagementStore.errors)

    const submit = () => {
      const formData = {
        id: userId,
        password: newPassword.value,
        password_confirmation: cPassword.value,
      }

      store.dispatch('UserAccessManagementStore/updatePassword', formData)
        .then(
          response => {
            if (response.status === undefined) {
              newPassword.value = ''
              cPassword.value = ''
            }
          },
        )
    }

    const reset = () => {
      store.dispatch('UserAccessManagementStore/removeErrors')
      newPassword.value = ''
      cPassword.value = ''
    }

    return {
      submit,
      errors,
      reset,
      isNewPasswordVisible,
      isCPasswordVisible,
      newPassword,
      cPassword,
      icons: {
        mdiKeyOutline,
        mdiLockOpenOutline,
        mdiEyeOffOutline,
        mdiEyeOutline,
      },
    }
  },
}
</script>

<style lang="scss" scoped>
.two-factor-auth {
  max-width: 25rem;
}
.security-character {
  position: absolute;
  bottom: -0.5rem;
}
</style>
