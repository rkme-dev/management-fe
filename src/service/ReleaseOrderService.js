import AxiosInstance from '@/service/AxiosInstance'

export default class ReleaseOrderService {
  createReleaseOrder = releaseOrder => AxiosInstance.post('/raw-materials/release-orders', releaseOrder)
    .then(response => response.data)
    .catch(error => error.response)

  getReleaseOrders = () => AxiosInstance.get('/raw-materials/release-orders')
    .then(response => response.data)
    .catch(error => error.response)

  getRawMaterials = () => AxiosInstance.get('/raw-materials')
    .then(response => response.data)
    .catch(error => error.response)

  getReleaseOrder = id => AxiosInstance.get(`/raw-materials/release-orders/${id}`)
    .then(response => response.data)
    .catch(error => error.response)

  updateRelease = releaseOrder => AxiosInstance.put(`raw-materials/release-orders/${releaseOrder.id}`, releaseOrder)
    .then(response => response.data)
    .catch(error => error.response)
}
