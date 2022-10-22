import AxiosInstance from '@/service/AxiosInstance'

export default class FinishProductService {
  addUnit = formData => AxiosInstance.post(`/finish-products/${formData.id}/unit-packing`, formData)
    .then(response => response.data)
    .catch(error => error.response)

  removeUnit = formData => AxiosInstance.put(`/finish-products/${formData.id}/unit-packing`, formData)
    .then(response => response.data)
    .catch(error => error.response)

  create = formData => AxiosInstance.post('/finish-products', formData)
    .then(response => response.data)
    .catch(error => error.response)

  update = formData => AxiosInstance.put(`/finish-products/${formData.id}`, formData)
    .then(response => response.data)
    .catch(error => error.response)

  delete = account => AxiosInstance.delete(`/finish-products/${account.id}`)
    .then(response => response.data)
    .catch(error => error.response)

  get = id => AxiosInstance.get(`/finish-products/${id}`)
    .then(response => response.data)
    .catch(error => error.response)

  list = () => AxiosInstance.get('/finish-products')
    .then(response => response.data)
    .catch(error => error.response)
}
