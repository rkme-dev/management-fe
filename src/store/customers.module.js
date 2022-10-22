import CustomersService from '@/utils/services/customers.service';
import {
  GET_CUSTOMERS,
  GET_CUSTOMER,
  UPDATE_CUSTOMER,
  CREATE_CUSTOMER,
  REMOVE_CUSTOMER,
} from './actions.type'
import { SET_CUSTOMERS, SET_CUSTOMER, SET_ERROR, SET_LOADING } from "./mutations.type";

const state = {
  errors: {},
  customers: [],
  customer: [],
  loading: true,
};

const getters = {
  customers(state) {
    return state.customers
  },
  customer(state) {
    return state.customer
  },
  errors(state) {
    return state.errors
  },
  loading(state) {
    return state.loading
  },
};

const actions = {
  async [CREATE_CUSTOMER](context, payload) {
    return CustomersService.post(payload)
      .then(data => {
        if (data.status === 201) {
          context.commit(SET_ERROR, {})
          return data.data;
        }
      }).catch((e) => {
        context.commit(SET_ERROR, e.response.data.errors)
      })
  },
  async [GET_CUSTOMERS](context) {
    CustomersService.get()
      .then(({data}) => {
        context.commit(SET_CUSTOMERS, data.data);
        context.commit(SET_LOADING, false);
        return data;
      })
      .catch((e) => {
        context.commit(SET_ERROR, e.errors)
      });
  },
  async [GET_CUSTOMER](context, slug) {
    await CustomersService.find(slug)
      .then(({data}) => {
        context.commit(SET_CUSTOMER, data.data);
        return data;
      })
      .catch((e) => {
        context.commit(SET_ERROR, e.errors)
      });
  },
  async [UPDATE_CUSTOMER](context, payload) {
    return CustomersService.update(payload.id, payload)
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
  async [REMOVE_CUSTOMER](context, payload) {
    console.log(payload)
    await CustomersService.destroy(payload.id)
      .catch((e) => {
        context.commit(SET_ERROR, e.errors)
      });
  },
};

const mutations = {
  [SET_ERROR](state, error) {
    state.errors = error
  },
  [SET_CUSTOMERS](state, customers) {
    state.customers = customers;
    state.errors = {};
  },
  [SET_CUSTOMER](state, customer) {
    state.customer = customer;
    state.errors = {};
  },
  [SET_LOADING](state, value) {
    state.loading = value
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};

