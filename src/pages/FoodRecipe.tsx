import { useEffect, useState } from 'react';
import Header from '../components/Header';
import RecipeList from '../components/MealRecipeList';
import { useRecipeContext } from '../context/search-results-context';
import { fetchApi } from '../helpers/fetchApi';

function FoodRecipe() {
  const { mealResults } = useRecipeContext();
  const [categories, setCategories] = useState();

  const fetchCategory = async () => {
    const response = await fetchApi('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
    setCategories(response);
    console.log(response);
  };
  useEffect(() => {
    fetchCategory();
  }, []);

  return (
    <>
      <Header />
      {/* { categories.map((category) => (
        <button
          key={ category.strCategory }
          data-testid={ `${category.strCategory}-category-filter` }
          // onClick={}
        >
          { category.strCategory }
        </button>
      )) } */}
      {mealResults.length > 0 ? (
        <RecipeList recipes={ mealResults } />
      ) : (
        <p>Nenhum resultado encontrado para comidas.</p>
      )}
    </>
  );
}

export default FoodRecipe;

// https://www.themealdb.com/api/json/v1/1/list.php?c=list
