import React, { useEffect } from "react";
import Login from "../Login/Login";
import Navbar from "../Navbar/Navbar";
import Register from "../Register/Register";
import { Route, Redirect, Switch } from 'react-router-dom';
import HomeContainer from "../Home/HomeContainer";
import { authenticate } from "../../redux/action-creators/user"
import { useDispatch } from "react-redux";
import "./Main.scss"

export default () => {
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(authenticate())
  })

  return (
      <div id="main">
          <Navbar/>
          <Switch>
            <Route exact path="/" component={HomeContainer}/>
            <Route path="/register" component={Register}/>
            <Route path="/login" component={Login}/>
            <Redirect from="/" to="/"/>
          </Switch>
      </div>
    );
  };