import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DoneRecipesLocal } from '../../types';
import style from './ButtonRecipeStar.module.css';

type PropType = {
  page: string;
  recipeId: string | undefined;
};

function ButtonRecipeStart({ page, recipeId }: PropType) {
  const [recipesList, setRecipeList] = useState([] as DoneRecipesLocal[]);
  const navigate = useNavigate();

  useEffect(() => {
    const storageDoneRecipes: DoneRecipesLocal[] = JSON
      .parse(localStorage.getItem('doneRecipes') || 'null') ?? '[]';
    setRecipeList(storageDoneRecipes);
  }, []);

  const isRecipeInProgress = () => {
    if (!recipeId) {
      return false;
    }

    const localStorageIngredients = localStorage.getItem('inProgressRecipes');
    if (localStorageIngredients) {
      const inProgressRecipes = JSON.parse(localStorageIngredients);
      return inProgressRecipes.meals?.[recipeId] || inProgressRecipes.drinks?.[recipeId];
    }

    return false;
  };

  const handleStartRecipeClick = () => {
    if (isRecipeInProgress()) {
      if (page === 'Meal') {
        navigate(`/meals/${recipeId}/in-progress`);
      } else if (page === 'Drink') {
        navigate(`/drinks/${recipeId}/in-progress`);
      }
    } else if (page === 'Meal') {
      navigate(`/meals/${recipeId}/in-progress`);
    } else if (page === 'Drink') {
      navigate(`/drinks/${recipeId}/in-progress`);
    }
  };

  if (recipesList.length === 0) return null;

  return (
    <button
      className={ style.btnStartRecipe }
      style={ { position: 'fixed', bottom: '0px' } }
      data-testid="start-recipe-btn"
      onClick={ handleStartRecipeClick }
    >
      {isRecipeInProgress() ? 'Continue Recipe' : 'Start Recipe'}
    </button>
  );
}

export default ButtonRecipeStart;
