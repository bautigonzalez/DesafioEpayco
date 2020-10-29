import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../redux/action-creators/user"
import { useHistory } from 'react-router-dom'
import "./Register.scss"

export default () => {
    const dispatch = useDispatch()

    const [name, setName] = useState("")
    const [lastname, setLastname] = useState("")
    const [document, setDocument] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [password, setPassword] = useState("")
    const [repeatPassword, setRepeatPassword] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        if(password === repeatPassword && password.length > 7) dispatch(register({name, lastname, document, email, phone, password}))
    }

    return (
        <div className="register">
            <div className="container">
                <div className="div-register">
                    <h3>Registrarse</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="div-input">
                            <label>Nombre</label>
                            <input type="text" value={name} onChange={(e)=>setName(e.target.value)} />
                        </div>
                        <div className="div-input">
                            <label>Apellido</label>
                            <input type="text" value={lastname} onChange={(e)=>setLastname(e.target.value)} />
                        </div>
                        <div className="div-input">
                            <label>Documento</label>
                            <input type="text" value={document} onChange={(e)=>setDocument(e.target.value)} />
                        </div>
                        <div className="div-input">
                            <label>Email</label>
                            <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
                        </div>
                        <div className="div-input">
                            <label>Teléfono</label>
                            <input type="text" value={phone} onChange={(e)=>setPhone(e.target.value)} />
                        </div>
                        <div className="div-input">
                            <label>Contraseña (Al menos 8 caracteres)</label>
                            <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
                        </div>
                        <div className="div-input">
                            <label>Repetir contraseña</label>
                            <input type="text" value={repeatPassword} onChange={(e)=>setRepeatPassword(e.target.value)} />
                        </div>
                        <div className="btn-submit">
                            <button type="submit">Enviar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}