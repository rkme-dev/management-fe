import ApiService from '@/utils/api.service'

const ProductsService = {
  get() {
    return ApiService.get('products')
  },
  getProductsBySupplier(slug) {
    return ApiService.get('products/list-by-supplier', slug)
  },
  find(slug) {
    return ApiService.get('product', slug)
  },
  update(slug, param) {
    return ApiService.update('product/update', slug, param)
  },
  post(payload) {
    return ApiService.post('product/create', payload)
  },
  async destroy(slug) {
    await ApiService.delete('product/delete', slug)
  },
}

export default ProductsService
