import React, { useState, useEffect } from 'react';
import { create, update } from 'api';
import { KeyboardDatePicker } from '@material-ui/pickers';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  MenuItem,
} from '@material-ui/core';
import moment from 'moment';
import PropTypes from 'prop-types';

const status = [
  { label: 'Em validação', value: 'em-validacao' },
  { label: 'Reprovado', value: 'reprovado' },
  { label: 'Aprovado', value: 'aprovado' },
];

const OrderDialog = ({ open, handleFetchData, handleClose, selected }) => {
  const [data, setData] = useState({ date: null });

  useEffect(() => {
    setData({ ...selected });
  }, [selected]);

  const handleSubmit = () => {
    if (!data.id) {
      create('orders', data)
        .then(() => {
          handleClose(false);
          handleFetchData();
        });
    } else {
      update('orders', data.id, data)
        .then(() => {
          handleClose(false);
          handleFetchData();
        });
    }
  };

  const handleChange = (field, value) => {
    setData({
      ...data,
      [field]: value,
    });
  };

  const validForm = () => {
    if (!data.code) return false;
    if (!data.amount) return false;
    if (!data.amount < 0) return false;
    if (!data.status) return false;
    if (!moment(data.date).isValid()) return false;
    return true;
  };

  return (
    <Dialog
      open={open}
      onClose={() => handleClose(false)}
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle>{data.id ? 'Editar' : 'Nova'} compra</DialogTitle>
      <DialogContent>
        <form autoComplete="off">
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                name="code"
                label="Código"
                variant="outlined"
                fullWidth
                value={data.code}
                onChange={(e) => handleChange('code', e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="amount"
                label="Valor"
                variant="outlined"
                autoComplete="none"
                fullWidth
                value={data.amount}
                onChange={(e) => handleChange('amount', e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                select
                name="status"
                label="Status"
                variant="outlined"
                autoComplete="none"
                fullWidth
                value={data.status}
                onChange={(e) => handleChange('status', e.target.value)}
              >
                {status.map((s) => (
                  <MenuItem value={s.value} key={s.value}>
                    {s.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <KeyboardDatePicker
                clearable
                label="Data"
                value={data.date}
                inputVariant="outlined"
                onChange={(date) => handleChange('date', date)}
                format="DD/MM/YYYY"
                fullWidth
              />
            </Grid>
          </Grid>
        </form>
      </DialogContent>
      <DialogActions style={{ padding: 24 }}>
        <Button
          onClick={() => handleClose(false)}
          color="primary"
          style={{ marginRight: 8 }}
        >
          Cancelar
        </Button>
        <Button
          onClick={handleSubmit}
          color="primary"
          variant="contained"
          disabled={!validForm()}
        >
          Enviar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

OrderDialog.propTypes = {
  open: PropTypes.bool,
  handleFetchData: PropTypes.func,
  handleClose: PropTypes.func,
  selected: PropTypes.object,
};

export default OrderDialog;
