import React from 'react';
import { remove } from 'api';
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  IconButton,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import PropTypes from 'prop-types';
import CashBackAmount from './CashBackAmount';

const ResellerList = ({ data, setSelected, setOpenDialog, handleFetchData }) => {
  const handleRemove = (item) => {
    remove('resellers', item.id)
      .then(() => {
        handleFetchData();
      });
  };

  const handleEdit = (item) => {
    setSelected(item);
    setOpenDialog(true);
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Nome</TableCell>
            <TableCell>E-mail</TableCell>
            <TableCell>CPF</TableCell>
            <TableCell>Valor cashback acumulado</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.email}</TableCell>
              <TableCell>{item.cpf}</TableCell>
              <TableCell>
                <CashBackAmount cpf={item.cpf} />
              </TableCell>
              <TableCell>
                <IconButton
                  onClick={() => handleEdit(item)}
                  style={{ padding: 4.5, marginRight: 8 }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  onClick={() => handleRemove(item)}
                  style={{ padding: 4.5 }}
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

ResellerList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  setSelected: PropTypes.func,
  setOpenDialog: PropTypes.func,
  handleFetchData: PropTypes.func,
};

export default ResellerList;
