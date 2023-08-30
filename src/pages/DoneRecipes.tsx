import { useState, useEffect } from 'react';
import { DoneRecipesLocal } from '../types';
import Footer from '../components/Footer';
import Header from '../components/Header';
import MealRecipeDone from '../components/MealRecipeDone';
import DrinkRecipeDone from '../components/DrinkRecipeDone';

function DoneRecipes() {
  const [recipesList, setRecipeList] = useState([] as DoneRecipesLocal[]);

  useEffect(() => {
    const storageDoneRecipes: DoneRecipesLocal[] = JSON
      .parse(localStorage.getItem('doneRecipes') || 'null') ?? '[]';
    setRecipeList(storageDoneRecipes);
  }, []);

  return (
    <>
      <Header title="Done Recipes" iconSearch={ false } iconProfile />
      <button
        data-testid="filter-by-all-btn"
      >
        All
      </button>
      <button
        data-testid="filter-by-meal-btn"
      >
        Meals
      </button>
      <button
        data-testid="filter-by-drink-btn"
      >
        Drinks
      </button>
      {recipesList.map((recipe) => (recipe.type === 'drink'
        ? (<DrinkRecipeDone key={ recipe.id } />)
        : (<MealRecipeDone key={ recipe.id } />))) }
      <Footer />
    </>
  );
}

export default DoneRecipes;
