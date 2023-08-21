import { useEffect, useState } from 'react';
import Header from '../components/Header';
import RecipeList from '../components/MealRecipeList';
import { useRecipeContext } from '../context/search-results-context';
import { fetchApi } from '../helpers/fetchApi';
import { CategoryType } from '../types';
import { CATEGORY_MEALS_LINK } from '../helpers/links';

function FoodRecipe() {
  const { mealResults } = useRecipeContext();
  const [categories, setCategories] = useState<CategoryType[]>([]);

  const fetchCategory = async () => {
    const response = await fetchApi(CATEGORY_MEALS_LINK);
    setCategories(response.meals);
  };
  useEffect(() => {
    fetchCategory();
  }, []);

  return (
    <>
      <Header />
      { categories.map((category, i) => (
        i < 5 && (
          <button
            key={ category.strCategory }
            data-testid={ `${category.strCategory}-category-filter` }
            // onClick={}
          >
            { category.strCategory }
          </button>
        )))}

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
