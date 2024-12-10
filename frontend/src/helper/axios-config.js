import axios from 'axios'
const sucesshandel=function(response){
    return response
}
const errorhandel=function(error){
    if(error.response.status==401){
        localStorage.removeItem('token')
       window.location='/login'
    }
    return Promise.reject(error)
}
axios.interceptors.response.use(sucesshandel, errorhandel)
export default axios