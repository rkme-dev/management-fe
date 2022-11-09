import AccountService from '@/service/AccountService'

const accountService = new AccountService()
// eslint-disable-next-line import/prefer-default-export
export const AccountStore = {
  namespaced: true,
  state: {
    loading: false,
    errors: [],
    accounts: [],
    account: {},
    originalData: [],
  },
  actions: {
    setLoading({ commit }, state) {
      commit('setLoading', state)
    },
    // eslint-disable-next-line no-shadow
    create({ commit, dispatch }, account) {
      dispatch('setLoading', true)

      return accountService.create(account)
        .then(
          // eslint-disable-next-line no-shadow
          account => {
            if (account.data.id) {
              commit('addAccount', account.data)
              commit('setErrors', {})
            } else {
              commit('setErrors', account.data)
            }

            return Promise.resolve(account)
          },
          error => Promise.reject(error),
        )
        .finally(() => {
          dispatch('setLoading', false)
        })
    },
    removeErrors({ commit }) {
      commit('setErrors', {})
    },
    deleteAccount({ commit, dispatch }, account) {
      dispatch('setLoading', true)

      return accountService.delete(account)
        .then(
          // eslint-disable-next-line no-shadow
          () => {
            commit('updateAccountSuccess', account)
            dispatch('setLoading', false)

            return Promise.resolve(account)
          },
          error => Promise.reject(error),
        )
        .finally(() => {
          dispatch('setLoading', false)
        })
    },
    list({ commit, dispatch }) {
      dispatch('setLoading', true)

      commit('fetchAccountsSuccess', [])

      return accountService.list().then(
        accounts => {
          dispatch('setLoading', false)

          commit('fetchAccountsSuccess', accounts.data)

          return Promise.resolve(accounts)
        },
        error => Promise.reject(error),
      )
    },
    get({ commit, dispatch }, id) {
      dispatch('setLoading', true)

      return accountService.get(id).then(
        account => {
          dispatch('setLoading', false)

          commit('fetchAccountSuccess', account.data)

          return Promise.resolve(account)
        },
        error => Promise.reject(error),
      )
    },
    update({ commit, dispatch }, account) {
      dispatch('setLoading', true)

      return accountService.update(account)
        .then(
          // eslint-disable-next-line no-shadow
          account => {
            if (account.data.id) {
              commit('updateAccountSuccess', account.data)
              dispatch('setLoading', false)
            } else {
              commit('setErrors', account.data)
            }

            return Promise.resolve(account)
          },
          error => Promise.reject(error),
        )
    },
    filter({ commit }, statuses) {
      commit('filter', statuses)
    },
  },
  mutations: {
    filter(state, statuses) {
      const result = []
      if (statuses.length === 0) {
        state.accounts = state.originalData
      } else {
        state.originalData.forEach(row => {
          if (statuses.includes(row.is_active)) {
            result.push(row)
          }
        })

        state.accounts = result
      }
    },
    addAccount(state, account) {
      state.accounts.push(account)
    },
    updateAccountSuccess(state, account) {
      const index = state.accounts.findIndex(value => value.id === account.id)
      state.accounts[index] = account
    },
    fetchAccountsSuccess(state, accounts) {
      state.accounts = accounts.map(rowData => {
        // eslint-disable-next-line no-param-reassign
        rowData.is_active = rowData.is_active === true || rowData.is_active === 'Active' ? 'Active' : 'Inactive'

        return rowData
      })

      state.originalData = accounts.map(rowData => {
        // eslint-disable-next-line no-param-reassign
        rowData.is_active = rowData.is_active === true || rowData.is_active === 'Active' ? 'Active' : 'Inactive'

        return rowData
      })
    },
    fetchAccountSuccess(state, account) {
      state.account = account
      state.loading = false
    },
    setErrors(state, errors) {
      state.errors = errors
    },
    setLoading(state, loading) {
      state.loading = loading
    },
  },
}
