import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/action-creators/user"
import { Link } from "react-router-dom"
import { useHistory } from 'react-router-dom'
import "./Login.scss"

export default () => {
    const dispatch = useDispatch()
    const history = useHistory();

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
        .then(()=> history.push('/'))
        .catch((e)=>{if(e)setInvalid(true)})
    }

    return (
        <div className="login">
            <div className="container">
                <div className="div-login">
                    <h3>Iniciar sesión</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="div-input">
                            <label>Email</label>
                            <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
                        </div>
                        <div className="div-input">
                            <label>Contraseña</label>
                            <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
                        </div>
                        <div className="sin-cuenta"><Link to="/register">¿Aún no tienes tu cuenta? Registrate</Link></div>
                        <div className="btn-submit">
                            <button type="submit">Ingresar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}