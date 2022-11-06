import { Box, Typography } from '@mui/material';
import React from 'react';
import InfoIcon from '@mui/icons-material/Info';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  return (
    <Box
      component="footer"
      data-testid="footer"
      className="footer"
      sx={ {
        backgroundColor: '#41197F',
        padding: '10px 20px',
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
      } }
    >
      <div className="d-flex flex-column align-items-center">
        <Link to="/drinks">
          <img
            data-testid="drinks-bottom-btn"
            src={ drinkIcon }
            alt="Icone representando um drink"
          />
        </Link>
        <Typography variant="caption" color="primary">Drinks</Typography>
      </div>

      <div className="d-flex flex-column align-items-center">
        <Link to="/about">
          <InfoIcon color="primary" />
        </Link>
        <Typography variant="caption" color="primary">About Us</Typography>
      </div>

      <div className="d-flex flex-column align-items-center">
        <Link to="/meals">
          <img
            data-testid="meals-bottom-btn"
            src={ mealIcon }
            alt="Icone representando comidas"
          />
        </Link>
        <Typography variant="caption" color="primary">Meals</Typography>
      </div>
    </Box>
  );
}

export default Footer;
