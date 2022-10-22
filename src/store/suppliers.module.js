import SuppliersService from '@/utils/services/suppliers.service'
import {
  GET_SUPPLIERS,
  GET_SUPPLIER,
  UPDATE_SUPPLIER,
  CREATE_SUPPLIER,
  REMOVE_SUPPLIER,
} from './actions.type'
import {
  SET_SUPPLIERS,
  SET_SUPPLIER,
  SET_ERROR,
  SET_LOADING,
} from './mutations.type'

const state = {
  suppliers: [],
  supplier: [],
  loading: true,
}

const getters = {
  suppliers(state) {
    return state.suppliers
  },
  supplier(state) {
    return state.supplier
  },
};

const actions = {
  async [CREATE_SUPPLIER](context, payload) {
    return SuppliersService.post(payload)
      .then(data => {
        if (data.status === 201) {
          context.commit(SET_ERROR, {})
          return data.data;
        }
      }).catch((e) => {
        console.log(e.response)
        context.commit(SET_ERROR, e.response.data.errors)
      })
  },
  async [GET_SUPPLIERS](context) {
    SuppliersService.get()
      .then(({data}) => {
        context.commit(SET_SUPPLIERS, data.data);
        context.commit(SET_LOADING, false);
        return data;
      })
      .catch((e) => {
        context.commit(SET_ERROR, e.errors)
      });
  },
  async [GET_SUPPLIER](context, slug) {
    await SuppliersService.find(slug)
      .then(({data}) => {
        context.commit(SET_SUPPLIER, data.data);
        return data;
      })
      .catch((e) => {
        context.commit(SET_ERROR, e.errors)
      });
  },
  async [UPDATE_SUPPLIER](context, payload) {
    return SuppliersService.update(payload.id, payload)
      .then(data => {
        if (data.status === 200) {
          context.commit(SET_ERROR, {})
          return data.data;
        }
      })
      .catch((e) => {
        context.commit(SET_ERROR, e.response.data.errors)
      });
  },
  async [REMOVE_SUPPLIER](context, payload) {
    console.log(payload)
    await SuppliersService.destroy(payload.id)
      .catch((e) => {
        context.commit(SET_ERROR, e.errors)
      });
  },
};

const mutations = {
  [SET_ERROR](state, error) {
    state.errors = error
  },
  [SET_SUPPLIERS](state, suppliers) {
    state.suppliers = suppliers;
    state.errors = {};
  },
  [SET_SUPPLIER](state, supplier) {
    state.supplier = supplier;
    state.errors = {};
  },
  [SET_LOADING](state, value) {
    state.loading = value
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
}
