import AxiosInstance from '@/service/AxiosInstance'

export default class StockRequestService {
    createBottleFilling = formData => AxiosInstance.post('/stock-requests/bottle-filling', formData)
      .then(response => response.data)
      .catch(error => error.response)

    createBottleBlowing = formData => AxiosInstance.post('/stock-requests/bottle-blowing', formData)
      .then(response => response.data)
      .catch(error => error.response)

    postOrder = id => AxiosInstance.put(`/stock-requests/${id}/post`)
      .then(response => response.data)
      .catch(error => error.response)

    unpostOrder = id => AxiosInstance.put(`/stock-requests/${id}/unpost`)
      .then(response => response.data)
      .catch(error => error.response)

    update = formData => AxiosInstance.put(`/stock-requests/${formData.id}`, formData)
      .then(response => response.data)
      .catch(error => error.response)

    delete = data => AxiosInstance.delete(`/stock-requests/${data.id}`)
      .then(response => response.data)
      .catch(error => error.response)

    get = id => AxiosInstance.get(`/stock-requests/${id}`)
      .then(response => response.data)
      .catch(error => error.response)

    list = (todayOnly = false) => AxiosInstance.get(`/stock-requests?today_only=${todayOnly}`)
      .then(response => response.data)
      .catch(error => error.response)
}
