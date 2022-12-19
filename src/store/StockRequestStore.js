import StockRequestService from '@/service/StockRequestService'

const stockRequestService = new StockRequestService()
// eslint-disable-next-line import/prefer-default-export
export const StockRequestStore = {
  namespaced: true,
  state: {
    loading: false,
    errors: [],
    list: [],
    row: {},
    originalData: [],
    items: [],
    originalItems: [],
  },
  actions: {
    // eslint-disable-next-line no-shadow
    createBottleFilling({ commit }, data) {
      commit('setLoading', true)

      return stockRequestService.createBottleFilling(data)
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
          commit('setLoading', false)
        })
    },
    createBottleBlowing({ commit }, data) {
      commit('setLoading', true)

      return stockRequestService.createBottleBlowing(data)
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
          commit('setLoading', false)
        })
    },
    removeErrors({ commit }) {
      commit('setErrors', {})
    },
    delete({ commit }, data) {
      commit('setLoading', true)

      return stockRequestService.delete(data)
        .then(
          () => {
            commit('updateSuccess', data)
          },
        )
        .finally(() => {
          commit('setLoading', false)
        })
    },
    resetOrderItems({ commit }) {
      commit('fetchOrderItemsSuccess', [])
    },
    orderItems({ commit }, customerId) {
      commit('setLoading', true)

      return stockRequestService.orderItems(customerId).then(
        response => {
          commit('fetchOrderItemsSuccess', response.data)
          commit('setLoading', false)

          return Promise.resolve(response)
        },
        error => Promise.reject(error),
      )
    },

    list({ commit }) {
      commit('setLoading', true)

      return stockRequestService.list().then(
        response => {
          commit('fetchListSuccess', response.data)
          commit('setLoading', false)
          commit('setErrors', {})

          return Promise.resolve(response)
        },
        error => {
          commit('setErrors', {})
          Promise.reject(error)
        },
      )
    },
    get({ commit }, id) {
      commit('setLoading', true)

      return stockRequestService.get(id).then(
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

      return stockRequestService.update(data)
        .then(
          // eslint-disable-next-line no-shadow
          response => {
            if (response.data.id) {
              commit('updateSuccess', response.data)
              commit('setLoading', false)
            } else {
              commit('setErrors', response.data)
            }

            return Promise.resolve(response)
          },
          error => Promise.reject(error),
        )
    },
    postOrder({ commit }, id) {
      commit('setLoading', true)

      return stockRequestService.postOrder(id)
        .then(
          // eslint-disable-next-line no-shadow
          response => {
            if (response.data.id) {
              commit('updateSuccess', response.data)
              commit('setLoading', false)
            } else {
              commit('setErrors', response.data)
            }

            return Promise.resolve(response)
          },
          error => Promise.reject(error),
        )
    },
    unpostOrder({ commit }, id) {
      commit('setLoading', true)

      return stockRequestService.unpostOrder(id)
        .then(
          // eslint-disable-next-line no-shadow
          response => {
            if (response.data.id) {
              commit('updateSuccess', response.data)
              commit('setLoading', false)
            } else {
              commit('setErrors', response.data)
            }

            return Promise.resolve(response)
          },
          error => Promise.reject(error),
        )
    },
  },
  mutations: {
    // filter(state, statuses) {
    //   const result = []
    //   if (statuses.length === 0) {
    //     state.list = state.originalData
    //   } else {
    //     state.originalData.forEach(row => {
    //       if (statuses.includes(row.is_active)) {
    //         result.push(row)
    //       }
    //     })
    //
    //     state.list = result
    //   }
    // },
    filterOrderItems(state, customerId = null) {
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
    fetchOrderItemsSuccess(state, list) {
      state.items = list
      state.originalItems = list
    },
    fetchListSuccess(state, list) {
      state.list = list.map(item => {
        // eslint-disable-next-line no-param-reassign
        item.status = item.status.replace(/^_*(.)|_+(.)/g, (s, c, d) => (c ? c.toUpperCase() : ` ${d.toUpperCase()}`))

        return item
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
