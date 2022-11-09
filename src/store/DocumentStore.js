import DocumentService from '@/service/DocumentService'

const documentService = new DocumentService()
// eslint-disable-next-line import/prefer-default-export
export const DocumentStore = {
  namespaced: true,
  state: {
    loading: false,
    errors: [],
    documents: [],
    document: {},
    originalData: [],
  },
  actions: {
    // eslint-disable-next-line no-shadow
    create({ commit, dispatch }, document) {
      dispatch('setLoading', true)

      return documentService.create(document)
        .then(
          // eslint-disable-next-line no-shadow
          document => {
            if (document.data.id) {
              commit('addDocument', document.data)
              commit('setErrors', {})
            } else {
              commit('setErrors', document.data)
            }

            return Promise.resolve(document)
          },
          error => Promise.reject(error),
        )
        .finally(() => {
          dispatch('setLoading', false)
        })
    },
    setLoading({ commit }, state) {
      commit('setLoading', state)
    },
    removeErrors({ commit, dispatch }) {
      commit('setErrors', {})
    },
    deleteDocument({ commit, dispatch }, document) {
      dispatch('setLoading', true)

      return documentService.delete(document)
        .then(
          // eslint-disable-next-line no-shadow
          () => {
            commit('updateDocumentSuccess', document)

            return Promise.resolve(document)
          },
          error => Promise.reject(error),
        )
        .finally(() => {
          dispatch('setLoading', false)
        })
    },
    list({ commit, dispatch }) {
      commit('fetchDocumentsSuccess', [])

      dispatch('setLoading', true)

      return documentService.list().then(
        documents => {
          commit('fetchDocumentsSuccess', documents.data)

          dispatch('setLoading', false)

          return Promise.resolve(documents)
        },
        error => Promise.reject(error),
      )
    },
    get({ commit, dispatch }, id) {
      dispatch('setLoading', true)

      return documentService.get(id).then(
        document => {
          commit('fetchDocumentSuccess', document.data)
          dispatch('setLoading', false)

          return Promise.resolve(document)
        },
        error => Promise.reject(error),
      )
    },
    update({ commit, dispatch }, document) {
      dispatch('setLoading', true)

      return documentService.update(document)
        .then(
          // eslint-disable-next-line no-shadow
          document => {
            if (document.data.id) {
              commit('updateDocumentSuccess', document.data)
              dispatch('setLoading', false)
            } else {
              commit('setErrors', document.data)
            }

            return Promise.resolve(document)
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
        state.documents = state.originalData
      } else {
        state.originalData.forEach(row => {
          if (statuses.includes(row.is_active)) {
            result.push(row)
          }
        })

        state.documents = result
      }
    },
    addDocument(state, document) {
      state.documents.push(document)
    },
    updateDocumentSuccess(state, document) {
      const index = state.documents.findIndex(value => value.id === document.id)
      console.log(document)
      state.documents[index] = document
    },
    fetchDocumentsSuccess(state, documents) {
      state.documents = documents.map(rowData => {
        // eslint-disable-next-line no-param-reassign
        rowData.is_active = rowData.is_active === true || rowData.is_active === 'Active' ? 'Active' : 'Inactive'

        return rowData
      })

      state.originalData = documents.map(rowData => {
        // eslint-disable-next-line no-param-reassign
        rowData.is_active = rowData.is_active === true || rowData.is_active === 'Active' ? 'Active' : 'Inactive'

        return rowData
      })
    },
    fetchDocumentSuccess(state, document) {
      state.document = document
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
