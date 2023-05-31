import axios from 'axios'

const API_URL = 'http://localhost:8080'

class UsersService {
    retrieveAllUsers() {
        return axios.get(`${API_URL}/admin/users/all`);
    }

    registerSuccessfullLogin(email, password) {
        sessionStorage.setItem('authenticatedUser', email)
        this.setupAxiosInterceptors(this.createBasicAuthToken(email, password))
    }

    // interception des requetes pour y ajouter le basic token
    setupAxiosInterceptors(token) {
        axios.interceptors.request.use(
            (config) => {
                if (this.isUserLoggedIn()) {
                    config.headers.authorization = token
                    return config
                }
            }
        )
    }

    isUserLoggedIn() {
        let user = sessionStorage.getItem('authenticatedUser')
        if (user === null) return false
        return true
    }

    // nom du endpoint a modifier
    deleteUser(email){
        console.log('delete')
        return axios.delete(`${API_URL}/admin/user/${email}`)
    }

    retrieveUser(email) {
        return axios.get(`${API_URL}/user/get/${email}`)
    }

    // nom du endpoint a modifier
    updateUser(email, user) {
        return axios.put(`${API_URL}/user/${email}`, user)
    }

    executeBasicAuth(email, password) {
        return axios.get(`${API_URL}/user/basicauth`,
        { headers: { authorization: this.createBasicAuthToken(email, password) } })
    }

    createBasicAuthToken(email, password) {
        return 'Basic ' + window.btoa(email + ":" + password)
    }

}

export default new UsersService()