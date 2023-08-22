import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { useRecipeContext } from '../context/search-results-context';
import DrinkRecipeList from '../components/DrinkRecipeList';
import { fetchApi } from '../helpers/fetchApi';
import { CATEGORY_DRINKS_LINK, FILTER_DRINKS_LINK } from '../helpers/links';
import { CategoryType } from '../types';

function DrinkRecipe() {
  const { drinkResults, updateDrinkState, fetchDrinks } = useRecipeContext();
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [checkCategory, setCheckCategory] = useState('');

  const fetchCategory = async () => {
    const response = await fetchApi(CATEGORY_DRINKS_LINK);
    setCategories(response.drinks);
  };

  const fetchFilteredMeals = async (category: string) => {
    setCheckCategory(category);
    if (category === checkCategory) {
      fetchDrinks();
      setCheckCategory('');
    } else {
      const response = await fetchApi(`${FILTER_DRINKS_LINK}${category}`);
      const data = response.drinks;
      updateDrinkState(data);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  return (
    <>
      <Header title="Drinks" iconProfile iconSearch />
      <div>
        <button
          data-testid="All-category-filter"
          onClick={ () => fetchDrinks() }
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
      {drinkResults.length > 0 ? (
        <DrinkRecipeList drinks={ drinkResults } />
      ) : (
        <p>Nenhum resultado encontrado para bebidas.</p>
      )}
    </>
  );
}

export default DrinkRecipe;
