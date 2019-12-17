import React from 'react';
import { remove } from 'api';
import { numberToCurrency } from 'helpers/numberHelper';
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
import moment from 'moment';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import PropTypes from 'prop-types';

const OrderList = ({ data, setSelected, setOpenDialog, handleFetchData }) => {
  const handleRemove = (item) => {
    remove('orders', item.id)
      .then(() => {
        handleFetchData();
      });
  };

  const handleEdit = (item) => {
    setSelected(item);
    setOpenDialog(true);
  };

  const getCashBackAmount = (item) => item.amount * 0.05;

  const getStatusLabel = {
    'em-validacao': 'Em validação',
    reprovado: 'Reprovado',
    aprovado: 'Aprovado',
  } || '';

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Código</TableCell>
            <TableCell>Valor</TableCell>
            <TableCell>Data</TableCell>
            <TableCell>% Cashback</TableCell>
            <TableCell>Valor Cashback</TableCell>
            <TableCell>Status</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.code}</TableCell>
              <TableCell>{numberToCurrency(item.amount)}</TableCell>
              <TableCell>{moment(item.date).format('DD/MM/YYYY')}</TableCell>
              <TableCell>5%</TableCell>
              <TableCell>{numberToCurrency(getCashBackAmount(item))}</TableCell>
              <TableCell>{getStatusLabel[item.status]}</TableCell>
              <TableCell>
                <IconButton
                  onClick={() => handleEdit(item)}
                  disabled={item.status !== 'em-validacao'}
                  color={item.status !== 'em-validacao' ? 'disabled' : 'primary'}
                  style={{ padding: 4.5, marginRight: 8 }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  onClick={() => handleRemove(item)}
                  disabled={item.status !== 'em-validacao'}
                  style={{ padding: 4.5 }}
                >
                  <DeleteIcon color={item.status !== 'em-validacao' ? 'disabled' : 'error'} />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

OrderList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  setSelected: PropTypes.func,
  setOpenDialog: PropTypes.func,
  handleFetchData: PropTypes.func,
};

export default OrderList;
