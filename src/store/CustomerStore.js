import CustomerService from '@/service/CustomerService'

const customerService = new CustomerService()
// eslint-disable-next-line import/prefer-default-export
export const CustomerStore = {
  namespaced: true,
  state: {
    loading: false,
    errors: [],
    list: [],
    aging: [],
    row: {},
    originalData: [],
    items: [],
    originalItems: [],
  },
  actions: {
    // eslint-disable-next-line no-shadow
    create({ commit, dispatch }, data) {
      dispatch('setLoading', true)

      return customerService.create(data)
        .then(
          // eslint-disable-next-line no-shadow
          response => {
            if (response.data.id) {
              commit('add', response.data)
              commit('setErrors', {})
            } else {
              commit('setErrors', response.data.errors)
            }

            return Promise.resolve(response)
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
    delete({ commit, dispatch }, data) {
      dispatch('setLoading', true)

      return customerService.delete(data)
        .then(
          () => {
            commit('updateSuccess', data)
          },
        )
        .finally(() => {
          dispatch('setLoading', false)
        })
    },
    list({ commit, dispatch }) {
      commit('fetchListSuccess', [])
      dispatch('setLoading', true)

      return customerService.list().then(
        response => {
          commit('fetchListSuccess', response.data)
          dispatch('setLoading', false)

          return Promise.resolve(response)
        },
        error => Promise.reject(error),
      )
    },
    aging({ commit, dispatch }) {
      commit('fetchAgingSuccess', [])
      dispatch('setLoading', true)

      return customerService.aging().then(
        response => {
          commit('fetchAgingSuccess', response.data)
          dispatch('setLoading', false)

          return Promise.resolve(response)
        },
        error => Promise.reject(error),
      )
    },
    agingItems({ commit }, customerId) {
      commit('setLoading', true)

      return customerService.agingItems(customerId).then(
        response => {
          commit('fetchAgingItemsSuccess', response.data)
          commit('setLoading', false)

          return Promise.resolve(response)
        },
        error => Promise.reject(error),
      )
    },
    get({ commit, dispatch }, id) {
      dispatch('setLoading', true)

      return customerService.get(id).then(
        response => {
          commit('fetchRowSuccess', response.data)
          dispatch('setLoading', false)

          return Promise.resolve(response)
        },
        error => Promise.reject(error),
      )
    },
    setLoading({ commit }, state) {
      commit('setLoading', state)
    },
    update({ commit, dispatch }, data) {
      dispatch('setLoading', true)

      return customerService.update(data)
        .then(
          // eslint-disable-next-line no-shadow
          response => {
            if (response.data.id) {
              commit('updateSuccess', response.data)
              dispatch('setLoading', false)
            } else {
              commit('setErrors', response.data.errors)
            }

            return Promise.resolve(response)
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
        state.list = state.originalData
      } else {
        state.originalData.forEach(row => {
          if (statuses.includes(row.is_active)) {
            result.push(row)
          }
        })

        state.list = result
      }
    },
    filterAgingItems(state, customerId = null) {
      const result = []

      if (customerId === null) {
        state.items = state.originalItems
      } else {
        state.originalItems.forEach(item => {
          if (item.customer.id === customerId) {
            result.push(item)
          }
        })

        state.items = result
      }
    },
    add(state, row) {
      state.list.push(row)
    },
    updateSuccess(state, row) {
      const index = state.list.findIndex(value => value.id === row.id)
      state.list[index] = row
    },
    fetchListSuccess(state, list) {
      state.list = list.map(rowData => {
        // eslint-disable-next-line no-param-reassign
        rowData.status = rowData.is_active === 1 || rowData.is_active === true || rowData.is_active === 'Active' ? 'Active' : 'Inactive'
        rowData.status = rowData.is_bad_account === 1 || rowData.is_bad_account === true ? 'Bad Account' : rowData.status

        return rowData
      })

      state.originalData = list.map(rowData => {
        // eslint-disable-next-line no-param-reassign
        rowData.status = rowData.is_active === 1 || rowData.is_active === true || rowData.is_active === 'Active' ? 'Active' : 'Inactive'
        // eslint-disable-next-line no-param-reassign
        rowData.status = rowData.is_bad_account === 1 || rowData.is_bad_account === true ? 'Bad Account' : rowData.status
        // eslint-disable-next-line no-param-reassign
        rowData.is_active = (rowData.is_active === 1 || rowData.is_active) ? true : false
        // eslint-disable-next-line no-param-reassign
        rowData.is_bad_account = (rowData.is_bad_account === 1 || rowData.is_bad_account) ? true : false

        return rowData
      })

      state.loading = false
    },
    fetchAgingSuccess(state, list) {
      state.aging = list
      state.originalItems = list
    },
    fetchAgingItemsSuccess(state, list) {
      state.items = list
      state.originalItems = list
    },
    fetchRowSuccess(state, row) {
      state.row = row
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
