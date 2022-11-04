import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, Paper, List } from '@mui/material';
import ShareButton from './ShareButton';
import FavoriteButton from './FavoriteButton';
import IngredientItem from './IngredientItem';
import { getInProgressRecipes } from '../services/localStorageHelper';
import AppContext from '../context/AppContext';

const stroke = '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000';

function RecipeInfo(props) {
  const {
    checkedIngredients,
    setCheckedIngredients,
    handleCheck } = useContext(AppContext);
  const { recipeData } = props;
  const {
    id: recipeId,
    type,
    category,
    alcoholicOrNot,
    instructions,
    name,
    image,
    video,
    ingredients,
  } = recipeData;

  useEffect(() => {
    const getInProgress = getInProgressRecipes();
    const find = Object.entries(getInProgress[type])
      .find((recipe) => recipe[0] === recipeId);
    if (find !== undefined) {
      setCheckedIngredients(find[1]);
    }
  }, [recipeId, type, setCheckedIngredients]);

  return (
    <Box component="section" sx={ { display: 'flex', flexDirection: 'column' } }>
      <Paper
        elevation={ 5 }
        component="article"
        sx={ {
          height: '360px',
          backgroundImage: `url(${image})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center-center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '30px',
          textAlign: 'center',
        } }
      >
        <Box
          sx={ {
            padding: '0 20px',
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          } }
        >
          <Typography
            color="primary"
            variat="h5"
            data-testid="recipe-category"
            sx={ {
              textShadow: stroke,
            } }
          >
            { category }
          </Typography>

          {(type === 'drinks') && (
            <Typography
              color="primary"
              variat="h5"
              data-testid="recipe-category"
              sx={ {
                textShadow: stroke,
              } }
            >
              {alcoholicOrNot}
            </Typography>) }

          <div className="d-flex">
            <FavoriteButton recipeData={ recipeData } />
            <ShareButton recipeData={ recipeData } />
          </div>
        </Box>
        <Typography
          variant="h4"
          color="white"
          data-testid="recipe-title"
          sx={ {
            margin: '0 5px',
            fontWeight: '700',
            textShadow: stroke,
          } }
        >
          { name }
        </Typography>
        <span> </span>
      </Paper>
      <Box sx={ { margin: '5px 10px' } }>
        <Typography
          variant="h5"
          sx={ { padding: '10px 20px', fontWeight: '700' } }
        >
          Ingredients
        </Typography>
        <List
          sx={ {
            border: '1px solid black',
            borderRadius: '10px' } }
        >
          {Object.values(ingredients).map((ingredient, index) => (
            <IngredientItem
              key={ `${ingredient}${index}` }
              ingredient={ ingredient }
              index={ index }
              handleCheck={ handleCheck }
              checkedIngredients={ checkedIngredients }
            />
          ))}
        </List>
      </Box>
      <Box sx={ { margin: '5px 10px' } }>
        <Typography
          variant="h5"
          sx={ { padding: '10px 20px', fontWeight: '700' } }
        >
          Instructions
        </Typography>
        <Box
          sx={ {
            border: '1px solid black',
            borderRadius: '10px' } }
        >
          <Typography
            variant="h7"
            data-testid="instructions"
            sx={ { margin: '10px', display: 'block' } }
          >
            { instructions }

          </Typography>
        </Box>
      </Box>
      {(type === 'meals') ? (
        <Box
          sx={ {
            margin: '5px 10px' } }
        >
          <Typography
            variant="h5"
            sx={ { padding: '10px 20px', fontWeight: '700' } }
          >
            Video
          </Typography>
          <iframe
            data-testid="video"
            src={ video }
            title="YouTube video player"
            frameBorder="0"
            allowFullScreen
          >
            Video
          </iframe>
        </Box>) : null }

    </Box>
  );
}

RecipeInfo.propTypes = {
  recipeData: PropTypes.shape(),
}.isRequired;

export default RecipeInfo;
