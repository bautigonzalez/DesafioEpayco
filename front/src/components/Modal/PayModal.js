import React, { useState } from "react"
import Modal from 'react-modal';
import { useSelector } from "react-redux"
import axios from "axios"
import ResultModal from "./ResultModal";
import { v4 as uuidv4 } from 'uuid';
import "./Modal.scss"

export default ({modal , setModal}) => {
    const [charge, setCharge] = useState("")
    const [document, setDocument] = useState("")
    const [personDocument, setPersonDocument] = useState("")
    const [phone, setPhone] = useState("")

    const [status, setStatus] = useState(0)
    const [code, setCode] = useState("")
    const [inputCode, setInputCode] = useState("")
    const [invalid, setInvalid] = useState(false)

    const user = useSelector(store => store.user.user)

    const sendCode = (e) => {
        e.preventDefault()
        const id = uuidv4().substr(0,6)
        if(document == user.document && phone == user.phone){ 
            axios.post("/api/code", {code: id, email: user.email})
            .then((res)=>setStatus(res.status))
            .then(()=>setCode(id))
            .then(()=>setInvalid(false))
            .catch((e)=>setStatus(400))
        }
        else{
            setInvalid(true)
        }
    }

    const validateCode = (e) => {
        e.preventDefault()
        if(code === inputCode){
            axios.put("/api/pay", {walletId: user.wallet, charge, from: document, to: personDocument})
            .then((res)=>setStatus(res.status))
            .then(()=>setInvalid(false))
            .catch((e)=>setStatus(400))
        }
        else{
            setInvalid(true)
        }
    }

    const restart = () =>{
        setModal("")
        setPhone("")
        setDocument("")
        setPersonDocument("")
        setCharge("")
        setInputCode("")
        setCode("")
        setInvalid(false)
        setStatus(0)
    }

    return(
        <Modal
        isOpen={modal == "pay"}
        className={status == 0 ? "pay-modal" : "result-modal"}
        overlayClassName="Overlay"
        onRequestClose={()=>setModal("")}
        >
            <div className="close"><img onClick={()=>setModal("")} src="/images/close.png" /></div>
            { status == 0 ?
            <div className="modal-container">
                <h4>Ingresar Dinero</h4>
                <form onSubmit={sendCode}>
                    <div className="div-input">
                        <label>Documento propio</label>
                        <input type="text" value={document} onChange={(e)=> setDocument(e.target.value)} />
                    </div>
                    <div className="div-input">
                        <label>Teléfono</label>
                        <input type="text" value={phone} onChange={(e)=> setPhone(e.target.value)} />
                    </div> 
                    <div className="div-input">
                        <label>Documento de la persona a pagar</label>
                        <input type="text" value={personDocument} onChange={(e)=> setPersonDocument(e.target.value)} />
                    </div>
                    <div className="div-input">
                        <label>Monto a abonar</label>
                        <input type="text" value={charge} onChange={(e)=> setCharge(e.target.value)} />
                    </div>
                    {invalid? <p className="invalid">Datos invalidos</p> : null}
                    <div className="btn-submit">
                        <button type="submit">Enviar</button>
                    </div>   
                </form>               
            </div> : null}
            {status == 200 ? 
            <div className="security-code-container">
                <h4>Ingresa tu código de seguridad</h4>
                <form onSubmit={validateCode}>
                    <div className="security-code">
                        <input 
                        type="text" 
                        onChange={(e)=>e.target.value.length <= 6 ? setInputCode(e.target.value) : null} 
                        value={inputCode}
                        />
                    </div>
                    {invalid? <p className="invalid">Datos invalidos</p> : null}
                    <div className="btn-submit">
                        <button type="submit">Enviar</button>
                    </div>   
                </form>
            </div>
             : null}
            {status == 201 ? 
            <ResultModal restart={restart} result={`Su pago fue exitoso!`} success={true} /> : null}
            {status == 400 ? 
            <ResultModal restart={restart} result={"No se pudo realizar el pago"} success={false} /> : null}
        </Modal>
    )
}