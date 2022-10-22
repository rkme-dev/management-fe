import AxiosInstance from '@/service/AxiosInstance'

export default class CustomerService {
  create = formData => AxiosInstance.post('/customers', formData)
    .then(response => response.data)
    .catch(error => error.response)

  update = formData => AxiosInstance.put(`/customers/${formData.id}`, formData)
    .then(response => response.data)
    .catch(error => error.response)

  delete = data => AxiosInstance.delete(`/customers/${data.id}`)
    .then(response => response.data)
    .catch(error => error.response)

  get = id => AxiosInstance.get(`/customers/${id}`)
    .then(response => response.data)
    .catch(error => error.response)

  list = () => AxiosInstance.get('/customers')
    .then(response => response.data)
    .catch(error => error.response)
}
