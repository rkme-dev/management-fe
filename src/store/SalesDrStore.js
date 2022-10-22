import SalesDrService from '@/service/SalesDrService'

const salesDrService = new SalesDrService()
// eslint-disable-next-line import/prefer-default-export
export const SalesDrStore = {
  namespaced: true,
  state: {
    loading: false,
    errors: [],
    list: [],
    row: {},
    originalData: [],
    items: [],
    areas: [],
  },
  actions: {
    // eslint-disable-next-line no-shadow
    setLoading({ commit }, state) {
      commit('setLoading', state)
    },
    create({ commit, dispatch }, data) {
      dispatch('setLoading', true)

      return salesDrService.create(data)
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

      return salesDrService.delete(data)
        .then(
          () => {
            commit('updateSuccess', data)
          },
        )
        .finally(() => {
          dispatch('setLoading', false)
        })
    },
    drListByCustomer({ commit, dispatch }, customerId) {
      dispatch('setLoading', true)

      return salesDrService.drListByCustomer(customerId).then(
        response => {
          commit('fetchOrderItemsSuccess', response.data)
          dispatch('setLoading', false)

          return Promise.resolve(response)
        },
        error => Promise.reject(error),
      )
    },
    getUnlinkItems({ commit, dispatch }, data) {
      dispatch('setLoading', true)

      return salesDrService.getUnlinkItems(data.area, data.id).then(
        response => {
          commit('fetchOrderItemsSuccess', response.data)
          dispatch('setLoading', false)

          return Promise.resolve(response)
        },
        error => Promise.reject(error),
      )
    },
    orderItems({ commit, dispatch }, customerId) {
      dispatch('setLoading', true)

      return salesDrService.orderItems(customerId).then(
        response => {
          commit('fetchOrderItemsSuccess', response.data)
          dispatch('setLoading', false)

          return Promise.resolve(response)
        },
        error => Promise.reject(error),
      )
    },
    updateOrderItems({ commit }, items) {
      commit('fetchOrderItemsSuccess', items)
    },
    list({ commit, dispatch }) {
      dispatch('setLoading', true)

      return salesDrService.list().then(
        response => {
          commit('fetchListSuccess', response.data)
          dispatch('setLoading', false)
          commit('setErrors', {})

          return Promise.resolve(response)
        },
        error => {
          commit('setErrors', {})
          Promise.reject(error)
        },
      )
    },
    get({ commit, dispatch }, id) {
      dispatch('setLoading', true)

      return salesDrService.get(id).then(
        response => {
          commit('fetchRowSuccess', response.data)
          dispatch('setLoading', false)

          return Promise.resolve(response)
        },
        error => Promise.reject(error),
      )
    },
    update({ commit, dispatch }, data) {
      dispatch('setLoading', true)

      return salesDrService.update(data)
        .then(
          // eslint-disable-next-line no-shadow
          response => {
            if (response.data.id) {
              commit('updateSuccess', response.data)
              dispatch('setLoading', false)
            } else {
              commit('setErrors', response.data)
            }

            return Promise.resolve(response)
          },
          error => Promise.reject(error),
        )
    },
    getAreas({ commit, dispatch }) {
      dispatch('setLoading', true)

      return salesDrService.areas().then(
        response => {
          commit('fetchAreasSuccess', response.data)
          dispatch('setLoading', false)

          return Promise.resolve(response)
        },
        error => Promise.reject(error),
      )
    },
    postOrder({ commit, dispatch }, id) {
      dispatch('setLoading', true)

      return salesDrService.postOrder(id)
        .then(
          // eslint-disable-next-line no-shadow
          response => {
            if (response.data.id) {
              commit('updateSuccess', response.data)
              dispatch('setLoading', false)
            } else {
              commit('setErrors', response.data)
            }

            return Promise.resolve(response)
          },
          error => Promise.reject(error),
        )
    },
    unpostOrder({ commit, dispatch }, id) {
      dispatch('setLoading', true)

      return salesDrService.unpostOrder(id)
        .then(
          // eslint-disable-next-line no-shadow
          response => {
            if (response.data.id) {
              commit('updateSuccess', response.data)
              dispatch('setLoading', false)
            } else {
              commit('setErrors', response.data)
            }

            return Promise.resolve(response)
          },
          error => Promise.reject(error),
        )
    },

    // filter({ commit, dispatch }, statuses) {
    //   commit('filter', statuses)
    // },
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

    add(state, row) {
      state.list.push(row)
    },
    updateSuccess(state, row) {
      const index = state.list.findIndex(value => value.id === row.id)
      state.list[index] = row
    },
    fetchAreasSuccess(state, list) {
      state.areas = list
    },
    fetchOrderItemsSuccess(state, list) {
      const uniqueIds = []

      state.items = list.filter(element => {
        const isDuplicate = uniqueIds.includes(element.id)

        if (!isDuplicate) {
          uniqueIds.push(element.id)

          return true
        }

        return false
      })
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
