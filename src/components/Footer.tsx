import '../footer.css';

import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer data-testid="footer" className="footer">
      <Link to="/drinks" data-testid="drinks-bottom-link">
        <img
          src="/src/images/drinkIcon.svg"
          alt="Bebida"
          data-testid="drinks-bottom-btn"
        />
      </Link>
      <Link to="/meals">
        <img
          src="/src/images/mealIcon.svg"
          alt="Comida"
          data-testid="meals-bottom-btn"
        />
      </Link>
    </footer>
  );
}

export default Footer;
