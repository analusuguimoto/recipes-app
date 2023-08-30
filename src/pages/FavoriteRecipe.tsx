import { useEffect, useState } from 'react';
import FavoriteRecipeCard from '../components/FavoriteRecipeCard';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { Favorites, useRecipeContext } from '../context/search-results-context';

function FavoriteRecipe() {
  const [favsList, setFavsList] = useState<Favorites[]>([]);
  const { favoriteRecipes } = useRecipeContext();

  const getLS = () => {
    const favItmesLS = JSON.parse(localStorage.getItem('favoriteRecipes') as string);
    setFavsList(favItmesLS);
  };

  const getFilteredRecipes = (recipeType: string) => {
    getLS();
    console.log(favsList);
    const newList = favsList.filter((recipe) => recipe.type === recipeType);
    setFavsList(newList);
  };

  useEffect(() => {
    getLS();
  }, [favoriteRecipes]);

  return (
    <>
      <Header title="Favorite Recipes" iconSearch={ false } iconProfile />
      <div>
        <button
          data-testid="filter-by-all-btn"
          onClick={ () => getLS() }
        >
          all
        </button>
        <button
          data-testid="filter-by-meal-btn"
          onClick={ () => getFilteredRecipes('meal') }
        >
          Meals
        </button>
        <button
          data-testid="filter-by-drink-btn"
          onClick={ () => getFilteredRecipes('drink') }
        >
          Drinks
        </button>
      </div>
      {favsList.map((recipe, i) => (
        <FavoriteRecipeCard key={ i } i={ i } recipe={ recipe } />
      ))}
    </>
  );
}

export default FavoriteRecipe;
