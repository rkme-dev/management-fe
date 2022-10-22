import AxiosInstance from '@/service/AxiosInstance'

export default class ProductService {
  create = formData => AxiosInstance.post('/products', formData)
    .then(response => response.data)
    .catch(error => error.response)

  update = formData => AxiosInstance.put(`/products/${formData.id}`, formData)
    .then(response => response.data)
    .catch(error => error.response)

  delete = data => AxiosInstance.delete(`/products/${data.id}`)
    .then(response => response.data)
    .catch(error => error.response)

  get = id => AxiosInstance.get(`/products/${id}`)
    .then(response => response.data)
    .catch(error => error.response)

  list = () => AxiosInstance.get('/products')
    .then(response => response.data)
    .catch(error => error.response)
}
