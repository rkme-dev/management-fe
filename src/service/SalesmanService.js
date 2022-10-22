import AxiosInstance from '@/service/AxiosInstance'

export default class SalesmanService {
  create = formData => AxiosInstance.post('/salesmans', formData)
    .then(response => response.data)
    .catch(error => error.response)

  update = formData => AxiosInstance.put(`/salesmans/${formData.id}`, formData)
    .then(response => response.data)
    .catch(error => error.response)

  delete = id => AxiosInstance.delete(`/salesmans/${id}`)
    .then(response => response.data)
    .catch(error => error.response)

  get = id => AxiosInstance.get(`/salesmans/${id}`)
    .then(response => response.data)
    .catch(error => error.response)

  list = () => AxiosInstance.get('/salesmans')
    .then(response => response.data)
    .catch(error => error.response)
}
