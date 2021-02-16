import { Card, CardContent } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import jwt_decode from 'jwt-decode'
const Profile = () => {
    const [user, setUser] = useState({})
    useEffect(() => {
        if (localStorage.authToken) {
            // Decode authToken and get user info and exp
            const decoded = jwt_decode(localStorage.authToken);
            setUser(decoded)
        }
    }, [])
    return (
        <div>
            <div className="col-md-4 offset-md-4">
                <Card>
                    <CardContent>
                        <h2 className="text-center alert alert-success">Profile</h2>
                        <h6> Name : <b> {user.name} </b> </h6>
                        <h6> Email : <b> {user.email} </b> </h6>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default Profile
