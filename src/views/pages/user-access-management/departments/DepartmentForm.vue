<template>
  <v-form>
    <v-row>
      <v-col
        cols="12"
        md="3"
      >
        <label for="firstnameHorizontalIcons">Department Name</label>
      </v-col>

      <v-col
        cols="12"
        md="9"
      >
        <v-text-field
          id="firstnameHorizontalIcons"
          v-model="departmentData.name"
          hide-details="auto"
          :prepend-inner-icon="icons.mdiAccountOutline"
          outlined
          dense
          :error-messages="errors.name"
          placeholder="Department Name"
        ></v-text-field>
      </v-col>
      <v-col
        cols="12"
        md="3"
      >
        <label for="firstnameHorizontalIcons">Roles</label>
      </v-col>
      <v-col
        cols="12"
        md="9"
      >
        <v-select
          v-model="departmentData.role_ids"
          dense
          outlined
          multiple
          :prepend-inner-icon="icons.mdiHumanEdit"
          item-text="title"
          item-value="id"
          label="Role"
          :items="roleOptions"
          hide-details="auto"
        ></v-select>
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
          hide-details="auto"
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
    department: {
      type: Object,
      required: false,
      default: null,
    },
  },
  setup(props, { emit }) {
    const errors = computed(() => store.state.UserAccessManagementStore.errors)
    const service = new UserAccessManagementService()
    const roleOptions = ref([])
    const departmentData = toRef(props, 'department')
    const abilitiesOptions = ref([])
    const abilitiesSelected = ref([])

    watch(departmentData, value => {
      abilitiesSelected.value = value.abilities.map(ability => ability.id)
      departmentData.value.role_ids = value.roles?.map(role => role.id)
    })

    onMounted(async () => {
      await service.getAbilities(true)
        .then(response => {
          abilitiesOptions.value = response.data
          abilitiesSelected.value = departmentData.value.abilities?.map(ability => ability.id)
        })

      await service.getRoles(true)
        .then(response => {
          roleOptions.value = response.data
          departmentData.value.role_ids = departmentData.value.roles?.map(role => role.id)
        })
    })

    const cancel = () => {
      emit('clicked', false)
    }

    const submit = () => {
      if (departmentData.value.id === undefined) {
        const formData = {
          ability_ids: abilitiesSelected.value,
          name: departmentData.value.name,
          role_ids: departmentData.value.role_ids ?? [],
        }
        store.dispatch('UserAccessManagementStore/createDepartment', formData).then(
          response => {
            if (response.status === undefined) {
              emit('clicked', {
                alertType: 'success',
                alertMessage: 'Successfully Added a department.',
              })
            }
          },
        )
      } else {
        store.dispatch('UserAccessManagementStore/updateDepartment', {
          id: departmentData.value.id,
          ability_ids: abilitiesSelected.value,
          role_ids: departmentData.value.role_ids,
        }).then(
          () => {
            store.dispatch('UserAccessManagementStore/getDepartments')
            emit('clicked', false)
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
      departmentData,
      roleOptions,
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
