import TripTicketService from '@/service/TripTicketService'

const tripTicketService = new TripTicketService()
// eslint-disable-next-line import/prefer-default-export
export const TripTicketStore = {
  namespaced: true,
  state: {
    loading: false,
    errors: [],
    list: [],
    row: {},
    originalData: [],
    items: []
  },
  actions: {
    // eslint-disable-next-line no-shadow
    create({ commit, dispatch }, data) {
      dispatch('setLoading', true)

      return tripTicketService.create(data)
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

      return tripTicketService.delete(data)
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
      dispatch('setLoading', true)

      return tripTicketService.list().then(
        response => {
          commit('fetchListSuccess', response.data)
          dispatch('setLoading', false)

          return Promise.resolve(response)
        },
        error => Promise.reject(error),
      )
    },
    get({ commit, dispatch }, id) {
      dispatch('setLoading', true)

      return tripTicketService.get(id).then(
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

      return tripTicketService.update(data)
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
    updateToInTransit({ commit, dispatch }, data) {
      dispatch('setLoading', true)

      return tripTicketService.inTransit(data)
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
    updateToDelivered({ commit, dispatch }, data) {
      dispatch('setLoading', true)

      return tripTicketService.delivered(data)
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
    filter({ commit }, statuses) {
      commit('filter', statuses)
    },
    drItems({ commit, dispatch }, data) {
      dispatch('setLoading', true)

      return tripTicketService.drItems(data.id, data.area).then(
        response => {
          commit('fetchOrderItemsSuccess', response.data)
          dispatch('setLoading', false)

          return Promise.resolve(response)
        },
        error => Promise.reject(error),
      )
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
      state.list = list
      state.originalData = list

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
  },
}
