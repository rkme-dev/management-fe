import ApiService from '@/utils/api.service'

const CustomersService = {
  get() {
    return ApiService.get('sales/customers')
  },
  find(slug) {
    return ApiService.get('sales/customer', slug)
  },
  update(slug, param) {
    return ApiService.update('sales/customer/update', slug, param)
  },
  post(payload) {
    return ApiService.post('sales/customer/create', payload)
  },
  async destroy(slug) {
    await ApiService.delete('sales/customer/delete', slug)
  },
}

export default CustomersService
