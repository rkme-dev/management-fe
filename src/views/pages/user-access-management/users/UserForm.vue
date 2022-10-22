<template>
  <v-form class="pa-3">
    <v-row>
      <v-col
        cols="12"
        md="3"
      >
        <label for="mobileHorizontalIcons">Role</label>
      </v-col>

      <v-col
        cols="12"
        md="9"
      >
        <v-select
          v-model="user.role_id"
          outlined
          dense
          item-text="title"
          item-value="id"
          hide-details="auto"
          :prepend-inner-icon="icons.mdiHumanEdit"
          :error-messages="errors.role_id"
          placeholder="Role"
          :items="roleOptions"
        ></v-select>
      </v-col>

      <v-col
        cols="12"
        md="3"
      >
        <label for="firstnameHorizontalIcons">Name</label>
      </v-col>

      <v-col
        cols="12"
        md="9"
      >
        <v-text-field
          id="firstnameHorizontalIcons"
          v-model="user.name"
          :prepend-inner-icon="icons.mdiAccountOutline"
          :error-messages="errors.name"
          outlined
          dense
          hide-details="auto"
          placeholder="Name"
        ></v-text-field>
      </v-col>

      <v-col
        cols="12"
        md="3"
      >
        <label for="emailHorizontalIcons">Email</label>
      </v-col>

      <v-col
        cols="12"
        md="9"
      >
        <v-text-field
          id="emailHorizontalIcons"
          v-model="user.email"
          :error-messages="errors.email"
          :prepend-inner-icon="icons.mdiEmailOutline"
          outlined
          dense
          placeholder="Email"
          hide-details="auto"
        ></v-text-field>
      </v-col>

      <v-col
        cols="12"
        md="3"
      >
        <label for="mobileHorizontalIcons">Status</label>
      </v-col>

      <v-col
        cols="12"
        md="9"
      >
        <v-select
          v-model="user.status"
          outlined
          dense
          item-text="title"
          item-value="id"
          hide-details="auto"
          :error-messages="errors.status"
          :prepend-inner-icon="icons.mdiListStatus"
          placeholder="Status"
          :items="statusOptions"
        ></v-select>
      </v-col>

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
import {
  computed,
  onMounted,
  ref,
} from '@vue/composition-api/dist/vue-composition-api'
import {
  mdiAccountOutline,
  mdiCellphone,
  mdiEmailOutline,
  mdiLockOutline,
  mdiListStatus,
  mdiHumanEdit,
  mdiEye,
  mdiEyeOff,
} from '@mdi/js'
import UserAccessManagementService from '@/service/UserAccessManagementService'
import store from '@/store'

export default {
  data: () => ({
    value: String,
  }),
  setup(props, { emit }) {
    const service = new UserAccessManagementService()
    const errors = computed(() => store.state.UserAccessManagementStore.errors)
    const user = ref({
      name: '',
      email: '',
      status: '',
      role: '',
      password: '',
      password_confirmation: '',
    })

    const statusOptions = [
      'Active',
      'Pending',
      'Deleted',
      'Deactivated',
      'Inactive',
    ]

    const abilitiesOptions = ref([])
    const roleOptions = ref([])
    const abilitiesSelected = ref([])

    onMounted(async () => {
      await service.getAbilities(true)
        .then(response => {
          abilitiesOptions.value = response.data
        })

      await service.getRoles(true)
        .then(response => {
          roleOptions.value = response.data
        })
    })

    const cancel = () => {
      emit('clicked', false)
    }

    const submit = () => {
      store.dispatch('UserAccessManagementStore/createUser', user.value).then(
        response => {
          if (response.status === undefined) {
            emit('clicked', {
              alertType: 'success',
              alertMessage: 'Successfully Added a user.',
            })
          }
        },
      )
    }

    return {
      abilitiesSelected,
      abilitiesOptions,
      errors,
      cancel,
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
