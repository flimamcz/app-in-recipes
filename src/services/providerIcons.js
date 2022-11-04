// Icons Meals
import ChickenIcon from '../images/ChickenIcon.svg';
import BeefIcon from '../images/BeefIcon.svg';
import GoatIcon from '../images/GoatIcon.svg';
import BreakFast from '../images/BreakFast.svg';
import DessertIcon from '../images/DessertIcon.svg';

// Icons Drinks

import OrdinaryDrink from '../images/OrdinaryDrink.svg';
import Cocktail from '../images/Cocktail.svg';
import Shake from '../images/Shake.svg';
import Cocoa from '../images/Cocoa.svg';
import Other from '../images/Other.svg';

const mealsIcons = [BeefIcon, BreakFast, ChickenIcon, DessertIcon, GoatIcon];
const drinksIcons = [OrdinaryDrink, Cocktail, Shake, Other, Cocoa];

function providerIcons(path) {
  if (path === 'meal') {
    return mealsIcons;
  }
  return drinksIcons;
}
export default providerIcons;
