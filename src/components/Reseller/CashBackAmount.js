import React, { useEffect, useState } from 'react';
import { numberToCurrency } from 'helpers/numberHelper';
import { Typography } from '@material-ui/core';
import axios from 'axios';
import PropTypes from 'prop-types';

const CashBackAmount = ({ cpf }) => {
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    const onlyCpf = cpf.replace(/\D/g, '');
    axios
      .get(`https://mdaqk8ek5j.execute-api.us-east-1.amazonaws.com/v1/cashback?cpf=${onlyCpf}`)
      .then((res) => {
        setAmount(res.data.body.credit);
      });
  }, [cpf]);

  return <Typography>{numberToCurrency(amount)}</Typography>;
};

CashBackAmount.propTypes = {
  cpf: PropTypes.string,
};

export default CashBackAmount;
