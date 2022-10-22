<template>
  <div class="auth-wrapper auth-v1 login-admin background-layer">
    <div class="auth-inner">
      <v-card class="auth-card">
        <!-- logo -->
        <v-card-title class="d-flex align-center justify-center py-7">
          <router-link to="/" class="d-flex align-center">
            <v-img
              :src="require('@/assets/images/logos/ECO PAPER.svg')"
              max-height="80px"
              max-width="80px"
              alt="logo"
              contain
              class="me-3"
            ></v-img>

            <h3 class="text-2xl font-weight-semibold">Eco Group</h3>
          </router-link>
        </v-card-title>

        <v-card-text>
          <p class="mb-2">Enter your credentials to access your account</p>
        </v-card-text>

        <v-card-text>
          <v-form>
            <v-text-field
              v-model="email"
              outlined
              label="Email"
              placeholder="john@example.com"
              hide-details
              class="mb-3"
            ></v-text-field>

            <v-text-field
              v-model="password"
              outlined
              :type="isPasswordVisible ? 'text' : 'password'"
              label="Password"
              placeholder="············"
              :append-icon="isPasswordVisible ? icons.mdiEyeOffOutline : icons.mdiEyeOutline"
              hide-details
              @click:append="isPasswordVisible = !isPasswordVisible"
            ></v-text-field>

            <div class="d-flex align-center justify-space-between flex-wrap">
              <v-checkbox label="Remember Me" hide-details class="me-3 mt-1"> </v-checkbox>

              <!-- forgot link -->
              <a href="javascript:void(0)" class="mt-1"> Forgot Password? </a>
            </div>

            <v-btn block color="primary" class="mt-6 btn-login" @click="submit"> Login </v-btn>
          </v-form>

          <v-card-text class="d-flex align-center justify-center flex-wrap mt-3">
            <router-link :to="{ name: 'pages-register-admin' }"> Don't have an account? </router-link>
          </v-card-text>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>
<script>
import { mdiFacebook, mdiTwitter, mdiGithub, mdiGoogle, mdiEyeOutline, mdiEyeOffOutline } from '@mdi/js'
import { ref } from '@vue/composition-api'
import store from '@/store'
import router from '@/router'

export default {
  setup() {
    const showError = ref(false)
    const errorMessage = ref('')
    const loading = ref(false)
    const isPasswordVisible = ref(false)
    const email = ref('')
    const password = ref('')
    const socialLink = [
      {
        icon: mdiFacebook,
        color: '#4267b2',
        colorInDark: '#4267b2',
      },
      {
        icon: mdiTwitter,
        color: '#1da1f2',
        colorInDark: '#1da1f2',
      },
      {
        icon: mdiGithub,
        color: '#272727',
        colorInDark: '#fff',
      },
      {
        icon: mdiGoogle,
        color: '#db4437',
        colorInDark: '#db4437',
      },
    ]

    const submit = () => {
      loading.value = true
      store
        .dispatch('AuthStore/login', {
          email: email.value,
          password: password.value,
        })
        .then(response => {
          if (response.status === undefined) {
            router.replace('/dashboard')
          }
        })
        .catch(error => {
          setTimeout(() => {
            showError.value = false
          }, 2500)
          showError.value = true
          errorMessage.value = error.data.message
        })
        .finally(() => {
          loading.value = false
        })
    }

    return {
      isPasswordVisible,
      showError,
      errorMessage,
      loading,
      email,
      password,
      socialLink,
      icons: {
        mdiEyeOutline,
        mdiEyeOffOutline,
      },
      submit,
    }
  },
}
</script>
<style lang="scss">
@import '~@/plugins/vuetify/default-preset/preset/pages/auth.scss';
.auth-wrapper.login-admin {
  &.auth-v1 {
    &.background-layer {
      background: url('https://images.pexels.com/photos/443383/pexels-photo-443383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2');
      &::before {
        content: '';
        background-color: rgba(0, 0, 0, 0.6);
        position: absolute;
        z-index: 1;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
      }
    }
    .auth-inner {
      width: 22rem !important;
      .btn-login {
        height: 48px !important;
      }
      .text-xs {
        .v-label {
          font-size: 0.75rem !important;
        }
      }
    }
  }
}
</style>
