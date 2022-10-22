import AxiosInstance from '@/service/AxiosInstance'

export default class TripTicketService {
  create = formData => AxiosInstance.post('/trip-tickets', formData)
    .then(response => response.data)
    .catch(error => error.response)

  update = formData => AxiosInstance.put(`/trip-tickets/${formData.id}`, formData)
    .then(response => response.data)
    .catch(error => error.response)

  delete = id => AxiosInstance.delete(`/trip-tickets/${id}`)
    .then(response => response.data)
    .catch(error => error.response)

  get = id => AxiosInstance.get(`/trip-tickets/${id}`)
    .then(response => response.data)
    .catch(error => error.response)

  list = () => AxiosInstance.get('/trip-tickets')
    .then(response => response.data)
    .catch(error => error.response)

  inTransit = formData => AxiosInstance.put(`/trip-tickets/${formData.id}/status`, {
    status: 'In Transit',
  })
    .then(response => response.data)
    .catch(error => error.response)

  delivered = formData => AxiosInstance.put(`/trip-tickets/${formData.id}/status`, {
    status: 'Delivered',
  })
    .then(response => response.data)
    .catch(error => error.response)

  drItemsUnlinked = () => AxiosInstance.get('/sales-drs/unlink-items')
}
