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
    const [invalid, setInvalid] = useState(false)
    const [movements, setMovements] = useState([])

    const user = useSelector(store => store.user.user)

    const viewMovements = (e) => {
        e.preventDefault()
        if(document == user.document && phone == user.phone){ 
            axios.post("/api/movements", {user: user._id})
            .then((res)=>{
                setInvalid(false)
                setMovements(res.data)
                setStatus(res.status)
            })
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
        setInvalid(false)
        setStatus(0)
    }

    return(
        <Modal
        isOpen={modal == "movement"}
        className={status == 0 ? "value-modal" : "movement-modal"}
        overlayClassName="Overlay"
        onRequestClose={()=>setModal("")}
        >
            <div className="close"><img onClick={()=>restart()} src="/images/close.png" /></div>
            { status == 0 ?
            <div className="modal-container">
                <h4>Consultar movimientos</h4>
                <form onSubmit={viewMovements}>
                    <div className="div-input">
                        <label>Documento</label>
                        <input type="text" value={document} onChange={(e)=> setDocument(e.target.value)} />
                    </div>
                    <div className="div-input">
                        <label>Teléfono</label>
                        <input type="text" value={phone} onChange={(e)=> setPhone(e.target.value)} />
                    </div> 
                    {invalid? <p className="invalid">Datos invalidos</p> : null}
                    <div className="btn-submit">
                        <button type="submit">Consultar</button>
                    </div>   
                </form>               
            </div> : null}
            {status == 200 ? 
            <div>
                <h4>Movimientos</h4>
                {movements.length ? 
                    movements.map((movement, index) => (
                    <div className="movement" key={index}>
                        <span>Nro {movement._id}</span>
                        <span style={movement.to == user._id ? {color: "green"}: {color: "red"}}>
                            {movement.isCharge ? "Recarga" : movement.to == user._id ? "Ingreso" : "Pago"}
                        </span>
                        <span>${movement.value}</span></div>
                    ))
                    : <p>No hay movimientos</p>
                }
            </div> : null}
            {status == 400 ? 
            <ResultModal restart={restart} result={"Error"} success={false} /> : null}
        </Modal>
    )
}