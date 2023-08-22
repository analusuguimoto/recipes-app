import Header from '../components/Header';
import RecipeList from '../components/MealRecipeList';
import { useRecipeContext } from '../context/search-results-context';

function FoodRecipe() {
  const { mealResults } = useRecipeContext();

  return (
    <>
      <Header title="Meals" iconProfile iconSearch />
      {mealResults.length > 0 ? (
        <RecipeList recipes={ mealResults } />
      ) : (
        <p>Nenhum resultado encontrado para comidas.</p>
      )}
    </>
  );
}

export default FoodRecipe;
