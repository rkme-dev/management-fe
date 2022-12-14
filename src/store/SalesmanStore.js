import SalesmanService from '@/service/SalesmanService'

const salesmanService = new SalesmanService()
// eslint-disable-next-line import/prefer-default-export
export const SalesmanStore = {
  namespaced: true,
  state: {
    loading: false,
    errors: [],
    salesmans: [],
    originalData: [],
    salesman: {},

  },
  actions: {
    setLoading({ commit }, state) {
      commit('setLoading', state)
    },
    // eslint-disable-next-line no-shadow
    create({ commit, dispatch }, salesman) {
      dispatch('setLoading', true)

      return salesmanService.create(salesman)
        .then(
          // eslint-disable-next-line no-shadow
          salesman => {
            if (salesman.data.id) {
              commit('addSalesman', salesman.data)
              commit('setErrors', {})
            } else {
              commit('setErrors', salesman.data)
            }

            return Promise.resolve(salesman)
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
    deleteSalesman({ commit, dispatch }, salesman) {
      dispatch('setLoading', true)

      return salesmanService.delete(salesman)
        .then()
        .finally(() => {
          dispatch('setLoading', false)
        })
    },
    list({ commit, dispatch }) {
      dispatch('setLoading', true)
      commit('fetchSalesmansSuccess', [])

      return salesmanService.list().then(
        salesmans => {
          commit('fetchSalesmansSuccess', salesmans.data)
          dispatch('setLoading', false)

          return Promise.resolve(salesmans)
        },
        error => Promise.reject(error),
      )
    },
    get({ commit, dispatch }, id) {
      dispatch('setLoading', true)

      return salesmanService.get(id).then(
        salesman => {
          commit('fetchSalesmanSuccess', salesman.data)
          dispatch('setLoading', false)

          return Promise.resolve(salesman)
        },
        error => Promise.reject(error),
      )
    },
    update({ commit, dispatch }, salesman) {
      dispatch('setLoading', true)

      return salesmanService.update(salesman)
        .then(
          // eslint-disable-next-line no-shadow
          salesman => {
            if (salesman.data.id) {
              commit('updateSalesmanSuccess', salesman.data)
              dispatch('setLoading', false)
            } else {
              commit('setErrors', salesman.data)
            }

            return Promise.resolve(salesman)
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
        state.salesmans = state.originalData
      } else {
        state.originalData.forEach(row => {
          if (statuses.includes(row.is_active)) {
            result.push(row)
          }
        })

        state.salesmans = result
      }
    },
    addSalesman(state, salesman) {
      state.salesmans.push(salesman)
    },
    updateSalesmanSuccess(state, salesman) {
      const index = state.salesmans.findIndex(value => value.id === salesman.id)
      state.salesmans[index] = salesman
    },
    fetchSalesmansSuccess(state, salesmans) {
      state.salesmans = salesmans.map(rowData => {
        // eslint-disable-next-line no-param-reassign
        rowData.is_active = rowData.is_active === true || rowData.is_active === 'Active' ? 'Active' : 'Inactive'

        return rowData
      })

      state.originalData = salesmans.map(rowData => {
        // eslint-disable-next-line no-param-reassign
        rowData.is_active = rowData.is_active === true || rowData.is_active === 'Active' ? 'Active' : 'Inactive'

        return rowData
      })

      state.loading = false
    },
    fetchSalesmanSuccess(state, salesman) {
      state.salesman = salesman
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
