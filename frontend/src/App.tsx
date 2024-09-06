import React, { useState } from 'react';
import { Button, Container, Grid, Paper, TextField, CircularProgress } from '@mui/material';
import { backend } from 'declarations/backend';

const App: React.FC = () => {
  const [display, setDisplay] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleClick = (value: string) => {
    if (value === 'C') {
      setDisplay('');
      setResult('');
    } else if (value === '=') {
      calculate();
    } else {
      setDisplay(display + value);
    }
  };

  const calculate = async () => {
    try {
      setLoading(true);
      const parts = display.match(/([\d.]+)([+\-*/])([\d.]+)/);
      if (parts) {
        const [_, x, op, y] = parts;
        const res = await backend.calculate(op, parseFloat(x), parseFloat(y));
        setResult(res.toString());
      } else {
        setResult('Error');
      }
    } catch (error) {
      console.error('Calculation error:', error);
      setResult('Error');
    } finally {
      setLoading(false);
    }
  };

  const buttons = [
    '7', '8', '9', '/',
    '4', '5', '6', '*',
    '1', '2', '3', '-',
    '0', '.', '=', '+',
    'C'
  ];

  return (
    <Container maxWidth="xs">
      <Paper elevation={3} style={{ padding: '1rem' }}>
        <TextField
          fullWidth
          variant="outlined"
          value={display}
          InputProps={{ readOnly: true }}
          style={{ marginBottom: '1rem' }}
        />
        <TextField
          fullWidth
          variant="outlined"
          value={result}
          InputProps={{ readOnly: true }}
          style={{ marginBottom: '1rem' }}
        />
        <Grid container spacing={1}>
          {buttons.map((btn) => (
            <Grid item xs={btn === 'C' ? 12 : 3} key={btn}>
              <Button
                fullWidth
                variant="contained"
                color={['/', '*', '-', '+', '='].includes(btn) ? 'secondary' : 'primary'}
                onClick={() => handleClick(btn)}
                disabled={loading}
              >
                {btn}
              </Button>
            </Grid>
          ))}
        </Grid>
        {loading && (
          <CircularProgress
            style={{ marginTop: '1rem' }}
            size={24}
            thickness={4}
          />
        )}
      </Paper>
    </Container>
  );
};

export default App;