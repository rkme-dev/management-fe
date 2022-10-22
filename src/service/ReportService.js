import AxiosInstance from '@/service/AxiosInstance'

export default class ReportService {
  getReleaseOrder = id => AxiosInstance.get(`/customers/${id}/ledger-report`)
    .then(response => response.data)
    .catch(error => error.response)
}
