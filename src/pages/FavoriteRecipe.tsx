import { useEffect, useState } from 'react';
import FavoriteRecipeCard from '../components/FavoriteRecipeCard';
import Header from '../components/Header';
import { Favorites, useRecipeContext } from '../context/search-results-context';
import '../styles/donePage.css';

function FavoriteRecipe() {
  const [favsList, setFavsList] = useState<Favorites[]>([]);
  const [filteredFavsList, setFilteredFavsList] = useState<Favorites[]>([]);
  const { favoriteRecipes } = useRecipeContext();

  useEffect(() => {
    const favItmesLS = JSON.parse(localStorage.getItem('favoriteRecipes') as string);
    setFavsList(favItmesLS);
    setFilteredFavsList(favItmesLS);
  }, [favoriteRecipes]);

  const filterRecipes = (recipeType: string) => {
    if (recipeType === 'all') {
      setFilteredFavsList(favsList);
    } else {
      const filteredRecipes = favsList.filter((recipe) => recipe.type === recipeType);
      setFilteredFavsList(filteredRecipes);
    }
  };

  return (
    <>
      <Header title="Favorite Recipes" iconSearch={ false } iconProfile />
      <div className="buttn-container">
        <button
          data-testid="filter-by-all-btn"
          onClick={ () => filterRecipes('all') }
        >
          All
        </button>
        <button
          data-testid="filter-by-meal-btn"
          onClick={ () => filterRecipes('meal') }
        >
          Meals
        </button>
        <button
          data-testid="filter-by-drink-btn"
          onClick={ () => filterRecipes('drink') }
        >
          Drinks
        </button>
      </div>
      { filteredFavsList
        ? filteredFavsList.map((recipe, i) => (
          <FavoriteRecipeCard key={ i } i={ i } recipe={ recipe } />
        ))
        : <h3>Nenhuma receita adicionada aos favoritos.</h3> }
    </>
  );
}

export default FavoriteRecipe;
