import AxiosInstance from '@/service/AxiosInstance'

export default class TermService {
  create = formData => AxiosInstance.post('/terms', formData)
    .then(response => response.data)
    .catch(error => error.response)

  update = formData => AxiosInstance.put(`/terms/${formData.id}`, formData)
    .then(response => response.data)
    .catch(error => error.response)

  delete = id => AxiosInstance.delete(`/terms/${id}`)
    .then(response => response.data)
    .catch(error => error.response)

  get = id => AxiosInstance.get(`/terms/${id}`)
    .then(response => response.data)
    .catch(error => error.response)

  list = () => AxiosInstance.get('/terms')
    .then(response => response.data)
    .catch(error => error.response)
}
