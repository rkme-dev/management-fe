import ApiService from '@/utils/api.service'

const SuppliersService = {
  get() {
    return ApiService.get('suppliers')
  },
  find(slug) {
    return ApiService.get('supplier', slug)
  },
  update(slug, param) {
    return ApiService.update('supplier/update', slug, param)
  },
  post(payload) {
    return ApiService.post('supplier/create', payload)
  },
  async destroy(slug) {
    await ApiService.delete('supplier/delete', slug)
  },
}

export default SuppliersService
