import ReportService from '@/service/ReportService'

const reportService = new ReportService()
// eslint-disable-next-line import/prefer-default-export
export const ReportStore = {
  namespaced: true,
  state: {
    loading: false,
    ledgerReport: [],
    stockcardReport: [],
    agingReport: [],
    agingItemsReport: [],
  },
  actions: {
    clearReport({ commit }, index) {
      commit('clearReport', index)
    },
    getLedgerReport({ commit, dispatch }, id) {
      dispatch('setLoading', true)

      return reportService.getReleaseOrder(id).then(
        response => {
          commit('fetchLedgerReport', response.data)
          dispatch('setLoading', false)

          return Promise.resolve(response)
        },
        error => {
          dispatch('setLoading', false)
          Promise.reject(error)
        },
      )
    },
    getAgingReport({ commit, dispatch }) {
      dispatch('setLoading', true)

      return reportService.getCustomerAging().then(
        response => {
          commit('fetchAgingReport', response.data)
          dispatch('setLoading', false)

          return Promise.resolve(response)
        },
        error => {
          dispatch('setLoading', false)
          Promise.reject(error)
        },
      )
    },
    getAgingItemsReport({ commit, dispatch }, id) {
      dispatch('setLoading', true)

      return reportService.getCustomerAgingItems(id).then(
        response => {
          commit('fetchAgingItemsReport', response.data)
          dispatch('setLoading', false)

          return Promise.resolve(response)
        },
        error => {
          dispatch('setLoading', false)
          Promise.reject(error)
        },
      )
    },
    getStockcardReport({ commit, dispatch }, payload) {
      dispatch('setLoading', true)

      return reportService.getStockcard(payload.productId, payload.fromDate, payload.toDate, payload.unit).then(
        response => {
          commit('fetchStockcardReport', response.data)
          dispatch('setLoading', false)

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
  },
  mutations: {
    clearReport(state, index) {
      state[index] = []
    },
    fetchAgingReport(state, data) {
      state.agingReport = data
    },
    fetchAgingItemsReport(state, data) {
      state.agingItemsReport = data
    },
    fetchLedgerReport(state, data) {
      state.ledgerReport = data
    },
    fetchStockcardReport(state, data) {
      state.stockcardReport = data
    },
    setErrors(state, errors) {
      state.errors = errors
    },
    setLoading(state, loading) {
      state.loading = loading
    },
  },
}
