import DrinkRecipe from './DrinkRecipe';
import FoodRecipe from './FoodRecipe';

function Recipes() {
  const path = window.location.pathname;
  return (
    <div>
      { path === '/meals' ? <FoodRecipe /> : <DrinkRecipe /> }
    </div>
  );
}

export default Recipes;
