import React from "react"

export default ({result, restart, success}) => {
    return (
    <div className="modal-container">
        <h4>{result}</h4>
        <div className="success-div-img">
            <img src={success ? "/images/success.png" : "/images/failure.png"} />
        </div>
        <div className="success-div">
            <button onClick={()=>restart()}>Aceptar</button>
        </div>
    </div>
    )
}