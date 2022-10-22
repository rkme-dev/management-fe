<template>
  <v-card
    flat
    class="pa-3 mt-2"
  >
    <v-alert
      v-show="showAlert"
      dense
      text
      type="success"
      dismissible
    >
      Successfully updated
    </v-alert>
    <v-card-text>
      <v-progress-linear
        v-if="loadingLocale || loadingAbilities"
        indeterminate
        color="primary"
      ></v-progress-linear>
      <v-form
        v-if="!loadingLocale && !loadingAbilities"
        class="multi-col-validation mt-6"
      >
        <v-row>
          <v-col
            cols="12"
            md="6"
          >
            <v-select
              v-model="userData.role_id"
              dense
              outlined
              :prepend-inner-icon="icons.mdiHumanEdit"
              item-text="title"
              item-value="id"
              label="Role"
              :items="roleOptions"
            ></v-select>
          </v-col>

          <v-col
            cols="12"
            md="9"
          >
            <v-treeview
              v-model="abilitiesSelected"
              selectable
              hoverable
              selected-color="primary"
              item-disabled="locked"
              item-key="id"
              item-text="name"
              item-children="abilities"
              :items="abilitiesOptions"
            ></v-treeview>
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
              class="mt-3"
              type="reset"
              @click.prevent="goBack"
            >
              Back to Users Page
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
</template>
<script>
import { mdiAlertOutline, mdiCloudUploadOutline, mdiHumanEdit } from '@mdi/js'
import {
  toRef,
  onMounted,
  ref,
  watch,
} from '@vue/composition-api'
import router from '@/router'
import store from '@/store'
import UserAccessManagementService from '@/service/UserAccessManagementService'

export default {
  name: 'UserAbilitiesFormVue',
  props: {
    user: {
      type: Object,
      required: true,
    },
    loading: {
      type: Boolean,
      default: true,
      required: true,
    },
  },
  setup(props) {
    const service = new UserAccessManagementService()
    const userData = toRef(props, 'user')
    const abilitiesOptions = ref([])
    const roleOptions = ref([])
    const abilitiesSelected = ref([])
    const loadingLocale = toRef(props, 'loading')
    const showAlert = ref(false)
    const loadingAbilities = ref(true)
    const roleAbilityIds = ref([])
    const arrayColumn = (array, column) => {
      if (array === undefined || array === null) {
        return []
      }

      return array.map(item => item[column])
    }

    onMounted(async () => {
      if (userData.value.department_id === null) {
        await service.getAbilities(true)
          .then(response => {
            abilitiesOptions.value = response.data
            abilitiesSelected.value = userData.value.abilities.map(ability => ability.id)
            loadingAbilities.value = false
          })

        await service.getRoles()
          .then(response => {
            roleOptions.value = response.data
          })
      } else {
        await service.getDepartmentAbilities(userData.value.department_id)
          .then(response => {
            abilitiesOptions.value = response.data
            abilitiesSelected.value = userData.value.abilities.map(ability => ability.id)
            loadingAbilities.value = false
          })

        await service.getDepartmentRoles(userData.value.department_id)
          .then(response => {
            roleOptions.value = response.data
          })
      }

      // eslint-disable-next-line no-use-before-define
      checkAbilities(userData.value)
    })

    const checkAbilities = value => {
      abilitiesSelected.value = value.abilities.map(ability => ability.id)
      const roleSelected = roleOptions.value.find(role => role.id === value.role_id)
      roleAbilityIds.value = arrayColumn(roleSelected?.abilities, 'id') ?? []

      abilitiesOptions.value.forEach((module, index) => {
        let countOfAbility = 0

        module.abilities.forEach((ability, subIndex) => {
          if (roleAbilityIds.value.includes(ability.id) === false) {
            if (ability?.fromRole !== undefined && ability?.fromRole === true) {
              const findIndex = abilitiesSelected.value.findIndex(id => id === ability.id)

              abilitiesSelected.value.splice(findIndex, 1)
            }

            abilitiesOptions.value[index].abilities[subIndex].locked = false
          } else {
            abilitiesOptions.value[index].abilities[subIndex].fromRole = true
            abilitiesOptions.value[index].abilities[subIndex].locked = true
            abilitiesSelected.value.push(ability.id)
            countOfAbility += 1
          }
        })

        abilitiesOptions.value[index].locked = module.abilities.length === countOfAbility
      })
    }

    watch(userData.value, value => {
      checkAbilities(value)
    })

    // watch(abilitiesSelected, value => {
    //   console.log(value)
    // }, true)

    const goBack = () => {
      router.push('/users')
    }

    const submit = () => {
      store.dispatch('UserAccessManagementStore/updateUser', {
        role_id: userData.value.role_id,
        abilities: abilitiesSelected.value,
        id: userData.value.id,
      }).then(
        response => {
          if (response.status === undefined) {
            abilitiesSelected.value = response.data.abilities.map(ability => ability.id)
            showAlert.value = true
            setTimeout(() => {
              showAlert.value = false
            }, 1500)
          }
        },
      )
    }

    return {
      abilitiesOptions,
      abilitiesSelected,
      loadingAbilities,
      loadingLocale,
      icons: {
        mdiAlertOutline,
        mdiCloudUploadOutline,
        mdiHumanEdit,
      },
      goBack,
      roleOptions,
      showAlert,
      submit,
      userData,
    }
  },
}
</script>

<style scoped>

</style>
