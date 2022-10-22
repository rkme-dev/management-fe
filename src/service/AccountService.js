import AxiosInstance from '@/service/AxiosInstance'

export default class AccountService {
  create = formData => AxiosInstance.post('/accounts', formData)
    .then(response => response.data)
    .catch(error => error.response)

  update = formData => AxiosInstance.put(`/accounts/${formData.id}`, formData)
    .then(response => response.data)
    .catch(error => error.response)

  delete = account => AxiosInstance.delete(`/accounts/${account.id}`)
    .then(response => response.data)
    .catch(error => error.response)

  get = id => AxiosInstance.get(`/accounts/${id}`)
    .then(response => response.data)
    .catch(error => error.response)

  list = () => AxiosInstance.get('/accounts')
    .then(response => response.data)
    .catch(error => error.response)
}
