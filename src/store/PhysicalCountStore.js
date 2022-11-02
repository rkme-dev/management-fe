import PhysicalCountService from '@/service/PhysicalCountService'

const physicalCountService = new PhysicalCountService()

export const PhysicalCountStore = {
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
      create({ commit }, data) {
        commit('setLoading', true)
  
        return physicalCountService.create(data)
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
  
        return physicalCountService.delete(data)
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
  
        return physicalCountService.orderItems(customerId).then(
          response => {
            commit('fetchOrderItemsSuccess', response.data)
            commit('setLoading', false)
  
            return Promise.resolve(response)
          },
          error => Promise.reject(error),
        )
      },
      allOrderItems({ commit }) {
        commit('setLoading', true)
  
        return physicalCountService.allOrderItems().then(
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
  
        return physicalCountService.list().then(
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
  
        return physicalCountService.get(id).then(
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
  
        return physicalCountService.update(data)
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
      postCount({ commit }, id) {
        commit('setLoading', true)
  
        return physicalCountService.postCount(id)
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
      unpostCount({ commit }, id) {
        commit('setLoading', true)
  
        return physicalCountService.unpostCount(id)
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