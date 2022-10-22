import ProductsService from '@/utils/services/products.service';
import {
  GET_PRODUCTS,
  GET_PRODUCT,
  GET_PRODUCTS_BY_SUPPLIER,
  UPDATE_PRODUCT,
  CREATE_PRODUCT,
  REMOVE_PRODUCT,
} from './actions.type'
import {
  SET_PRODUCTS,
  SET_PRODUCT,
  SET_ERROR,
  SET_LOADING,
} from './mutations.type'

const state = {
  products: [],
  product: [],
  loading: true,
}

const getters = {
  products(state) {
    return state.products
  },
  product(state) {
    return state.product
  },
};

const actions = {
  async [CREATE_PRODUCT](context, payload) {
    return ProductsService.post(payload)
      .then(data => {
        if (data.status === 201) {
          context.commit(SET_ERROR, {})
          return data.data
        }
      }).catch((e) => {
        context.commit(SET_ERROR, e.response.data)
      })
  },
  async [GET_PRODUCTS](context) {
    ProductsService.get()
      .then(({data}) => {
        context.commit(SET_PRODUCTS, data.data);
        context.commit(SET_LOADING, false);
        return data;
      })
      .catch((e) => {
        context.commit(SET_ERROR, e.errors)
      });
  },
  async [GET_PRODUCT](context, slug) {
    await ProductsService.find(slug)
      .then(({data}) => {
        context.commit(SET_PRODUCT, data.data);
        return data;
      })
      .catch((e) => {
        context.commit(SET_ERROR, e.errors)
      });
  },
  async [GET_PRODUCTS_BY_SUPPLIER](context, payload) {
    await ProductsService.getProductsBySupplier(payload)
      .then(data => {
        context.commit(SET_PRODUCTS, data.data.data)
        context.commit(SET_LOADING, false)

        return data
      })
      .catch((e) => {
        context.commit(SET_ERROR, e.errors)
      });
  },
  async [UPDATE_PRODUCT](context, payload) {
    return ProductsService.update(payload.id, payload)
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
  async [REMOVE_PRODUCT](context, payload) {
    await ProductsService.destroy(payload.id)
      .catch((e) => {
        context.commit(SET_ERROR, e.errors)
      });
  },
};

const mutations = {
  [SET_ERROR](state, error) {
    state.errors = error
  },
  [SET_PRODUCTS](state, products) {
    state.products = products;
    state.errors = {};
  },
  [SET_PRODUCT](state, product) {
    state.product = product;
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
