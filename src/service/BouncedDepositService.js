import AxiosInstance from '@/service/AxiosInstance'

export default class BouncedDepositService {
    create = formData => AxiosInstance.post('/bounced-deposits', formData)
        .then(response => response.data)
        .catch(error => error.response)

    postOrder = id => AxiosInstance.put(`/bounced-deposits/${id}/post`)
        .then(response => response.data)
        .catch(error => error.response)

    unpostOrder = id => AxiosInstance.put(`/bounced-deposits/${id}/unpost`)
        .then(response => response.data)
        .catch(error => error.response)

    update = formData => AxiosInstance.put(`/bounced-deposits/${formData.id}`, formData)
        .then(response => response.data)
        .catch(error => error.response)

    delete = data => AxiosInstance.delete(`/bounced-deposits/${data.id}`)
        .then(response => response.data)
        .catch(error => error.response)

    get = id => AxiosInstance.get(`/bounced-deposits/${id}`)
        .then(response => response.data)
        .catch(error => error.response)

    list = () => AxiosInstance.get('/bounced-deposits')
        .then(response => response.data)
        .catch(error => error.response)

    checks = (id = null) => {
        let url = '/deposit-check-payments'

        if (id) {
            url = url + '?id=' + id
        }

        return AxiosInstance.get(url)
            .then(response => response.data)
            .catch(error => error.response)
    }
}
