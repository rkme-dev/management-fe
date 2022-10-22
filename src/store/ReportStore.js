import ReportService from '@/service/ReportService'

const reportService = new ReportService()
// eslint-disable-next-line import/prefer-default-export
export const ReportStore = {
  namespaced: true,
  state: {
    loading: false,
    ledgerReport: [],
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
    setLoading({ commit }, state) {
      commit('setLoading', state)
    },
  },
  mutations: {
    clearReport(state, index) {
      state[index] = []
    },
    fetchLedgerReport(state, data) {
      state.ledgerReport = data
    },
    setErrors(state, errors) {
      state.errors = errors
    },
    setLoading(state, loading) {
      state.loading = loading
    },
  },
}
