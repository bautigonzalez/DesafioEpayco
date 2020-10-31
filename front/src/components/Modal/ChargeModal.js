import React, { useState } from "react"
import Modal from 'react-modal';
import { useSelector } from "react-redux"
import axios from "axios"
import ResultModal from "./ResultModal";
import "./Modal.scss"

export default ({modal , setModal}) => {
    const [charge, setCharge] = useState("")
    const [document, setDocument] = useState("")
    const [phone, setPhone] = useState("")

    const [status, setStatus] = useState(0)

    const user = useSelector(store => store.user.user)

    const sendCharge = (e) => {
        e.preventDefault()
        if(document == user.document && phone == user.phone){ 
            axios.put("/api/charge", {walletId: user.wallet, charge})
            .then((res)=>setStatus(res.status))
            .catch((e)=>setStatus(400))
        }
    }

    const restart = () =>{
        setModal("")
        setPhone("")
        setDocument("")
        setCharge("")
        setStatus(0)
    }

    return(
        <Modal
        isOpen={modal == "charge"}
        className={status == 0 ? "charge-modal" : "result-modal"}
        overlayClassName="Overlay"
        onRequestClose={()=>setModal("")}
        >
            <div className="close"><img onClick={()=>setModal("")} src="/images/close.png" /></div>
            { status == 0 ?
            <div className="modal-container">
                <h4>Ingresar Dinero</h4>
                <form onSubmit={sendCharge}>
                    <div className="div-input">
                        <label>Documento</label>
                        <input type="text" value={document} onChange={(e)=> setDocument(e.target.value)} />
                    </div>
                    <div className="div-input">
                        <label>Teléfono</label>
                        <input type="text" value={phone} onChange={(e)=> setPhone(e.target.value)} />
                    </div> 
                    <div className="div-input">
                        <label>Monto a cargar</label>
                        <input type="text" value={charge} onChange={(e)=> setCharge(e.target.value)} />
                    </div>
                    <div className="btn-submit">
                        <button type="submit">Enviar</button>
                    </div>   
                </form>               
            </div> : null}
            {status == 201 ? 
            <ResultModal restart={restart} result={`Su recarga fue exitosa!`} success={true} /> : null}
            {status == 400 ? 
            <ResultModal restart={restart} result={"No se realizo la recarga"} success={false} /> : null}
        </Modal>
    )
}