import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  return (
    <footer data-testid="footer" className="footer">
      <div>
        <Link to="/drinks">
          <img
            data-testid="drinks-bottom-btn"
            src={ drinkIcon }
            alt="Icone representando um drink"
          />
        </Link>
      </div>

      <div>
        <Link to="/meals">
          <img
            data-testid="meals-bottom-btn"
            src={ mealIcon }
            alt="Icone representando comidas"
          />
        </Link>
      </div>
    </footer>
  );
}

export default Footer;