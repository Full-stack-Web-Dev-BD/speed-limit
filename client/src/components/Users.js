import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import { Button } from '@material-ui/core';
import jwtDecode from 'jwt-decode'

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function Users() {
    const [users, setUsers] = useState([])
    const classes = useStyles();


    useEffect(() => {

        if (window.localStorage.getItem('authToken')) {
            let jwtToken = window.localStorage.getItem('authToken')
            let decoded = jwtDecode(jwtToken)
            if (decoded.user_role !== 'admin') {
                window.localStorage.removeItem('authToken')
                return window.location.href = '/'
            }
        }
        axios.get('http://localhost:5000/api/user/all-user')
            .then(res => {
                return setUsers(res.data)
            })
            .catch(err => console.log(err))
    }, [])
    const deleteUser = (id) => {
        axios.get(`http://localhost:5000/api/user/delete-user/${id}`)
            .then(res => {
                return window.location.reload()
            })
            .catch(err => console.log(err))
    }

    return (
        <div className="container">
            <h1 className="text-center alert alert-success mt-5 mb-2" >Users  Table</h1>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center"> User Name </TableCell>
                            <TableCell align="center"> Email </TableCell>
                            <TableCell align="center"> Role </TableCell>
                            <TableCell align="center"> Action </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((row) => (
                            <TableRow key={row.email}>
                                <TableCell align="center" style={{ textTransform: 'capitalize' }}>{row.name}</TableCell>
                                <TableCell align="center">{row.email}</TableCell>
                                <TableCell align="center" style={{ textTransform: 'capitalize' }}>{row.user_role}</TableCell>
                                <TableCell align="center" style={{ textTransform: 'capitalize' }}> <Button onClick={e => { deleteUser(row._id) }} variant="contained" color="danger" size="small">Delete</Button> </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
