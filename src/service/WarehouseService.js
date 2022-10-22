import AxiosInstance from '@/service/AxiosInstance'

export default class WarehouseService {
  create = formData => AxiosInstance.post('/warehouses', formData)
    .then(response => response.data)
    .catch(error => error.response)

  update = formData => AxiosInstance.put(`/warehouses/${formData.id}`, formData)
    .then(response => response.data)
    .catch(error => error.response)

  delete = id => AxiosInstance.delete(`/warehouses/${id}`)
    .then(response => response.data)
    .catch(error => error.response)

  get = id => AxiosInstance.get(`/warehouses/${id}`)
    .then(response => response.data)
    .catch(error => error.response)

  getWarehouses = () => AxiosInstance.get('/warehouses')
    .then(response => response.data)
    .catch(error => error.response)
}
