import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useGlobalContext } from '../context/appContext';
import { capitalize } from '@mui/material';
export default function BasicTable({ list, country }) {
  return (
    <TableContainer component={Paper} sx={{ width: '90%', padding: 1 }}>
      <Table sx={{ minWidth: 600 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell component='th' scope='row' sx={{ fontWeight: 600 }}>
              School
            </TableCell>
            <TableCell align='right' sx={{ fontWeight: 600 }}>
              Region
            </TableCell>
            <TableCell align='right' sx={{ fontWeight: 600 }}>
              Math (%)
            </TableCell>
            <TableCell align='right' sx={{ fontWeight: 600 }}>
              Physics (%)
            </TableCell>
            <TableCell align='right' sx={{ fontWeight: 600 }}>
              Chemistry (%)
            </TableCell>
            <TableCell align='right' sx={{ fontWeight: 600 }}>
              Average (%)
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {list.map((row, index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component='th' scope='row'>
                {row.name}
              </TableCell>
              <TableCell align='right' sx={{ textTransform: 'capitalize' }}>
                {row.region}
              </TableCell>
              <TableCell align='right'>{row.math}</TableCell>
              <TableCell align='right'>{row.physics}</TableCell>
              <TableCell align='right'>{row.chemistry}</TableCell>
              <TableCell align='right'>{row.coverage}</TableCell>
            </TableRow>
          ))}
          <TableCell
            component='th'
            scope='row'
            sx={{ fontWeight: 600, textTransform: 'uppercase' }}
          >
            country average
          </TableCell>
          <TableCell align='right'></TableCell>
          <TableCell align='right'>{country[0]}</TableCell>
          <TableCell align='right'>{country[1]}</TableCell>
          <TableCell align='right'>{country[2]}</TableCell>
          <TableCell align='right'>{country[3]}</TableCell>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
