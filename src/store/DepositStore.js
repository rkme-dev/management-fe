import DepositService from '@/service/DepositService'

const depositService = new DepositService()
// eslint-disable-next-line import/prefer-default-export
export const DepositStore = {
    namespaced: true,
    state: {
        loading: false,
        errors: [],
        list: [],
        row: {

        },
        originalData: [],
        items: [],
        checks: [],
    },
    actions: {
        // eslint-disable-next-line no-shadow
        create({ commit }, data) {
            commit('setLoading', true)

            return depositService.create(data)
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
                    commit('setLoading', false)
                })
        },
        removeErrors({ commit }) {
            commit('setErrors', {})
        },
        delete({ commit }, data) {
            commit('setLoading', true)

            return depositService.delete(data)
                .then(
                    () => {
                        commit('updateSuccess', data)
                    },
                )
                .finally(() => {
                    commit('setLoading', false)
                })
        },
        getChecks({ commit }, id = null) {
            commit('setLoading', true)

            return depositService.checks(id).then(
                response => {
                    commit('fetchChecksSuccess', response.data)
                    commit('setLoading', false)

                    return Promise.resolve(response)
                },
                error => Promise.reject(error),
            )
        },
        list({ commit }) {
            commit('setLoading', true)

            return depositService.list().then(
                response => {
                    commit('fetchListSuccess', response.data)
                    commit('setLoading', false)
                    commit('setErrors', {})

                    return Promise.resolve(response)
                },
                error => {
                    commit('setErrors', {})
                    Promise.reject(error)
                },
            )
        },
        get({ commit }, id) {
            commit('setLoading', true)

            return depositService.get(id).then(
                response => {
                    commit('fetchRowSuccess', response.data)
                    commit('setLoading', false)

                    return Promise.resolve(response)
                },
                error => Promise.reject(error),
            )
        },
        update({ commit }, data) {
            commit('setLoading', true)

            return depositService.update(data)
                .then(
                    // eslint-disable-next-line no-shadow
                    response => {
                        if (response.data.id) {
                            commit('updateSuccess', response.data)
                            commit('setLoading', false)
                        } else {
                            commit('setErrors', response.data)
                        }

                        return Promise.resolve(response)
                    },
                    error => Promise.reject(error),
                )
        },
        postOrder({ commit }, id) {
            commit('setLoading', true)

            return depositService.postOrder(id)
                .then(
                    // eslint-disable-next-line no-shadow
                    response => {
                        if (response.data.id) {
                            commit('updateSuccess', response.data)
                            commit('setLoading', false)
                        } else {
                            commit('setErrors', response.data)
                        }

                        return Promise.resolve(response)
                    },
                    error => Promise.reject(error),
                )
        },
        unpostOrder({ commit }, id) {
            commit('setLoading', true)

            return depositService.unpostOrder(id)
                .then(
                    // eslint-disable-next-line no-shadow
                    response => {
                        if (response.data.id) {
                            commit('updateSuccess', response.data)
                            commit('setLoading', false)
                        } else {
                            commit('setErrors', response.data)
                        }

                        return Promise.resolve(response)
                    },
                    error => Promise.reject(error),
                )
        },
    },
    mutations: {
        add(state, row) {
            state.list.push(row)
        },
        updateSuccess(state, row) {
            const index = state.list.findIndex(value => value.id === row.id)
            state.list[index] = row
        },
        fetchChecksSuccess(state, checks) {
            state.checks = checks
        },
        fetchListSuccess(state, list) {
            state.list = list.map(item => {
                // eslint-disable-next-line no-param-reassign
                item.status = item.status.replace(/^_*(.)|_+(.)/g, (s, c, d) => (c ? c.toUpperCase() : ` ${d.toUpperCase()}`))

                return item
            })
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
    },
}
