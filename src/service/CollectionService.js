import AxiosInstance from '@/service/AxiosInstance'

export default class CollectionService {
  create = formData => AxiosInstance.post('/collections', formData)
    .then(response => response.data)
    .catch(error => error.response)

  postOrder = id => AxiosInstance.put(`/collections/${id}/post`)
    .then(response => response.data)
    .catch(error => error.response)

  unpostOrder = id => AxiosInstance.put(`/collections/${id}/unpost`)
    .then(response => response.data)
    .catch(error => error.response)

  update = formData => AxiosInstance.put(`/collections/${formData.id}`, formData)
    .then(response => response.data)
    .catch(error => error.response)

  delete = data => AxiosInstance.delete(`/collections/${data.id}`)
    .then(response => response.data)
    .catch(error => error.response)

  get = id => AxiosInstance.get(`/collections/${id}`)
    .then(response => response.data)
    .catch(error => error.response)

  list = () => AxiosInstance.get('/collections')
    .then(response => response.data)
    .catch(error => error.response)

  orderItems = customerId => AxiosInstance.get(`customers/${customerId}/collections-items`)
    .then(response => response.data)
    .catch(error => error.response)
}
