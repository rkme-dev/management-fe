import TermService from '@/service/TermService'

const termService = new TermService()
// eslint-disable-next-line import/prefer-default-export
export const TermStore = {
  namespaced: true,
  state: {
    loading: false,
    errors: [],
    terms: [],
    term: {},
    originalData: [],
  },
  actions: {
    // eslint-disable-next-line no-shadow
    create({ commit }, term) {
      commit('setLoading', true)

      return termService.create(term)
        .then(
          // eslint-disable-next-line no-shadow
          term => {
            if (term.data.id) {
              commit('addTerm', term.data)
              commit('setErrors', {})
            } else {
              commit('setErrors', term.data)
            }

            return Promise.resolve(term)
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
    deleteTerm({ commit }, term) {
      commit('setLoading', true)

      return termService.delete(term)
        .then()
        .finally(() => {
          commit('setLoading', false)
        })
    },
    list({ commit }) {
      commit('setLoading', true)

      commit('fetchTermsSuccess', [])

      return termService.list().then(
        terms => {
          commit('fetchTermsSuccess', terms.data)
          commit('setLoading', false)

          return Promise.resolve(terms)
        },
        error => Promise.reject(error),
      )
    },
    get({ commit }, id) {
      commit('setLoading', true)

      return termService.get(id).then(
        term => {
          commit('fetchtermSuccess', term.data)
          commit('setLoading', false)

          return Promise.resolve(term)
        },
        error => Promise.reject(error),
      )
    },
    update({ commit }, term) {
      commit('setLoading', true)

      return termService.update(term)
        .then(
          // eslint-disable-next-line no-shadow
          term => {
            if (term.data.id) {
              commit('updateTermSuccess', term.data)
              commit('setLoading', false)
            } else {
              commit('setErrors', term.data)
            }

            return Promise.resolve(term)
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
        state.terms = state.originalData
      } else {
        state.originalData.forEach(row => {
          if (statuses.includes(row.is_active)) {
            result.push(row)
          }
        })

        state.terms = result
      }
    },

    addTerm(state, term) {
      state.terms.push(term)
    },
    updateTermSuccess(state, term) {
      const index = state.terms.findIndex(value => value.id === term.id)
      state.terms[index] = term
    },
    fetchTermsSuccess(state, terms) {
      state.terms = terms.map(rowData => {
        // eslint-disable-next-line no-param-reassign
        rowData.is_active = rowData.is_active === true || rowData.is_active === 'Active' ? 'Active' : 'Inactive'

        return rowData
      })

      state.originalData = terms.map(rowData => {
        // eslint-disable-next-line no-param-reassign
        rowData.is_active = rowData.is_active === true || rowData.is_active === 'Active' ? 'Active' : 'Inactive'

        return rowData
      })

      state.loading = false
    },
    fetchTermSuccess(state, term) {
      state.term = term
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
