import ProductService from '@/service/ProductService'

const productService = new ProductService()
// eslint-disable-next-line import/prefer-default-export
export const ProductStore = {
  namespaced: true,
  state: {
    loading: false,
    errors: [],
    list: [],
    row: {},
    originalData: [],
  },
  actions: {
    // eslint-disable-next-line no-shadow
    create({ commit }, data) {
      commit('setLoading', true)

      return productService.create(data)
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
          commit('setLoading', false)
        })
    },
    removeErrors({ commit }) {
      commit('setErrors', {})
    },
    delete({ commit }, data) {
      commit('setLoading', true)

      return productService.delete(data)
        .then(
          () => {
            commit('updateSuccess', data)
          },
        )
        .finally(() => {
          commit('setLoading', false)
        })
    },
    list({ commit }) {
      commit('setLoading', true)

      return productService.list().then(
        response => {
          commit('fetchListSuccess', response.data)
          commit('setLoading', false)

          return Promise.resolve(response)
        },
        error => Promise.reject(error),
      )
    },
    get({ commit }, id) {
      commit('setLoading', true)

      return productService.get(id).then(
        response => {
          commit('fetchRowSuccess', response.data)
          commit('setLoading', false)

          return Promise.resolve(response)
        },
        error => Promise.reject(error),
      )
    },
    update({ commit }, data) {
      commit('setLoading', true)

      return productService.update(data)
        .then(
          // eslint-disable-next-line no-shadow
          response => {
            if (response.data.id) {
              commit('updateSuccess', response.data)
              commit('setLoading', false)
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
