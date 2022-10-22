import WarehouseService from '@/service/WarehouseService'

const warehouseService = new WarehouseService()
// eslint-disable-next-line import/prefer-default-export
export const WarehouseStore = {
  namespaced: true,
  state: {
    loading: false,
    errors: [],
    warehouses: [],
    warehouse: {},

  },
  actions: {
    // eslint-disable-next-line no-shadow
    create({ commit }, warehouse) {
      commit('setLoading', true)

      return warehouseService.create(warehouse)
        .then(
          // eslint-disable-next-line no-shadow
          warehouse => {
            if (warehouse.data.id) {
              commit('addWareHouse', warehouse.data)
              commit('setErrors', {})
            } else {
              commit('setErrors', warehouse.data)
            }

            return Promise.resolve(warehouse)
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
    deleteWarehouse({ commit }, warehouse) {
      commit('setLoading', true)

      return warehouse.delete(warehouse)
        .then()
        .finally(() => {
          commit('setLoading', false)
        })
    },
    getWarehouses({ commit }) {
      commit('setLoading', true)

      return warehouseService.getWarehouses().then(
        warehouses => {
          commit('fetchWarehousesSuccess', warehouses.data)
          commit('setLoading', false)

          return Promise.resolve(warehouses)
        },
        error => Promise.reject(error),
      )
    },
    getWarehouse({ commit }, id) {
      commit('setLoading', true)

      return warehouseService.get(id).then(
        warehouse => {
          commit('fetchWarehouseSuccess', warehouse.data)
          commit('setLoading', false)

          return Promise.resolve(warehouse)
        },
        error => Promise.reject(error),
      )
    },
    update({ commit }, warehouse) {
      commit('setLoading', true)

      return warehouseService.update(warehouse)
        .then(
          // eslint-disable-next-line no-shadow
          releaseOrder => {
            commit('updateWarehouseSuccess', releaseOrder.data)
            commit('setLoading', false)

            return Promise.resolve(releaseOrder)
          },
          error => Promise.reject(error),
        )
    },
  },
  mutations: {
    addWarehouse(state, warehouse) {
      state.warehouses.push(warehouse)
    },
    updateWarehouseSuccess(state, warehouse) {
      const index = state.warehouses.findIndex(value => value.id === warehouse.id)
      state.warehouses[index] = warehouse
    },
    fetchWarehousesSuccess(state, warehouses) {
      state.warehouses = warehouses
      state.loading = false
    },
    fetchWarehouseSuccess(state, warehouse) {
      state.warehouse = warehouse
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
