import { useEffect, useState } from 'react';
import Header from '../components/Header';
import RecipeList from '../components/MealRecipeList';
import { useRecipeContext } from '../context/search-results-context';
import { fetchApi } from '../helpers/fetchApi';
import { CategoryType } from '../types';
import { CATEGORY_MEALS_LINK, FILTER_MEALS_LINK } from '../helpers/links';

function FoodRecipe() {
  const { mealResults, updateMealState, fetchMeals } = useRecipeContext();
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [checkCategory, setCheckCategory] = useState('');

  const fetchCategory = async () => {
    const response = await fetchApi(CATEGORY_MEALS_LINK);
    setCategories(response.meals);
  };

  const fetchFilteredMeals = async (category: string) => {
    setCheckCategory(category);
    if (category === checkCategory) {
      fetchMeals();
      setCheckCategory('');
    } else {
      const response = await fetchApi(`${FILTER_MEALS_LINK}${category}`);
      const data = response.meals;
      updateMealState(data);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  return (
    <>
      <Header />
      <div>
        <button
          data-testid="All-category-filter"
          onClick={ () => fetchMeals() }
        >
          All
        </button>
        { categories.map((category, i) => (
          i < 5 && (
            <button
              key={ category.strCategory }
              data-testid={ `${category.strCategory}-category-filter` }
              onClick={ () => fetchFilteredMeals(category.strCategory) }
            >
              { category.strCategory }
            </button>
          )))}
      </div>

      {mealResults.length > 0 ? (
        <RecipeList recipes={ mealResults } />
      ) : (
        <p>Nenhum resultado encontrado para comidas.</p>
      )}
    </>
  );
}

export default FoodRecipe;
