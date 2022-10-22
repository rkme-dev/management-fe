import AxiosInstance from '@/service/AxiosInstance'

export default class LocationService {
  create = formData => AxiosInstance.post('/locations', formData)
    .then(response => response.data)
    .catch(error => error.response)

  update = formData => AxiosInstance.put(`/locations/${formData.id}`, formData)
    .then(response => response.data)
    .catch(error => error.response)

  delete = formData => AxiosInstance.delete(`/locations/${formData.id}`)
    .then(response => response.data)
    .catch(error => error.response)

  get = id => AxiosInstance.get(`/locations/${id}`)
    .then(response => response.data)
    .catch(error => error.response)

  list = () => AxiosInstance.get('/locations')
    .then(response => response.data)
    .catch(error => error.response)
}
