import AxiosInstance from '@/service/AxiosInstance'

export default class TermService {
  create = formData => AxiosInstance.post('/vats', formData)
    .then(response => response.data)
    .catch(error => error.response)

  update = formData => AxiosInstance.put(`/vats/${formData.id}`, formData)
    .then(response => response.data)
    .catch(error => error.response)

  delete = id => AxiosInstance.delete(`/vats/${id}`)
    .then(response => response.data)
    .catch(error => error.response)

  get = id => AxiosInstance.get(`/vats/${id}`)
    .then(response => response.data)
    .catch(error => error.response)

  list = () => AxiosInstance.get('/vats')
    .then(response => response.data)
    .catch(error => error.response)
}
