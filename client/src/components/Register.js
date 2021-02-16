import React, { useEffect, useState } from 'react'
import { Button, Card, CardActions, CardContent, CardHeader, Grid, Input } from '@material-ui/core'
import Axios from 'axios'
const Register = ({ history }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [error, setError] = useState({})
    useEffect(() => {

    }, [])
    const submithandler = (e) => {
        e.preventDefault()
        let obj = { email, password, name }
        Axios.post('http://localhost:5000/api/user/register', obj)
            .then((res) => {
                window.localStorage.setItem('token', res.data.token)
                window.location.href = '/login'
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err)
                if (err.response) return setError(err.response.data)
            })
    }
    return (
        <div>
            <div className="row pt-5 ">
                <div className="col-md-4 mt-5 offset-md-4">
                    <form onSubmit={(e) => submithandler(e)}>
                        <Card className="p-3">
                            <CardContent>
                                <h3 className="text-center alert alert-success">Register here .</h3>
                                {
                                    error.message ?
                                        <p className="text-danger"> {error.message} </p> : ''
                                }

                                {
                                    error.email ?
                                        <p className="text-danger"> {error.email} </p> : ''
                                }
                                {
                                    error.password ?
                                        <p className="text-danger"> {error.password} </p> : ''
                                }
                                <Input required onChange={e => setName(e.target.value)} style={{ width: '100%' }} placeholder="Enter Name" type="text" />
                                <Input required onChange={e => setEmail(e.target.value)} style={{ width: '100%' }} placeholder="Enter email" type="email" />
                                <Input required onChange={e => setPassword(e.target.value)} style={{ width: '100%', marginTop: '10px' }} width="100%" placeholder="Enter password" type="password" />
                            </CardContent>
                            <CardActions>
                                <Button type="submit" variant="contained" color="primary">Register</Button>
                            </CardActions>
                            <p> Already registered ? <a href="/login">Login </a> </p>

                        </Card>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register
