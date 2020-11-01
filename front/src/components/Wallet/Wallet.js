import React, { useState } from "react"
import ChargeModal from "../Modal/ChargeModal"
import MovementsModal from "../Modal/MovementsModal"
import PayModal from "../Modal/PayModal"
import ValueModal from "../Modal/ValueModal"
import "./Wallet.scss"

export default () => {
    const [modal, setModal] = useState("")
    return (
        <div className="wallet">
            <div className="container container-wallet">
                <h2>Bienvenido, Bautista</h2>
                <h3>Opciones</h3>
                <div className="wallet-options">
                    <div><span onClick={()=>setModal("charge")}><img src="/images/ingresar.png"/></span> Ingresar dinero</div>
                    <div><span onClick={()=>setModal("value")}><img src="/images/consultar.png"/></span> Consultar Saldo</div>
                    <div><span onClick={()=>setModal("pay")}><img src="/images/pagar.png"/></span> Realizar Pago</div>
                    <div><span onClick={()=>setModal("movement")}><img src="/images/movimientos.png"/></span> Movimientos</div>
                </div>
            </div>
            <ChargeModal modal={modal} setModal={setModal}/>
            <ValueModal modal={modal} setModal={setModal}/>
            <PayModal modal={modal} setModal={setModal}/>
            <MovementsModal modal={modal} setModal={setModal}/>
        </div>
    )
}