import AxiosInstance from '@/service/AxiosInstance'

export default class ReportService {
  getReleaseOrder = id => AxiosInstance.get(`/customers/${id}/ledger-report`)
    .then(response => response.data)
    .catch(error => error.response)

  getStockcard = (id, fromDate, toDate, unit) => {
    let url = `/products/${id}/stockcard-report?`

    if (fromDate) {
      url = `${url}from_date=${fromDate}&to_date=${toDate}&`
    }

    if (unit) {
      url = `${url}unit=${unit}&`
    }

    return AxiosInstance.get(url)
      .then(response => response.data)
      .catch(error => error.response)
  }

  getCustomerAging = () => AxiosInstance.get('/customers/aging')
    .then(response => response.data)
    .catch(error => error.response)

  getCustomerAgingItems = id => AxiosInstance.get(`/customers/aging-transaction/${id}`)
    .then(response => response.data)
    .catch(error => error.response)
}
