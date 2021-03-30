import React, { useEffect, useState } from 'react'
import Map from './Map'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import jwt_decode from 'jwt-decode'
import axios from 'axios'
import setAuthauthToken from './util/setAuthToken'
import Profile from './components/Profile'
import Users from './components/Users'
const App = () => {
    useEffect(() => {
        if (localStorage.authToken) {
            // Set auth authToken header auth
            setAuthauthToken(localStorage.authToken);
            // Decode authToken and get user info and exp
            const decoded = jwt_decode(localStorage.authToken);
        }
    }, [])
    return (
        <div>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/profile" component={Profile} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/sign-up" component={Register} />
                    <Route exact path="/users" component={Users} />
                    <Route exact path="/" component={Map} />
                </Switch>
            </BrowserRouter>
        </div>
    )
}

export default App
