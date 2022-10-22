import ApiService from '@/utils/api.service'

const PurchaseOrdersService = {
  approve(slug, param) {
    return ApiService.update('purchase-order/approve', slug, param)
  },
  arrival(slug, param) {
    return ApiService.update('purchase-order/arrival', slug, param)
  },
  inTransit(slug, param) {
    return ApiService.update('purchase-order/in-transit', slug, param)
  },
  pierToWarehouse(slug, param) {
    return ApiService.update('purchase-order/pier-to-warehouse', slug, param)
  },
  get() {
    return ApiService.get('purchase-orders')
  },
  find(slug) {
    return ApiService.get('purchase-order', slug)
  },
  findPaymentLogs(slug) {
    return ApiService.get('purchase-order/payment-logs', slug)
  },
  findOrderLogs(slug) {
    return ApiService.get('purchase-order/order-logs', slug)
  },
  update(slug, param) {
    return ApiService.update('purchase-order/update', slug, param)
  },
  post(payload) {
    return ApiService.post('purchase-order/create', payload)
  },
  async destroy(slug) {
    await ApiService.delete('purchase-order/cancel', slug)
  },
}

export default PurchaseOrdersService
