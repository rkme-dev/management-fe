import LocationService from '@/service/LocationService'

const locationService = new LocationService()
// eslint-disable-next-line import/prefer-default-export
export const LocationStore = {
  namespaced: true,
  state: {
    loading: false,
    errors: [],
    locations: [],
    location: {},
    originalData: [],
  },
  actions: {
    // eslint-disable-next-line no-shadow
    create({ commit }, location) {
      commit('setLoading', true)

      return locationService.create(location)
        .then(
          // eslint-disable-next-line no-shadow
          location => {
            if (location.data.id) {
              commit('addLocation', location.data)
              commit('setErrors', {})
            } else {
              commit('setErrors', location.data)
            }

            return Promise.resolve(location)
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
    deleteLocation({ commit }, location) {
      commit('setLoading', true)

      return locationService.delete(location)
        .then(
          // eslint-disable-next-line no-shadow
          () => {
            commit('updateLocationSuccess', location)
            commit('setLoading', false)

            return Promise.resolve(location)
          },
          error => Promise.reject(error),
        )
        .finally(() => {
          commit('setLoading', false)
        })
    },
    list({ commit }) {
      commit('setLoading', true)
      commit('fetchLocationsSuccess', [])

      return locationService.list().then(
        locations => {
          commit('fetchLocationsSuccess', locations.data)
          commit('setLoading', false)

          return Promise.resolve(locations)
        },
        error => Promise.reject(error),
      )
    },
    get({ commit }, id) {
      commit('setLoading', true)

      return locationService.get(id).then(
        location => {
          commit('fetchLocationSuccess', location.data)
          commit('setLoading', false)

          return Promise.resolve(location)
        },
        error => Promise.reject(error),
      )
    },
    update({ commit }, location) {
      commit('setLoading', true)

      return locationService.update(location)
        .then(
          // eslint-disable-next-line no-shadow
          location => {
            if (location.data.id) {
              commit('updateLocationSuccess', location.data)
              commit('setLoading', false)
            } else {
              commit('setErrors', location.data)
            }

            return Promise.resolve(location)
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
        state.locations = state.originalData
      } else {
        state.originalData.forEach(row => {
          if (statuses.includes(row.is_active)) {
            result.push(row)
          }
        })

        state.locations = result
      }
    },
    addLocation(state, location) {
      state.locations.push(location)
    },
    updateLocationSuccess(state, location) {
      const index = state.locations.findIndex(value => value.id === location.id)
      console.log(location)
      state.locations[index] = location
    },
    fetchLocationsSuccess(state, locations) {
      state.locations = locations.map(rowData => {
        // eslint-disable-next-line no-param-reassign
        rowData.is_active = rowData.is_active === true || rowData.is_active === 'Active' ? 'Active' : 'Inactive'

        return rowData
      })

      state.originalData = locations.map(rowData => {
        // eslint-disable-next-line no-param-reassign
        rowData.is_active = rowData.is_active === true || rowData.is_active === 'Active' ? 'Active' : 'Inactive'

        return rowData
      })

      state.loading = false
    },
    fetchLocationSuccess(state, location) {
      state.location = location
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
