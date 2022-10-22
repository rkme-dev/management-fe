import UserAccessManagementService from '@/service/UserAccessManagementService'

const userAccessManagementService = new UserAccessManagementService()
// eslint-disable-next-line import/prefer-default-export
export const UserAccessManagementStore = {
  namespaced: true,
  state: {
    loading: false,
    abilities: [],
    accessLevels: [],
    roles: [],
    modules: [],
    users: [],
    errors: [],
    user: {},
    departments: [],
    department: {},
  },
  actions: {
    // eslint-disable-next-line no-shadow
    createAbility({ commit }, ability) {
      commit('setLoading', true)

      return userAccessManagementService.createAbility(ability)
        .then(
          // eslint-disable-next-line no-shadow
          ability => {
            commit('addAbilitySuccess', ability.data)
            commit('setErrors', {})
            return Promise.resolve(ability)
          },
          error => Promise.reject(error),
        )
        .finally(() => {
          commit('setLoading', false)
        })
    },
    // eslint-disable-next-line no-shadow
    createAccessLevel({ commit }, accessLevel) {
      commit('setLoading', true)

      return userAccessManagementService.createAccessLevel(accessLevel)
        .then(
          // eslint-disable-next-line no-shadow
          accessLevel => {
            commit('addAccessLevelSuccess', accessLevel.data)
            commit('setErrors', {})
            return Promise.resolve(accessLevel)
          },
          error => Promise.reject(error),
        )
        .finally(() => {
          commit('setLoading', false)
        })
    },
    createDepartment({ commit }, department) {
      commit('setLoading', true)

      return userAccessManagementService.createDepartment(department)
        .then(
          // eslint-disable-next-line no-shadow
          department => {
            if (department.status === undefined) {
              commit('addDepartmentSuccess', department.data)
              commit('setErrors', {})
            } else {
              commit('setErrors', department.data)
            }

            return Promise.resolve(department)
          },
          error => Promise.reject(error),
        )
        .finally(() => {
          commit('setLoading', false)
        })
    },
    removeErrors({ commit }) {
      commit('setErrors', {})
    },
    // eslint-disable-next-line no-shadow
    createUser({ commit }, user) {
      commit('setLoading', true)

      return userAccessManagementService.createUser(user)
        .then(
          // eslint-disable-next-line no-shadow,consistent-return
          user => {
            if (user.status === undefined) {
              commit('setErrors', {})
              commit('addUserSuccess', user.data)
            } else {
              commit('setErrors', user.data)
            }

            return Promise.resolve(user)
          },
          error => {
            Promise.reject(error)
          },
        )
        .finally(() => {
          commit('setLoading', false)
        })
    },
    createRole({ commit }, role) {
      commit('setLoading', true)

      return userAccessManagementService.createRole(role)
        .then(
          // eslint-disable-next-line no-shadow,consistent-return
          role => {
            if (role.status === undefined) {
              commit('addRoleSuccess', role.data)
              commit('setErrors', {})
            } else {
              commit('setErrors', role.data)
            }

            return Promise.resolve(role)
          },
          error => {
            Promise.reject(error)
          },
        )
        .finally(() => {
          commit('setLoading', false)
        })
    },
    // eslint-disable-next-line no-unused-vars
    deleteAbility({ commit }, ability) {
      commit('setLoading', true)

      return userAccessManagementService.deleteAbility(ability)
        .then()
        .finally(() => {
          commit('setLoading', false)
        })
    },
    // eslint-disable-next-line no-unused-vars
    deleteAccessLevel({ commit }, accessLevel) {
      commit('setLoading', true)

      return userAccessManagementService.deleteAccessLevel(accessLevel)
        .then()
        .finally(() => {
          commit('setLoading', false)
        })
    },
    // eslint-disable-next-line no-unused-vars
    deleteDepartment({ commit }, department) {
      commit('setLoading', true)

      return userAccessManagementService.deleteDepartment(department)
        .then()
        .finally(() => {
          commit('setLoading', false)
        })
    },
    // eslint-disable-next-line no-unused-vars
    deleteRole({ commit }, role) {
      commit('setLoading', true)

      return userAccessManagementService.deleteRole(role)
        .then()
        .finally(() => {
          commit('setLoading', false)
        })
    },
    getAbilities({ commit }) {
      commit('setLoading', true)

      return userAccessManagementService.getAbilities(false).then(
        abilities => {
          commit('fetchAbilitiesSuccess', abilities.data)
          commit('setLoading', false)

          return Promise.resolve(abilities)
        },
        error => Promise.reject(error),
      )
    },
    getAccessLevels({ commit }) {
      commit('setLoading', true)

      return userAccessManagementService.getAccessLevels().then(
        accessLevels => {
          commit('fetchAccessLevelsSuccess', accessLevels.data)
          commit('setLoading', false)

          return Promise.resolve(accessLevels)
        },
        error => Promise.reject(error),
      )
    },
    getDepartments({ commit }) {
      commit('setLoading', true)

      return userAccessManagementService.getDepartments().then(
        departments => {
          commit('fetchDepartmentsSuccess', departments.data)
          commit('setLoading', false)

          return Promise.resolve(departments)
        },
        error => Promise.reject(error),
      )
    },
    getRoles({ commit }) {
      commit('setLoading', true)

      return userAccessManagementService.getRoles().then(
        roles => {
          commit('fetchRolesSuccess', roles.data)
          commit('setLoading', false)

          return Promise.resolve(roles)
        },
        error => Promise.reject(error),
      )
    },
    getUsers({ commit }) {
      commit('setLoading', true)

      return userAccessManagementService.getUsers().then(
        users => {
          commit('fetchUsersSuccess', users.data)
          commit('setLoading', false)

          return Promise.resolve(users)
        },
        error => Promise.reject(error),
      )
    },
    getUser({ commit }, userId) {
      commit('setLoading', true)

      return userAccessManagementService.getUser(userId).then(
        user => {
          commit('fetchUserSuccess', user.data)
          commit('setLoading', false)

          return Promise.resolve(user)
        },
        error => Promise.reject(error),
      )
    },
    logout({ commit }) {
      return userAccessManagementService.logout().then(
        () => {
          commit('loggedOut')
        },
      )
    },
    updateAbility({ commit }, ability) {
      commit('setLoading', true)

      return userAccessManagementService.updateAbility(ability)
        .then(
          // eslint-disable-next-line no-shadow
          ability => {
            commit('updateAbilitySuccess', ability.data)
            commit('setLoading', false)

            return Promise.resolve(ability)
          },
          error => Promise.reject(error),
        )
    },
    updateAccessLevel({ commit }, accessLevel) {
      commit('setLoading', true)

      return userAccessManagementService.updateAccessLevel(accessLevel)
        .then(
          // eslint-disable-next-line no-shadow
          accessLevel => {
            commit('updateAccessLevelSuccess', accessLevel.data)
            commit('setLoading', false)

            return Promise.resolve(accessLevel)
          },
          error => Promise.reject(error),
        )
    },
    updateDepartment({ commit }, department) {
      commit('setLoading', true)

      return userAccessManagementService.updateDepartment(department)
        .then(
          // eslint-disable-next-line no-shadow
          ability => {
            commit('updateDepartmentSuccess', ability.data)
            commit('setLoading', false)

            return Promise.resolve(ability)
          },
          error => Promise.reject(error),
        )
    },
    updatePassword({ commit }, user) {
      commit('setLoading', true)

      return userAccessManagementService.updatePassword(user)
        .then(
          // eslint-disable-next-line no-shadow,consistent-return
          user => {
            if (user.status === undefined) {
              commit('setErrors', {})
            } else {
              commit('setErrors', user.data)
            }

            return Promise.resolve(user)
          },
          error => {
            Promise.reject(error)
          },
        )
        .finally(() => {
          commit('setLoading', false)
        })
    },
    uploadProfilePhoto({ commit }, user) {
      commit('setLoading', true)

      return userAccessManagementService.uploadProfilePhoto(user)
        .then(
          // eslint-disable-next-line no-shadow,consistent-return
          user => {
            if (user.status === undefined) {
              commit('updateUserSuccess', user.data)
              commit('setErrors', {})
            } else {
              commit('setErrors', user.data)
            }

            return Promise.resolve(user)
          },
          error => {
            Promise.reject(error)
          },
        )
        .finally(() => {
          commit('setLoading', false)
        })
    },
    updateRole({ commit }, role) {
      commit('setLoading', true)

      return userAccessManagementService.updateRole(role)
        .then(
          // eslint-disable-next-line no-shadow,consistent-return
          role => {
            if (role.status === undefined) {
              commit('updateRoleSuccess', role.data)
              commit('setErrors', {})
            } else {
              commit('setErrors', role.data)
            }

            return Promise.resolve(role)
          },
          error => {
            Promise.reject(error)
          },
        )
        .finally(() => {
          commit('setLoading', false)
        })
    },
    updateUser({ commit }, user) {
      commit('setLoading', true)

      return userAccessManagementService.updateUser(user)
        .then(
          // eslint-disable-next-line no-shadow
          user => {
            if (user.status >= 400) {
              commit('setErrors', user.data)
            } else {
              commit('updateUserSuccess', user.data)
            }

            commit('setLoading', false)

            return Promise.resolve(user)
          },
          error => Promise.reject(error),
        )
    },
  },
  mutations: {
    // eslint-disable-next-line no-shadow
    addAbilitySuccess(state, ability) {
      state.abilities.push(ability)
    },
    addAccessLevelSuccess(state, accessLevel) {
      state.accessLevels.push(accessLevel)
    },
    addDepartmentSuccess(state, department) {
      state.departments.push(department)
    },
    addUserSuccess(state, user) {
      state.users.push(user)
    },
    addRoleSuccess(state, role) {
      state.roles.push(role)
    },
    loggedOut() {
      localStorage.removeItem('user')
    },
    updateAbilitySuccess(state, ability) {
      const index = state.abilities.findIndex(value => value.id === ability.id)
      state.abilities[index] = ability
    },
    updateAccessLevelSuccess(state, accessLevel) {
      const index = state.accessLevels.findIndex(value => value.id === accessLevel.id)
      state.accessLevels[index] = accessLevel
    },
    updateDepartmentSuccess(state, department) {
      const index = state.departments.findIndex(value => value.id === department.id)
      state.departments[index] = department
    },
    updateRoleSuccess(state, role) {
      const index = state.roles.findIndex(value => value.id === role.id)
      state.roles[index] = role
    },
    updateUserSuccess(state, user) {
      const index = state.users.findIndex(value => value.id === user.id)
      state.users[index] = user
    },
    fetchAbilitiesSuccess(state, abilities) {
      state.loading = false
      state.abilities = abilities
    },
    fetchAccessLevelsSuccess(state, accessLevels) {
      state.loading = false
      state.accessLevels = accessLevels
    },
    fetchDepartmentsSuccess(state, departments) {
      state.loading = false
      state.departments = departments
    },
    fetchRolesSuccess(state, roles) {
      state.loading = false
      state.roles = roles
    },
    fetchUsersSuccess(state, users) {
      state.users = users.map(user => {
        // eslint-disable-next-line no-param-reassign
        user.status = user.status.charAt(0).toUpperCase() + user.status.slice(1)

        return user
      })
    },
    fetchUserSuccess(state, user) {
      state.user = user
    },
    setErrors(state, errors) {
      state.errors = errors
    },
    setLoading(state, loading) {
      state.loading = loading
    },
  },
}
