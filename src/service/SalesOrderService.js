import AxiosInstance from '@/service/AxiosInstance'

export default class SalesOrderService {
  create = formData => AxiosInstance.post('/sales-orders', formData)
    .then(response => response.data)
    .catch(error => error.response)

  update = formData => AxiosInstance.put(`/sales-orders/${formData.id}`, formData)
    .then(response => response.data)
    .catch(error => error.response)

  postOrder = id => AxiosInstance.put(`/sales-orders/${id}/post`)
    .then(response => response.data)
    .catch(error => error.response)

  unpostOrder = id => AxiosInstance.put(`/sales-orders/${id}/unpost`)
    .then(response => response.data)
    .catch(error => error.response)

  delete = data => AxiosInstance.delete(`/sales-orders/${data.id}`)
    .then(response => response.data)
    .catch(error => error.response)

  get = id => AxiosInstance.get(`/sales-orders/${id}`)
    .then(response => response.data)
    .catch(error => error.response)

  list = () => AxiosInstance.get('/sales-orders')
    .then(response => response.data)
    .catch(error => error.response)

  orderItems = customerId => AxiosInstance.get(`customers/${customerId}/sales-orders-items`)
    .then(response => response.data)
    .catch(error => error.response)

  allOrderItems = () => AxiosInstance.get('sales-orders-items')
    .then(response => response.data)
    .catch(error => error.response)
}
