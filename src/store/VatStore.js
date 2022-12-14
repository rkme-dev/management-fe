import VatService from '@/service/VatService'

const vatService = new VatService()
// eslint-disable-next-line import/prefer-default-export
export const VatStore = {
  namespaced: true,
  state: {
    loading: false,
    errors: [],
    vats: [],
    vat: {},
    originalVats: [],
  },
  actions: {
    setLoading({ commit }, state) {
      commit('setLoading', state)
    },
    // eslint-disable-next-line no-shadow
    create({ commit, dispatch }, vat) {
      dispatch('setLoading', true)

      return vatService.create(vat)
        .then(
          // eslint-disable-next-line no-shadow
          vat => {
            if (vat.data.id) {
              commit('addVat', vat.data)
              commit('setErrors', {})
            } else {
              commit('setErrors', vat.data)
            }

            return Promise.resolve(vat)
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
    deleteVat({ commit, dispatch }, vat) {
      dispatch('setLoading', true)

      commit('updateVatSuccess', vat)

      return vatService.delete(vat)
        .then()
        .finally(() => {
          dispatch('setLoading', false)
        })
    },
    list({ commit, dispatch }) {
      dispatch('setLoading', true)
      commit('fetchVatsSuccess', [])

      return vatService.list().then(
        vats => {
          commit('fetchVatsSuccess', vats.data)
          dispatch('setLoading', false)

          return Promise.resolve(vats)
        },
        error => Promise.reject(error),
      )
    },
    get({ commit, dispatch }, id) {
      dispatch('setLoading', true)

      return vatService.get(id).then(
        vat => {
          commit('fetchVatSuccess', vat.data)
          dispatch('setLoading', false)

          return Promise.resolve(vat)
        },
        error => Promise.reject(error),
      )
    },
    update({ commit, dispatch }, vat) {
      dispatch('setLoading', true)

      return vatService.update(vat)
        .then(
          // eslint-disable-next-line no-shadow
          vat => {
            if (vat.data.id !== undefined) {
              commit('updateVatSuccess', vat.data)
              dispatch('setLoading', false)
            } else {
              commit('setErrors', vat.data)
            }

            return Promise.resolve(vat)
          },
          error => Promise.reject(error),
        )
    },
    filterVat({ commit }, statuses) {
      commit('filterVat', statuses)
    },
  },
  mutations: {
    addVat(state, vat) {
      state.vats.push(vat)
    },
    updateVatSuccess(state, vat) {
      const index = state.vats.findIndex(value => value.id === vat.id)
      state.vat[index] = vat
    },
    filterVat(state, statuses) {
      const result = []

      if (statuses.length === 0) {
        state.vats = state.originalVats
      } else {
        state.originalVats.forEach(vat => {
          if (statuses.includes(vat.is_active)) {
            result.push(vat)
          }
        })

        state.vats = result
      }
    },
    fetchVatsSuccess(state, vats) {
      state.vats = vats.map(vat => {
        // eslint-disable-next-line no-param-reassign
        vat.is_active = vat.is_active === true || vat.is_active === 'Active' ? 'Active' : 'Inactive'

        return vat
      })

      state.originalVats = vats.map(vat => {
        // eslint-disable-next-line no-param-reassign
        vat.is_active = vat.is_active === true || vat.is_active === 'Active' ? 'Active' : 'Inactive'

        return vat
      })

      state.loading = false
    },
    fetchVatSuccess(state, vat) {
      state.vat = vat
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
