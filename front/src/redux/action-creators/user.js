import axios from "axios"
import { LOGGED, LOGOUT } from '../constants';

const logged = (user) =>{
    return {
        type : LOGGED,
        user
    }
}

const logout = () =>{
    return {
        type : LOGOUT
    }
}

export const login = (email, password) => dispatch =>
    axios.post("/api/login", {email, password}).then(res=>dispatch(logged(res.data)))

export const register = (data) => dispatch =>
    axios.post("/api/register", data).then(res=>dispatch(logged(res.data)))

export const sendLogout = ()=> dispatch =>
    axios.get("/api/logout").then(()=>dispatch(logout()))
    
export const authenticate = () => (dispatch) =>
      axios.get(`/api/check`).then((res) => dispatch(logged(res.data)))
