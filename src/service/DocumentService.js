import AxiosInstance from '@/service/AxiosInstance'

export default class DocumentService {
  create = formData => AxiosInstance.post('/documents', formData)
    .then(response => response.data)
    .catch(error => error.response)

  update = formData => AxiosInstance.put(`/documents/${formData.id}`, formData)
    .then(response => response.data)
    .catch(error => error.response)

  delete = document => AxiosInstance.delete(`/documents/${document.id}`)
    .then(response => response.data)
    .catch(error => error.response)

  get = id => AxiosInstance.get(`/documents/${id}`)
    .then(response => response.data)
    .catch(error => error.response)

  list = () => AxiosInstance.get('/documents')
    .then(response => response.data)
    .catch(error => error.response)
}
