<template>
  <v-form>
    <v-row>
      <v-col
        cols="12"
        md="3"
      >
        <label for="firstnameHorizontalIcons">Role Name</label>
      </v-col>

      <v-col
        cols="12"
        md="9"
      >
        <v-text-field
          id="firstnameHorizontalIcons"
          v-model="roleData.title"
          :prepend-inner-icon="icons.mdiAccountOutline"
          outlined
          dense
          :error-messages="errors.name"
          placeholder="Role Name"
          hide-details="auto"
        ></v-text-field>
      </v-col>
      <v-col
        cols="12"
        md="3"
      >
        <label for="firstnameHorizontalIcons">Abilities</label>
      </v-col>

      <v-col
        cols="12"
        md="9"
      >
        <v-treeview
          v-model="abilitiesSelected"
          selectable
          selected-color="primary"
          item-disabled="locked"
          item-key="id"
          item-text="name"
          item-children="abilities"
          :items="abilitiesOptions"
        ></v-treeview>
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
  watch,
  onMounted,
  ref,
  toRef, computed,
} from '@vue/composition-api/dist/vue-composition-api'
import {
  mdiAccountOutline,
  mdiCellphone,
  mdiEmailOutline,
  mdiLockOutline,
} from '@mdi/js'
import UserAccessManagementService from '@/service/UserAccessManagementService'
import store from '@/store'

export default {
  props: {
    role: {
      type: Object,
      required: false,
      default: null,
    },
  },
  setup(props, { emit }) {
    const service = new UserAccessManagementService()
    const roleData = toRef(props, 'role')
    const abilitiesOptions = ref([])
    const abilitiesSelected = ref([])
    const errors = computed(() => store.state.UserAccessManagementStore.errors)

    watch(roleData, value => {
      abilitiesSelected.value = value.abilities.map(ability => ability.id)
    })

    onMounted(async () => {
      await service.getAbilities(true)
        .then(response => {
          abilitiesOptions.value = response.data
          abilitiesSelected.value = roleData.value.abilities.map(ability => ability.id)
        })
    })

    const cancel = () => {
      emit('clicked', false)
    }

    const submit = () => {
      if (roleData.value.id === undefined) {
        store.dispatch('UserAccessManagementStore/createRole', {
          name: roleData.value.title,
          abilities: abilitiesSelected.value,
        }).then(
          response => {
            if (response.status === undefined) {
              emit('clicked', {
                alertType: 'success',
                alertMessage: 'Successfully Added a role.',
              })
              store.dispatch('UserAccessManagementStore/getRoles')
            }
          },
        )
      } else {
        store.dispatch('UserAccessManagementStore/updateRole', {
          id: roleData.value.id,
          abilities: abilitiesSelected.value,
          name: roleData.value.title,
        }).then(
          response => {
            if (response.status ===undefined) {
              store.dispatch('UserAccessManagementStore/getRoles')
              emit('clicked', false)
            }
          },
        )
      }
    }

    return {
      abilitiesSelected,
      abilitiesOptions,
      cancel,
      errors,
      icons: {
        mdiAccountOutline,
        mdiEmailOutline,
        mdiCellphone,
        mdiLockOutline,
      },
      roleData,
      submit,
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
