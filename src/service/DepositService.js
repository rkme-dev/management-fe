import AxiosInstance from '@/service/AxiosInstance'

export default class DepositService {
    create = formData => AxiosInstance.post('/deposits', formData)
        .then(response => response.data)
        .catch(error => error.response)

    postOrder = id => AxiosInstance.put(`/deposits/${id}/post`)
        .then(response => response.data)
        .catch(error => error.response)

    unpostOrder = id => AxiosInstance.put(`/deposits/${id}/unpost`)
        .then(response => response.data)
        .catch(error => error.response)

    update = formData => AxiosInstance.put(`/deposits/${formData.id}`, formData)
        .then(response => response.data)
        .catch(error => error.response)

    delete = data => AxiosInstance.delete(`/deposits/${data.id}`)
        .then(response => response.data)
        .catch(error => error.response)

    get = id => AxiosInstance.get(`/deposits/${id}`)
        .then(response => response.data)
        .catch(error => error.response)

    list = () => AxiosInstance.get('/deposits')
        .then(response => response.data)
        .catch(error => error.response)

    checks = (id = null) => {
        let url = '/check-payments'

        if (id) {
            url = url + '?id=' + id
        }

        return AxiosInstance.get(url)
            .then(response => response.data)
            .catch(error => error.response)
    }
}
