import AxiosInstance from '@/service/AxiosInstance'

export default class PhysicalCountService {
  create = formData => AxiosInstance.post('/physical-counts', formData)
    .then(response => response.data)
    .catch(error => error.response)

  update = formData => AxiosInstance.put(`/physical-counts/${formData.id}`, formData)
    .then(response => response.data)
    .catch(error => error.response)

  postCount = id => AxiosInstance.put(`/physical-counts/${id}/post`)
    .then(response => response.data)
    .catch(error => error.response)

  unpostCount = id => AxiosInstance.put(`/physical-counts/${id}/unpost`)
    .then(response => response.data)
    .catch(error => error.response)

  delete = data => AxiosInstance.delete(`/physical-counts/${data.id}`)
    .then(response => response.data)
    .catch(error => error.response)

  get = id => AxiosInstance.get(`/physical-counts/${id}`)
    .then(response => response.data)
    .catch(error => error.response)

  list = () => AxiosInstance.get('/physical-counts')
    .then(response => response.data)
    .catch(error => error.response)
}
