import React from 'react';
import Header from '../components/Header';
import { useRecipeContext } from '../context/search-results-context';
import DrinkRecipeList from '../components/DrinkRecipeList';
import Footer from '../components/Footer';

function DrinkRecipe() {
  const { drinkResults } = useRecipeContext();

  return (
    <>
      <Header />
      {drinkResults.length > 0 ? (
        <DrinkRecipeList drinks={ drinkResults } />
      ) : (
        <p>Nenhum resultado encontrado para bebidas.</p>
      )}
      <Footer />
    </>
  );
}

export default DrinkRecipe;
