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
          <p class="mb-2">Fill up the following fields</p>
        </v-card-text>

        <v-card-text>
          <v-form>
            <v-text-field
              v-model="username"
              outlined
              label="Username"
              placeholder="JohnDoe"
              hide-details
              class="mb-3"
            ></v-text-field>

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

            <v-checkbox hide-details class="mt-1">
              <template #label>
                <div class="d-flex align-center flex-wrap">
                  <span class="me-2">I agree to</span><a href="javascript:void(0)">privacy policy &amp; terms</a>
                </div>
              </template>
            </v-checkbox>

            <v-btn block color="primary" class="mt-6 btn-login"> Sign Up </v-btn>
          </v-form>

          <v-card-text class="d-flex align-center justify-center flex-wrap mt-3">
            <router-link :to="{ name: 'pages-login-admin' }"> Already have an account?? </router-link>
          </v-card-text>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>
<script>
// eslint-disable-next-line object-curly-newline
import { mdiFacebook, mdiTwitter, mdiGithub, mdiGoogle, mdiEyeOutline, mdiEyeOffOutline } from '@mdi/js'
import { ref } from '@vue/composition-api'

export default {
  setup() {
    const isPasswordVisible = ref(false)
    const username = ref('')
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

    return {
      isPasswordVisible,
      username,
      email,
      password,
      socialLink,

      icons: {
        mdiEyeOutline,
        mdiEyeOffOutline,
      },
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
