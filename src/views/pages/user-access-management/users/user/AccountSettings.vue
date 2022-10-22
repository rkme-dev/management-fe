<template>
  <v-card id="account-setting-card">
    <!-- tabs -->
    <v-tabs
      v-model="tab"
      show-arrows
    >
      <v-tab
        v-for="tab in tabs"
        :key="tab.icon"
      >
        <v-icon
          size="20"
          class="me-3"
        >
          {{ tab.icon }}
        </v-icon>
        <span>{{ tab.title }}</span>
      </v-tab>
    </v-tabs>

    <!-- tabs item -->
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <account-settings-account
          :account-data="userData"
          :loading="loading"
        ></account-settings-account>
      </v-tab-item>

      <v-tab-item>
        <user-abilities-form
          :user="userData"
          :loading="loading"
        ></user-abilities-form>
      </v-tab-item>
      <v-tab-item>
        <account-settings-security></account-settings-security>
      </v-tab-item>

      <v-tab-item>
        <account-settings-info :information-data="userData"></account-settings-info>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import {
  mdiAccountOutline,
  mdiLockOpenOutline,
  mdiInformationOutline,
  mdiTwoFactorAuthentication,
} from '@mdi/js'
import { ref, onMounted } from '@vue/composition-api'
import UserAccessManagementService from '@/service/UserAccessManagementService'
import UserAbilitiesForm from '@/views/pages/user-access-management/users/UserAbilitiesForm.vue'
import router from '@/router'
import AccountSettingsAccount from './AccountSettingsAccount.vue'
import AccountSettingsSecurity from './AccountSettingsSecurity.vue'
import AccountSettingsInfo from './AccountSettingsInfo.vue'

export default {
  components: {
    AccountSettingsAccount,
    AccountSettingsSecurity,
    AccountSettingsInfo,
    UserAbilitiesForm,
  },
  setup(props, context) {
    const tab = ref('')

    const tabs = [
      { title: 'Account', icon: mdiAccountOutline },
      { title: 'Roles and Access', icon: mdiLockOpenOutline },
      { title: 'Security', icon: mdiTwoFactorAuthentication },
      { title: 'Info', icon: mdiInformationOutline },
    ]

    const service = new UserAccessManagementService()
    const userId = context.root.$route.params.id
    const userData = ref({})
    const loading = ref(true)

    onMounted(async () => {
      await service.getUser(userId)
        .then(response => {
          if (response.status === 404) {
            router.push('/users')
          }
          userData.value = response.data
          loading.value = false
        })
    })

    // account settings data
    const accountSettingData = {
      information: {
        bio: 'The name’s John Deo. I am a tireless seeker of knowledge, occasional purveyor of wisdom and also, coincidentally, a graphic designer. Algolia helps businesses across industries quickly create relevant 😎, scaLabel 😀, and lightning 😍 fast search and discovery experiences.',
        birthday: 'February 22, 1995',
        phone: '954-006-0844',
        website: 'https://themeselection.com/',
        country: 'USA',
        languages: ['English', 'Spanish'],
        gender: 'male',
      },
    }

    return {
      userData,
      loading,
      tab,
      tabs,
      accountSettingData,
      icons: {
        mdiAccountOutline,
        mdiLockOpenOutline,
        mdiInformationOutline,
        mdiTwoFactorAuthentication,
      },
    }
  },
}
</script>
