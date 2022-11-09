import AxiosInstance from '@/service/AxiosInstance'

export default class SalesDrService {
  create = formData => AxiosInstance.post('/sales-drs', formData)
    .then(response => response.data)
    .catch(error => error.response)

  postOrder = id => AxiosInstance.put(`/sales-drs/${id}/post`)
    .then(response => response.data)
    .catch(error => error.response)

  unpostOrder = id => AxiosInstance.put(`/sales-drs/${id}/unpost`)
    .then(response => response.data)
    .catch(error => error.response)

  update = formData => AxiosInstance.put(`/sales-drs/${formData.id}`, formData)
    .then(response => response.data)
    .catch(error => error.response)

  delete = data => AxiosInstance.delete(`/sales-drs/${data.id}`)
    .then(response => response.data)
    .catch(error => error.response)

  get = id => AxiosInstance.get(`/sales-drs/${id}`)
    .then(response => response.data)
    .catch(error => error.response)

  list = (todayOnly = false) => AxiosInstance.get('/sales-drs?today_only=' + todayOnly)
    .then(response => response.data)
    .catch(error => error.response)

  orderItems = customerId => AxiosInstance.get(`customers/${customerId}/sales-dr-items`)
    .then(response => response.data)
    .catch(error => error.response)

  drListByCustomer = customerId => AxiosInstance.get(`customers/${customerId}/sales-dr`)
    .then(response => response.data)
    .catch(error => error.response)

  areas = () => AxiosInstance.get('sales-drs/areas')
    .then(response => response.data)
    .catch(error => error.response)

  getUnlinkItems = (area, tripTicketId = null) => AxiosInstance.get(`${'sales-drs/unlink-items?area='}${area}&trip_ticket_id=${tripTicketId}`)
    .then(response => response.data)
    .catch(error => error.response)
}
