import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import '../../../styles/adminListUser.css';
import apiClient from '../../data/api';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(id, name, calories, fat, carbs, protein) {
  return {
    id, name, calories, fat, carbs, protein,
  };
}

const rows = [
  createData(1, 'Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData(2, 'Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData(3, 'Eclair', 262, 16.0, 24, 6.0),
  createData(4, 'Cupcake', 305, 3.7, 67, 4.3),
  createData(5, 'Gingerbread', 356, 16.0, 49, 3.9),
];

function AdminListUser() {
  const classes = useStyles();
  const [userData, setuserData] = useState([]);

  useEffect(() => {
    apiClient.get('/sanctum/csrf-cookie').then(() => {
      apiClient.get('/api/users').then((res) => {
        console.log(res.data);
        setuserData(res.data);
      });
    });
  }, []);
  return (
    <section id="adminListUser">
      <div className="list-user-section-container">
        <h2 className="list-user-section-title">List User</h2>
        <div className="list-table-container">
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell align="right">Email</TableCell>
                  <TableCell align="right">Phone</TableCell>
                  <TableCell align="right">Gender</TableCell>
                  <TableCell align="right">Address</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {userData.map((data) => (
                  <TableRow key={data.user_id}>
                    <TableCell component="th" scope="row">
                      {data.user_id}
                    </TableCell>
                    <TableCell>{data.name}</TableCell>
                    <TableCell align="right">{data.email}</TableCell>
                    <TableCell align="right">{data.phone_number}</TableCell>
                    <TableCell align="right">{data.gender}</TableCell>
                    <TableCell align="right">{data.address}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </section>
  );
}

export default AdminListUser;
