import AxiosInstance from '@/service/AxiosInstance'

export default class ReportService {
  getReleaseOrder = id => AxiosInstance.get(`/customers/${id}/ledger-report`)
    .then(response => response.data)
    .catch(error => error.response)
  getStockcard = id => AxiosInstance.get(`/products/${id}/stockcard-report`)
    .then(response => response.data)
    .catch(error => error.response)
  getCustomerAging = () => AxiosInstance.get('/customers/aging')
    .then(response => response.data)
    .catch(error => error.response)
  getCustomerAgingItems = id => AxiosInstance.get(`/customers/aging-transaction/${id}`)
    .then(response => response.data)
    .catch(error => error.response)
}
