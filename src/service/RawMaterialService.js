import AxiosInstance from '@/service/AxiosInstance'

export default class RawMaterialService {
    addUnit = formData => AxiosInstance.post(`/raw-materials/${formData.id}/unit-packing`, formData)
        .then(response => response.data)
        .catch(error => error.response)

    removeUnit = formData => AxiosInstance.put(`/raw-materials/${formData.id}/unit-packing`, formData)
        .then(response => response.data)
        .catch(error => error.response)

    create = formData => AxiosInstance.post('/raw-materials', formData)
        .then(response => response.data)
        .catch(error => error.response)

    update = formData => AxiosInstance.put(`/raw-materials/${formData.id}`, formData)
        .then(response => response.data)
        .catch(error => error.response)

    delete = account => AxiosInstance.delete(`/raw-materials/${account.id}`)
        .then(response => response.data)
        .catch(error => error.response)

    get = id => AxiosInstance.get(`/raw-materials/${id}`)
        .then(response => response.data)
        .catch(error => error.response)

    list = () => AxiosInstance.get('/raw-materials')
        .then(response => response.data)
        .catch(error => error.response)
}
