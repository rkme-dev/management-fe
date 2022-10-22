import AxiosInstance from '@/service/AxiosInstance'

export default class UserAccessManagementService {
  createAbility = ability => AxiosInstance.post('/abilities', ability)
    .then(response => response.data)
    .catch(error => error.response)

  createAccessLevel = ability => AxiosInstance.post('/access-levels', ability)
    .then(response => response.data)
    .catch(error => error.response)

  createDepartment = department => AxiosInstance.post('/departments', department)
    .then(response => response.data)
    .catch(error => error.response)

  createUser = user => AxiosInstance.post('/users', user)
    .then(response => response.data)
    .catch(error => error.response)

  createRole = role => AxiosInstance.post('/roles', role)
    .then(response => response.data)
    .catch(error => error.response)

  deleteAbility = ability => AxiosInstance.delete(`abilities/${ability.id}`, ability)
    .then(response => response.data)
    .catch(error => error.response)

  deleteAccessLevel = accessLevel => AxiosInstance.delete(`access-levels/${accessLevel.id}`, accessLevel)
    .then(response => response.data)
    .catch(error => error.response)

  deleteDepartment = department => AxiosInstance.delete(`departments/${department.id}`, department)
    .then(response => response.data)
    .catch(error => error.response)

  deleteRole = role => AxiosInstance.delete(`roles/${role.id}`, role)
    .then(response => response.data)
    .catch(error => error.response)

  getAbilities = orderByModule => AxiosInstance.get(`/abilities?order_by_module=${orderByModule}`)
    .then(response => response.data)
    .catch(error => error.response)

  getAccessLevels = () => AxiosInstance.get('/access-levels')
    .then(response => response.data)
    .catch(error => error.response)

  getDepartments = () => AxiosInstance.get('/departments')
    .then(response => response.data)
    .catch(error => error.response)

  getDepartmentAbilities = id => AxiosInstance.get(`/departments/${id}/abilities`)
    .then(response => response.data)
    .catch(error => error.response)

  getDepartmentRoles = id => AxiosInstance.get(`/departments/${id}/roles`)
    .then(response => response.data)
    .catch(error => error.response)

  getModules = () => AxiosInstance.get('/modules')
    .then(response => response.data)
    .catch(error => error.response)

  getRoles = () => AxiosInstance.get('/roles')
    .then(response => response.data)
    .catch(error => error.response)

  getUsers = () => AxiosInstance.get('/users')
    .then(response => response.data)
    .catch(error => error.response)

  getUser = userId => AxiosInstance.get(`/users/${userId}`)
    .then(response => response.data)
    .catch(error => error.response)

  logout = () => AxiosInstance.post('/logout')
    .then(response => response.data)
    .catch(error => error.response)

  updateAbility = ability => AxiosInstance.put(`abilities/${ability.id}`, ability)
    .then(response => response.data)
    .catch(error => error.response)

  updateAccessLevel = accessLevel => AxiosInstance.put(`access-levels/${accessLevel.id}`, accessLevel)
    .then(response => response.data)
    .catch(error => error.response)

  updateDepartment = department => AxiosInstance.put(`departments/${department.id}`, department)
    .then(response => response.data)
    .catch(error => error.response)

  updatePassword = user => AxiosInstance.put(`/users/${user.id}/update-password`, user)
    .then(response => response.data)
    .catch(error => error.response)

  uploadProfilePhoto = user => AxiosInstance.post(`/users/${user.get('id')}/upload-profile`, user)
    .then(response => response.data)
    .catch(error => error.response)

  updateRole = role => AxiosInstance.put(`roles/${role.id}`, role)
    .then(response => response.data)
    .catch(error => error.response)

  updateUser = user => AxiosInstance.put(`users/${user.id}`, user)
    .then(response => response.data)
    .catch(error => error.response)
}
