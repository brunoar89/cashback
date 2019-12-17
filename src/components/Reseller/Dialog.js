import React, { useState, useEffect } from 'react';
import { create, update } from 'api';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from '@material-ui/core';
import PropTypes from 'prop-types';

const ResellerDialog = ({ open, handleFetchData, handleClose, selected }) => {
  const [data, setData] = useState({});

  useEffect(() => {
    setData({ ...selected });
  }, [selected]);

  const handleSubmit = () => {
    if (!data.id) {
      create('resellers', data)
        .then(() => {
          handleClose(false);
          handleFetchData();
        });
    } else {
      update('resellers', data.id, data)
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
    if (!data.name) return false;
    if (!data.email) return false;
    if (!data.cpf) return false;
    if (!data.id && !data.password && !data.confirmPassword) return false;
    if (!data.id && data.password !== data.confirmPassword) return false;
    return true;
  };

  return (
    <Dialog
      open={open}
      onClose={() => handleClose(false)}
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle>{data.id ? 'Editar' : 'Novo'} revendedor</DialogTitle>
      <DialogContent>
        <form autoComplete="off">
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                name="name"
                label="Nome"
                variant="outlined"
                fullWidth
                value={data.name}
                onChange={(e) => handleChange('name', e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="email"
                label="E-mail"
                variant="outlined"
                autoComplete="none"
                fullWidth
                value={data.email}
                onChange={(e) => handleChange('email', e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="cpf"
                label="CPF"
                variant="outlined"
                fullWidth
                value={data.cpf}
                onChange={(e) => handleChange('cpf', e.target.value)}
              />
            </Grid>
            {!data.id && (
              <>
                <Grid item xs={12}>
                  <TextField
                    name="password"
                    label="Senha"
                    type="password"
                    variant="outlined"
                    autoComplete="new-password"
                    fullWidth
                    value={data.password}
                    onChange={(e) => handleChange('password', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="confirmPassword"
                    label="Repetir senha"
                    type="password"
                    variant="outlined"
                    fullWidth
                    value={data.confirmPassword}
                    onChange={(e) => handleChange('confirmPassword', e.target.value)}
                  />
                </Grid>
              </>
            )}
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

ResellerDialog.propTypes = {
  open: PropTypes.bool,
  handleFetchData: PropTypes.func,
  handleClose: PropTypes.func,
  selected: PropTypes.object,
};

export default ResellerDialog;
