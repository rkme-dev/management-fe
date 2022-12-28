import WarehouseService from '@/service/WarehouseService'

const warehouseService = new WarehouseService()
// eslint-disable-next-line import/prefer-default-export
export const WarehouseStore = {
  namespaced: true,
  state: {
    loading: false,
    errors: [],
    list: [],
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
    list({ commit, dispatch }) {
      commit('fetchListSuccess', [])
      commit('setLoading', true)

      return warehouseService.getWarehouses().then(
        response => {
          commit('setErrors', {})
          commit('fetchListSuccess', response.data)
          commit('setLoading', true)

          return Promise.resolve(response)
        },
        error => {
          dispatch('setLoading', false)
          Promise.reject(error)
        },
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
  },
}
