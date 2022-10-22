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
    // eslint-disable-next-line no-shadow
    create({ commit }, account) {
      commit('setLoading', true)

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
          commit('setLoading', false)
        })
    },
    removeErrors({ commit }) {
      commit('setErrors', {})
    },
    deleteAccount({ commit }, account) {
      commit('setLoading', true)

      return accountService.delete(account)
        .then(
          // eslint-disable-next-line no-shadow
          () => {
            commit('updateAccountSuccess', account)
            commit('setLoading', false)

            return Promise.resolve(account)
          },
          error => Promise.reject(error),
        )
        .finally(() => {
          commit('setLoading', false)
        })
    },
    list({ commit }) {
      commit('setLoading', true)
      commit('fetchAccountsSuccess', [])

      return accountService.list().then(
        accounts => {
          commit('fetchAccountsSuccess', accounts.data)
          commit('setLoading', false)

          return Promise.resolve(accounts)
        },
        error => Promise.reject(error),
      )
    },
    get({ commit }, id) {
      commit('setLoading', true)

      return accountService.get(id).then(
        account => {
          commit('fetchAccountSuccess', account.data)
          commit('setLoading', false)

          return Promise.resolve(account)
        },
        error => Promise.reject(error),
      )
    },
    update({ commit }, account) {
      commit('setLoading', true)

      return accountService.update(account)
        .then(
          // eslint-disable-next-line no-shadow
          account => {
            if (account.data.id) {
              commit('updateAccountSuccess', account.data)
              commit('setLoading', false)
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
      console.log(account)
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

      state.loading = false
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
