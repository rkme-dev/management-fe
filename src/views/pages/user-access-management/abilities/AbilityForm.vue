<template>
  <v-form>
    <v-row>
      <v-col
        v-if="title"
        cols="12"
        md="3"
      >
        <label for="firstnameHorizontalIcons">Title</label>
      </v-col>
      <v-col
        v-if="title"
        cols="12"
        md="9"
      >
        <v-text-field
          id="firstnameHorizontalIcons"
          v-model="title"
          disabled
          :prepend-inner-icon="icons.mdiCarKey"
          outlined
          dense
          placeholder="Ability Name"
          hide-details
        ></v-text-field>
      </v-col>
      <v-col
        cols="12"
        md="3"
      >
        <label for="firstnameHorizontalIcons">Ability Name</label>
      </v-col>
      <v-col
        cols="12"
        md="9"
      >
        <v-text-field
          id="firstnameHorizontalIcons"
          v-model="action"
          disabled
          :prepend-inner-icon="icons.mdiCarKey"
          outlined
          dense
          placeholder="Ability Name"
          hide-details
        ></v-text-field>
      </v-col>
      <v-col
        cols="12"
        md="3"
      >
        <label for="firstnameHorizontalIcons">Module Name</label>
      </v-col>
      <v-col
        cols="12"
        md="9"
      >
        <v-select
          v-model="module"
          disabled
          outlined
          dense
          hide-details
          :prepend-inner-icon="icons.mdiViewModule"
          placeholder="Module Name"
          :items="modules"
        ></v-select>
      </v-col>

      <v-col
        offset-md="3"
        cols="12"
      >
        <v-btn
          disabled
          color="primary"
          @click="submit"
        >
          Submit
        </v-btn>
        <v-btn
          type="cancel"
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
import { onMounted, ref, toRef } from '@vue/composition-api/dist/vue-composition-api'
import {
  mdiAccountOutline,
  mdiCarKey,
  mdiCellphone,
  mdiEmailOutline,
  mdiLockOutline,
  mdiViewModule,
} from '@mdi/js'
import UserAccessManagementService from '@/service/UserAccessManagementService'
import store from '@/store'

export default {
  props: {
    idProp: {
      type: Number,
      required: false,
      default: 0,
    },
    actionProp: {
      type: String,
      required: false,
      default: '',
    },
    moduleProp: {
      type: String,
      required: false,
      default: '',
    },
    isDisabledProp: {
      type: Boolean,
      required: false,
      default: false,
    },
    titleProp: {
      type: String,
      required: false,
      default: '',
    },
  },
  setup(props, { emit }) {
    const id = toRef(props, 'idProp')
    const action = toRef(props, 'actionProp')
    const title = toRef(props, 'titleProp')
    const module = toRef(props, 'moduleProp')
    const isDisabled = toRef(props, 'isDisabledProp')
    const modules = ref([])
    const service = new UserAccessManagementService()

    onMounted(async () => {
      await service.getModules()
        .then(response => {
          modules.value = response.data.map(value => value.charAt(0).toUpperCase() + value.slice(1))
        })
    })

    const submit = () => {
      if (id.value === 0) {
        store.dispatch('UserAccessManagementStore/createAbility', {
          action: action.value,
          module: module.value,
        }).then(
          () => {
            emit('closeForm', false)
          },
        )
      } else {
        store.dispatch('UserAccessManagementStore/updateAbility', {
          action: action.value,
          module: module.value,
          id: id.value,
        }).then(
          () => {
            store.dispatch('UserAccessManagementStore/getAbilities')
            emit('closeForm', false)
          },
        )
      }
    }

    const cancel = () => {
      emit('closeForm', false)
    }

    return {
      action,
      cancel,
      icons: {
        mdiAccountOutline,
        mdiCarKey,
        mdiEmailOutline,
        mdiCellphone,
        mdiLockOutline,
        mdiViewModule,
      },
      isDisabled,
      module,
      modules,
      submit,
      title,
    }
  },
}
</script>

<style scoped>

</style>
