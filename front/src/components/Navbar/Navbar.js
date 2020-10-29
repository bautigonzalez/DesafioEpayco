import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import {sendLogout} from "../../redux/action-creators/user"
import "./Navbar.scss"

export default () => {
    const dispatch = useDispatch()
    const user = useSelector(store => store.user.user)

    return (
        <div className="navbar">
            <div className="container container-navbar">
                <Link to="/"><img src="/images/logo-navbar.png" alt="ePayco" /></Link>
                {user._id ? <span className="logout" onClick={()=>dispatch(sendLogout())}>Cerrar sesión</span> : <Link to="/login"><span>Iniciar sesión</span></Link>}
            </div>
        </div>
    )
}