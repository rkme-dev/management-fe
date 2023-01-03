import FinishProductService from '@/service/FinishProductService'

const finishProductService = new FinishProductService()
// eslint-disable-next-line import/prefer-default-export
export const FinishProductStore = {
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
    addUnitPacking({ commit, dispatch }, data) {
      dispatch('setLoading', true)

      return finishProductService.addUnit(data)
        .then(
          // eslint-disable-next-line no-shadow
          response => {
            if (response.data.id) {
              commit('updateSuccess', response.data)
              commit('setErrors', {})
            } else {
              commit('setErrors', response.data)
            }

            return Promise.resolve(response)
          },
          error => Promise.reject(error),
        )
        .finally(() => {
          dispatch('setLoading', false)
        })
    },
    // eslint-disable-next-line no-shadow
    removeUnitPacking({ commit, dispatch }, data) {
      dispatch('setLoading', true)

      return finishProductService.removeUnit(data)
        .then(
          // eslint-disable-next-line no-shadow
          response => {
            if (response.data.id) {
              commit('updateSuccess', response.data)
              commit('setErrors', {})
            } else {
              commit('setErrors', response.data)
            }

            return Promise.resolve(response)
          },
          error => Promise.reject(error),
        )
        .finally(() => {
          dispatch('setLoading', false)
        })
    },
    // eslint-disable-next-line no-shadow
    create({ commit, dispatch }, data) {
      dispatch('setLoading', true)

      return finishProductService.create(data)
        .then(
          // eslint-disable-next-line no-shadow
          response => {
            if (response.data.id) {
              commit('add', response.data)
              commit('setErrors', {})
            } else {
              commit('setErrors', response.data)
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

      return finishProductService.delete(data)
        .then(
          () => {
            commit('setErrors', {})
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

      return finishProductService.list().then(
        response => {
          commit('setErrors', {})
          commit('fetchListSuccess', response.data)
          dispatch('setLoading', false)

          return Promise.resolve(response)
        },
        error => {
          dispatch('setLoading', false)
          Promise.reject(error)
        },
      )
    },
    removeProductById({ commit }, id) {
      commit('removeProductById', id)
    },
    listAll({ commit, dispatch }) {
      commit('fetchListSuccess', [])
      dispatch('setLoading', true)

      return finishProductService.listAll().then(
        response => {
          commit('setErrors', {})
          commit('fetchListSuccess', response.data)
          dispatch('setLoading', false)

          return Promise.resolve(response)
        },
        error => {
          dispatch('setLoading', false)
          Promise.reject(error)
        },
      )
    },
    get({ commit, dispatch }, id) {
      dispatch('setLoading', true)

      return finishProductService.get(id).then(
        response => {
          commit('fetchRowSuccess', response.data)
          dispatch('setLoading', false)
          commit('setErrors', {})

          return Promise.resolve(response)
        },
        error => {
          dispatch('setLoading', false)
          Promise.reject(error)
        },
      )
    },
    setLoading({ commit }, state) {
      commit('setLoading', state)
    },
    update({ commit, dispatch }, data) {
      dispatch('setLoading', true)

      return finishProductService.update(data)
        .then(
          // eslint-disable-next-line no-shadow
          response => {
            if (response.data.id) {
              commit('updateSuccess', response.data)
              dispatch('setLoading', false)
              commit('setErrors', {})
            } else {
              dispatch('setLoading', false)
              commit('setErrors', response.data)
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
    removeProductById(state, id) {
      const index = state.list.findIndex(item => item.id === id)

      state.list.splice(index, 1)
    },
    filter(state, statuses) {
      const result = []
      if (statuses.length === 0) {
        state.list = state.originalData
      } else {
        state.originalData.forEach(row => {
          if (statuses.includes(row.active)) {
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
        rowData.active = rowData.active === 1 || rowData.active === true || rowData.active === 'Active' ? 'Active' : 'Inactive'

        return rowData
      })

      state.originalData = list.map(rowData => {
        // eslint-disable-next-line no-param-reassign
        rowData.active = rowData.active === 1 || rowData.active === true || rowData.active === 'Active' ? 'Active' : 'Inactive'

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
