import React, { useState, useEffect } from 'react';
import { fetch } from 'api';
import {
  Box,
  Button,
  Typography,
  CircularProgress,
} from '@material-ui/core';
import Layout from 'components/Layout';
import OrderList from './List';
import Dialog from './Dialog';

const Order = () => {
  const [data, setData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selected, setSelected] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    function fetchData() {
      setLoading(true);
      fetch('orders')
        .then((res) => {
          setData(res);
          setLoading(false);
        });
    }
    fetchData();
  }, []);

  const handleFetchData = () => {
    setLoading(true);
    fetch('orders')
      .then((res) => {
        setData(res);
        setLoading(false);
      });
  };

  const handleAdd = () => {
    setSelected({});
    setOpenDialog(true);
  };

  return (
    <Layout>
      <Box display="flex" justifyContent="space-between" mb={3}>
        <Typography variant="h5">Compras</Typography>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => handleAdd()}
        >
          Adicionar
        </Button>
      </Box>
      {
        loading
          ? <CircularProgress color="primary" />
          : (
            <OrderList
              data={data}
              setSelected={setSelected}
              setOpenDialog={setOpenDialog}
              handleFetchData={handleFetchData}
            />
          )
      }
      <Dialog
        open={openDialog}
        handleFetchData={handleFetchData}
        handleClose={setOpenDialog}
        selected={selected}
        setSelected={setSelected}
      />
    </Layout>
  );
};

export default Order;
