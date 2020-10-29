import React from "react"
import { useSelector } from "react-redux"
import Wallet from "../Wallet/Wallet"
import Home from "./Home"

export default () => {

    const user = useSelector(store => store.user.user)

    return (
        <>
        {user._id ? <Wallet/> : <Home/>}
        </>
    )
}