import React, { useState } from "react"
import Modal from 'react-modal';
import { useSelector } from "react-redux"
import axios from "axios"
import ResultModal from "./ResultModal";
import "./Modal.scss"

export default ({modal , setModal}) => {
    const [document, setDocument] = useState("")
    const [phone, setPhone] = useState("")

    const [status, setStatus] = useState(0)
    const [value, setValue] = useState(0)

    const user = useSelector(store => store.user.user)

    const sendCharge = (e) => {
        e.preventDefault()
        if(document == user.document && phone == user.phone){ 
            axios.post("/api/value", {walletId: user.wallet})
            .then((res)=>{
                setValue(res.data.value)
                setStatus(res.status)
            })
            .catch((e)=>setStatus(400))
        }
    }

    const restart = () =>{
        setModal("")
        setPhone("")
        setDocument("")
        setStatus(0)
    }

    return(
        <Modal
        isOpen={modal == "value"}
        className={status == 0 ? "value-modal" : "result-modal"}
        overlayClassName="Overlay"
        onRequestClose={()=>setModal("")}
        >
            <div className="close"><img onClick={()=>setModal("")} src="/images/close.png" /></div>
            { status == 0 ?
            <div className="modal-container">
                <h4>Consultar Saldo Propio</h4>
                <form onSubmit={sendCharge}>
                    <div className="div-input">
                        <label>Documento</label>
                        <input type="text" value={document} onChange={(e)=> setDocument(e.target.value)} />
                    </div>
                    <div className="div-input">
                        <label>Teléfono</label>
                        <input type="text" value={phone} onChange={(e)=> setPhone(e.target.value)} />
                    </div>
                    <div className="btn-submit">
                        <button type="submit">Enviar</button>
                    </div>   
                </form>               
            </div> : null}
            {status == 200 ? 
            <ResultModal restart={restart} result={`Su saldo es ${value}`} success={true} /> : null}
            {status == 400 ? 
            <ResultModal restart={restart} result={"No se pudo realizar la consulta"} success={false} /> : null}
        </Modal>
    )
}