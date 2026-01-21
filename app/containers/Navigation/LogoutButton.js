import styled from 'styled-components';
import Button from '@mui/material/Button';

export default styled(Button).attrs({
  sx: {
    'background-color': 'white',
    border: '2px solid #41addd',
    'border-radius': '4px',
    'box-shadow': 'none',
    'font-family': 'Helvetica Neue,Helvetica,Arial,sans-serif',
    'font-size': '16px',
    'font-weight': 'bold',
    color: '#41addd',
    'line-height': '1.15',
    margin: '1em',
    'min-height': '2.2rem',
    'min-width': '110.66px',
    'text-transform': 'none',
    'vertical-align': 'inherit',

    '&:hover': {
      backgroundColor: 'white',
      boxShadow: 'none',
    },
  },
})``;
