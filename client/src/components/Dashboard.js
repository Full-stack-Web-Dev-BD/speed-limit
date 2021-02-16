import React, { useEffect, useState } from 'react'
import jwt_decode from 'jwt-decode';
import UserTable from './UserTable'
import axios from 'axios';
import setAuthToken from '../setAuthToken'
import { Button } from '@material-ui/core';

const Dashboard = () => {
    const [users, setUsers] = useState([])
    useEffect(() => {
        if (localStorage.token) {
            // Set auth token header auth
            setAuthToken(localStorage.token);
            // Decode token and get user info and exp
            const decoded = jwt_decode(localStorage.token);

            // Check for expired token
            const currentTime = Date.now() / 1000;
            if (decoded.exp < currentTime) {
                // Logout user
                window.localStorage.removeItem('token')
                // Redirect to login
                window.location.href = '/login';
            } else {
                axios.get('/api/user/all-user')
                    .then(response => {
                        setUsers(response.data)
                    })
            }
        } else {
            window.location.href = '/login';
        }
    }, [])
    return (
        <div className="container mt-5">
            <div className="col-md-10 offset-md-1">
                <h2 className="alert alert-info text-center">User management</h2>
                <Button onClick={e => { }} size="small" variant="contained" color="secondary"> Logout</Button>
                <div className="mt-5">
                    <UserTable users={users} />
                </div>

            </div>
        </div>
    )
}

export default Dashboard
