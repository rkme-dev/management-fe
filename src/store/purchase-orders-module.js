import PurchaseOrdersService from '@/utils/services/purchase-orders.service'
import {
  APPROVE_PURCHASE_ORDER, ARRIVAL_PURCHASE_ORDER,
  CLOSE_PURCHASE_ORDER,
  CREATE_PURCHASE_ORDER,
  GET_PURCHASE_ORDER, GET_PURCHASE_ORDER_LOGS,
  GET_PURCHASE_ORDERS,
  IN_TRANSIT_PURCHASE_ORDER, PIER_TO_WAREHOUSE_PURCHASE_ORDER,
  UPDATE_PURCHASE_ORDER,
} from './actions.type'
import {
  SET_PURCHASE_ORDERS,
  SET_PURCHASE_ORDER,
  SET_ERROR, SET_LOADING, SET_PURCHASE_ORDER_LOGS, SET_PURCHASE_ORDER_PAYMENT_LOGS,
} from './mutations.type'

const state = {
  errors: {},
  purchaseOrders: [],
  purchaseOrder: [],
  purchaseOrderLogs: [],
  purchaseOrderPaymentLogs: [],
  loading: true,
}

const getters = {
  purchaseOrders(state) {
    return state.purchaseOrders
  },
  purchaseOrder(state) {
    return state.purchaseOrder
  },
  purchaseOrderLogs(state) {
    return state.purchaseOrderLogs
  },
  purchaseOrderPaymentLogs(state) {
    return state.purchaseOrderLogs
  },
}

const actions = {
  async [APPROVE_PURCHASE_ORDER](context, payload) {
    return PurchaseOrdersService.approve(payload.id, payload)
      .then(data => {
        if (data.status === 200) {
          context.commit(SET_ERROR, {})
          return data.data
        }
      }).catch((e) => {
        context.commit(SET_ERROR, e.response.data.errors)
      })
  },
  async [IN_TRANSIT_PURCHASE_ORDER](context, payload) {
    return PurchaseOrdersService.inTransit(payload.id, payload)
      .then(data => {
        if (data.status === 200) {
          context.commit(SET_ERROR, {})
          return data.data
        }
      }).catch((e) => {
        context.commit(SET_ERROR, e.response.data.errors)
      })
  },
  async [PIER_TO_WAREHOUSE_PURCHASE_ORDER](context, payload) {
    return PurchaseOrdersService.pierToWarehouse(payload.id, payload)
      .then(data => {
        if (data.status === 200) {
          context.commit(SET_ERROR, {})
          return data.data
        }
      }).catch((e) => {
        context.commit(SET_ERROR, e.response.data.errors)
      })
  },
  async [ARRIVAL_PURCHASE_ORDER](context, payload) {
    return PurchaseOrdersService.arrival(payload.id, payload)
      .then(data => {
        if (data.status === 200) {
          context.commit(SET_ERROR, {})
          return data.data
        }
      }).catch((e) => {
        context.commit(SET_ERROR, e.response.data.errors)
      })
  },
  async [CREATE_PURCHASE_ORDER](context, payload) {
    return PurchaseOrdersService.post(payload)
      .then(data => {
        if (data.status === 201) {
          context.commit(SET_ERROR, {})
          return data.data
        }
      }).catch((e) => {
        context.commit(SET_ERROR, e.response.data.errors)
      })
  },
  async [GET_PURCHASE_ORDERS](context) {
    PurchaseOrdersService.get()
      .then(({data}) => {
        context.commit(SET_PURCHASE_ORDERS, data.data);
        context.commit(SET_LOADING, false);
        return data;
      })
      .catch((e) => {
        context.commit(SET_ERROR, e.errors)
      });
  },
  async [GET_PURCHASE_ORDER](context, slug) {
    await PurchaseOrdersService.find(slug)
      .then(({data}) => {
        context.commit(SET_PURCHASE_ORDER, data.data);
        return data;
      })
      .catch((e) => {
        context.commit(SET_ERROR, e.errors)
      });
  },
  async [GET_PURCHASE_ORDER_LOGS](context, slug) {
    console.log(slug)
    await PurchaseOrdersService.findOrderLogs(slug)
      .then(({data}) => {
        context.commit(SET_PURCHASE_ORDER_LOGS, data.data);
        return data;
      })
      .catch((e) => {
        context.commit(SET_ERROR, e.errors)
      });
  },
  async [UPDATE_PURCHASE_ORDER](context, payload) {
    return PurchaseOrdersService.update(payload.id, payload)
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
  async [CLOSE_PURCHASE_ORDER](context, payload) {
    console.log(payload)
    await PurchaseOrdersService.destroy(payload.id)
      .catch((e) => {
        context.commit(SET_ERROR, e.errors)
      });
  },
};

const mutations = {
  [SET_ERROR](state, error) {
    state.errors = error
  },
  [SET_PURCHASE_ORDERS](state, purchaseOrders) {
    state.purchaseOrders = purchaseOrders;
    state.errors = {};
  },
  [SET_PURCHASE_ORDER](state, purchaseOrder) {
    state.purchaseOrder = purchaseOrder;
    state.errors = {};
  },
  [SET_PURCHASE_ORDER_LOGS](state, logs) {
    state.purchaseOrderLogs = logs;
    state.errors = {};
  },
  [SET_PURCHASE_ORDER_PAYMENT_LOGS](state, logs) {
    state.purchaseOrderPaymentLogs = logs;
    state.errors = {};
  },
  // [SET_LOADING](state, value) {
  //   state.loading = value
  // },
};

export default {
  state,
  actions,
  mutations,
  getters,
}
