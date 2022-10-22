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
        <user-info
          :account-data="userData"
          :loading="loading"
        ></user-info>
      </v-tab-item>
      <v-tab-item>
        <user-abilities-form
          :user="userData"
          :loading="loading"
        ></user-abilities-form>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import { mdiAccountOutline, mdiLockOpenOutline, mdiInformationOutline } from '@mdi/js'
import UserInfo from '@/views/pages/user-access-management/users/UserInfo.vue'
import { ref, onMounted } from '@vue/composition-api/dist/vue-composition-api'
import UserAccessManagementService from '@/service/UserAccessManagementService'
import UserAbilitiesForm from '@/views/pages/user-access-management/users/UserAbilitiesForm.vue'

export default {
  components: {
    UserInfo,
    UserAbilitiesForm,
  },
  setup(props, context) {
    const service = new UserAccessManagementService()
    const tab = ref('')
    const userId = context.root.$route.params.id
    const userData = ref({})
    const tabs = [
      { title: 'Information', icon: mdiAccountOutline },
      { title: 'Roles and Access', icon: mdiLockOpenOutline },
    ]
    const loading = ref(true)

    onMounted(async () => {
      await service.getUser(userId)
        .then(response => {
          userData.value = response.data
          loading.value = false
        })
    })

    return {
      tab,
      tabs,
      userId,
      loading,
      icons: {
        mdiAccountOutline,
        mdiLockOpenOutline,
        mdiInformationOutline,
      },
      userData,
    }
  },
}
</script>
