import AxiosInstance from '@/service/AxiosInstance'

export default class UnitPackingService {
  create = formData => AxiosInstance.post('/unit-packing', formData)
    .then(response => response.data)
    .catch(error => error.response)

  update = formData => AxiosInstance.put(`/unit-packing/${formData.id}`, formData)
    .then(response => response.data)
    .catch(error => error.response)

  delete = id => AxiosInstance.delete(`/unit-packing/${id}`)
    .then(response => response.data)
    .catch(error => error.response)

  get = id => AxiosInstance.get(`/unit-packing/${id}`)
    .then(response => response.data)
    .catch(error => error.response)

  list = () => AxiosInstance.get('/unit-packing')
    .then(response => response.data)
    .catch(error => error.response)
}
