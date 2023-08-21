import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipeList from '../components/MealRecipeList';
import { useRecipeContext } from '../context/search-results-context';

function FoodRecipe() {
  const { mealResults } = useRecipeContext();

  return (
    <>
      <Header />
      {mealResults.length > 0 ? (
        <RecipeList recipes={ mealResults } />
      ) : (
        <p>Nenhum resultado encontrado para comidas.</p>
      )}
      <Footer />
    </>
  );
}

export default FoodRecipe;
