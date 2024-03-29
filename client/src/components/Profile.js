import { Card, CardContent } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import jwt_decode from 'jwt-decode'
import StripeCheckout from 'react-stripe-checkout'

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
                        <div className="mt-5 mb-4 text-center" >
                            <p className="text-center "><b>Update  to Premium with 10$</b></p>
                            <StripeCheckout
                                name="Update  to Premium "
                                stripeKey="pk_test_51HdU2dHxj0rMmtf8ChWyFNG28r7nz3YtfdHmRhlIyqD0l8ewGbd8ZofZIK1k6frebfUmH4TiFzvyMGvc5E4NvwEf00taBYIxya"
                                amount="10000"
                            >
                            </StripeCheckout>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default Profile
