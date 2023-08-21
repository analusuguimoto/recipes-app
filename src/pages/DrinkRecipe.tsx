import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { useRecipeContext } from '../context/search-results-context';
import DrinkRecipeList from '../components/DrinkRecipeList';
import { fetchApi } from '../helpers/fetchApi';
import { CATEGORY_DRINKS_LINK } from '../helpers/links';
import { CategoryType } from '../types';

function DrinkRecipe() {
  const { drinkResults } = useRecipeContext();
  const [categories, setCategories] = useState<CategoryType[]>([]);

  const fetchCategory = async () => {
    const response = await fetchApi(CATEGORY_DRINKS_LINK);
    setCategories(response.drinks);
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
      {drinkResults.length > 0 ? (
        <DrinkRecipeList drinks={ drinkResults } />
      ) : (
        <p>Nenhum resultado encontrado para bebidas.</p>
      )}
    </>
  );
}

export default DrinkRecipe;
