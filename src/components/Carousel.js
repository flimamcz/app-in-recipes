import React, { useState } from 'react';
import PropTypes from 'prop-types';

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
    <article className="container-fluid d-flex align-items-center">
      <button
        className="btn btn-primary mx-2"
        type="button"
        onClick={ handleBack }
      >
        Back
      </button>

      {recommendationList
        .map(({ productTitle, thumb }, i) => (
          <div
            className="mx-2 text-center"
            hidden={ !handleHidden(i) }
            key={ productTitle }
            data-testid={ `${i}-recommendation-card` }
          >
            <p data-testid={ `${i}-recommendation-title` }>
              {productTitle}
            </p>
            <img
              className="img-thumbnail"
              src={ thumb }
              alt={ productTitle }
            />
          </div>
        ))}

      <button
        className="btn btn-primary"
        type="button"
        onClick={ handleNext }
      >
        Next
      </button>
    </article>
  );
}

Carousel.propTypes = { recommendationList: PropTypes.shape() }.isRequired;

export default Carousel;
