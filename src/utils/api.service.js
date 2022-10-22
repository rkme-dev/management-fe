import AxiosInstance from '@/service/AxiosInstance'

const ApiService = {
  query(resource, params) {
    return AxiosInstance.get(resource, params).catch(error => {
      throw new Error(`[ENCO] ApiService ${error}`)
    })
  },

  get(resource, slug = '') {
    const url = slug === '' ? `${resource}` : `${resource}/${slug}`

    return AxiosInstance.get(url)
      .catch(error => {
        throw new Error(`[ENCO] ApiService ${error}`)
      })
  },

  async post(resource, params) {
    return AxiosInstance.post(`${resource}`, params)
  },

  async update(resource, slug, params) {
    return AxiosInstance.put(`${resource}/${slug}`, params)
  },

  put(resource, params) {
    return AxiosInstance.put(`${resource}`, params)
  },

  async delete(resource, slug) {
    return AxiosInstance.delete(`${resource}/${slug}`).catch(error => {
      throw new Error(`[ENCO] ApiService ${error}`)
    })
  },
}

export default ApiService
