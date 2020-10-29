import React from "react"
import { Link } from "react-router-dom"
import "./Home.scss"

export default () => {
    return(
        <div className="home">
            <div className="container">
                <div className="div-img">
                    <img src="/images/logoepayco.png" />
                </div>
                <h2>Tu billetera virtual</h2>
                <div className="home-opciones">
                    <div>
                        <h4>¿Ya tienes tu billetera virtual ePayco?</h4>
                        <h5>Ingresa directamente a tu billetera</h5>
                        <div className="option-login">
                            <Link to="/login"><button>Accede a tu cuenta</button></Link>
                        </div>
                    </div>
                    <div>
                        <h4>¿Aún no tienes billetera virtual ePayco?</h4>
                        <h5>Crea tu billetera virtual totalmente grais</h5>
                        <div className="option-register">
                            <Link to="/register"><button>Crea tu cuenta</button></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}