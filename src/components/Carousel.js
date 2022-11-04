import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, IconButton, Paper, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

function Carousel(props) {
  const [carouselIndex, setCarouselIndex] = useState(0);
  const { recommendationList } = props;

  const handleNext = () => {
    const upperLimit = 4;
    if (carouselIndex < upperLimit) {
      setCarouselIndex((prevState) => (prevState + 2));
    } if (carouselIndex === upperLimit) {
      setCarouselIndex(0);
    }
  };

  const handleBack = () => {
    const lowerLimit = 0;
    const upperLimit = 4;
    if (carouselIndex > lowerLimit) {
      setCarouselIndex((prevState) => (prevState - 2));
    } if (carouselIndex === lowerLimit) {
      setCarouselIndex(upperLimit);
    }
  };

  const handleHidden = (aIndex) => (
    aIndex === carouselIndex || aIndex === carouselIndex + 1);

  return (
    <Box
      component="section"
      sx={ {
        margin: '5px 10px 50px 10px' } }
    >
      <Typography
        variant="h5"
        sx={ { padding: '10px 20px', fontWeight: '700' } }
      >
        Recommendation
      </Typography>

      <Box sx={ { display: 'flex', alignItems: 'center' } }>
        <IconButton
          className="btn btn-primary mx-2"
          type="button"
          onClick={ handleBack }
        >
          <ArrowBackIcon color="primary" />
        </IconButton>
        {recommendationList
          .map(({ name, image }, i) => (
            <Paper
              elevation={ 3 }
              sx={ { borderRadius: '5px' } }
              className="mx-2 text-center"
              hidden={ !handleHidden(i) }
              name={ name }
              key={ name }
              data-testid={ `${i}-recommendation-card` }
            >
              <img
                className="img-thumbnail"
                src={ image }
                alt={ name }
              />
              <p data-testid={ `${i}-recommendation-title` }>
                {name}
              </p>
            </Paper>
          ))}
        <IconButton
          className="btn btn-primary"
          type="button"
          onClick={ handleNext }
        >
          <ArrowForwardIcon color="primary" />
        </IconButton>
      </Box>

    </Box>
  );
}

Carousel.propTypes = { recommendationList: PropTypes.shape() }.isRequired;

export default Carousel;
