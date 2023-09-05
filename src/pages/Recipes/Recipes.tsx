import { useLocation } from 'react-router-dom';
import DrinkRecipe from './DrinkRecipe';
import FoodRecipe from './FoodRecipe';

function Recipes() {
  const location = useLocation();
  const path = location.pathname;
  return (
    <div>
      { path === '/meals' ? <FoodRecipe /> : <DrinkRecipe /> }
    </div>
  );
}

export default Recipes;
