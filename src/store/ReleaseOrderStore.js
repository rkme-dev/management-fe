import ReleaseOrderService from '@/service/ReleaseOrderService'

const releaseOrderService = new ReleaseOrderService()
// eslint-disable-next-line import/prefer-default-export
export const ReleaseOrderStore = {
  namespaced: true,
  state: {
    loading: false,
    errors: [],
    releaseOrders: [],
    releaseOrder: {},
    rawMaterials: [],
    rawMaterial: {},
  },
  actions: {
    // eslint-disable-next-line no-shadow
    createReleaseOrder({ commit }, releaseOrder) {
      commit('setLoading', true)

      return releaseOrderService.createReleaseOrder(releaseOrder)
        .then(
          // eslint-disable-next-line no-shadow
          releaseOrder => {
            commit('addReleaseOrder', releaseOrder.data)
            commit('setErrors', {})

            return Promise.resolve(releaseOrder)
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
    deleteReleaseOrder({ commit }, releaseOrder) {
      commit('setLoading', true)

      return releaseOrderService.deleteReleaseOrder(releaseOrder)
        .then()
        .finally(() => {
          commit('setLoading', false)
        })
    },
    getRawMaterials({ commit }) {
      commit('setLoading', true)

      return releaseOrderService.getRawMaterials().then(
        rawMaterials => {
          commit('fetchRawMaterialsSuccess', rawMaterials.data)
          commit('setLoading', false)

          return Promise.resolve(rawMaterials)
        },
        error => Promise.reject(error),
      )
    },
    getReleaseOrders({ commit }) {
      commit('setLoading', true)

      return releaseOrderService.getReleaseOrders().then(
        releaseOrders => {
          commit('fetchReleaseOrdersSuccess', releaseOrders.data)
          commit('setLoading', false)

          return Promise.resolve(releaseOrders)
        },
        error => Promise.reject(error),
      )
    },
    getReleaseOrder({ commit }, id) {
      commit('setLoading', true)

      return releaseOrderService.getReleaseOrder(id).then(
        releaseOrder => {
          commit('fetchReleaseOrderSuccess', releaseOrder.data)
          commit('setLoading', false)

          return Promise.resolve(releaseOrder)
        },
        error => Promise.reject(error),
      )
    },
    updateReleaseOrder({ commit }, releaseOrder) {
      commit('setLoading', true)

      return releaseOrderService.updateRelease(releaseOrder)
        .then(
          // eslint-disable-next-line no-shadow
          releaseOrder => {
            commit('updateReleaseOrderSuccess', releaseOrder.data)
            commit('setLoading', false)

            return Promise.resolve(releaseOrder)
          },
          error => Promise.reject(error),
        )
    },
  },
  mutations: {
    addReleaseOrder(state, releaseOrder) {
      state.releaseOrders.push(releaseOrder)
    },
    updateReleaseOrderSuccess(state, releaseOrder) {
      const index = state.releaseOrders.findIndex(value => value.id === releaseOrder.id)
      state.releaseOrders[index] = releaseOrder
    },
    fetchRawMaterialsSuccess(state, rawMaterials) {
      state.rawMaterials = rawMaterials
      state.loading = false
    },
    fetchRawMaterialSuccess(state, rawMaterial) {
      state.rawMaterial = rawMaterial
      state.loading = false
    },
    fetchReleaseOrdersSuccess(state, releaseOrders) {
      state.loading = false
      state.releaseOrders = releaseOrders
    },
    fetchReleaseOrderSuccess(state, releaseOrder) {
      state.releaseOrder = releaseOrder
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
