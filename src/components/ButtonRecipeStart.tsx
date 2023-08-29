import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckedIngredient, DoneRecipesLocal } from '../types';

type PropType = {
  page: string;
  recipeId: string | undefined;
};

function ButtonRecipeStart({ page, recipeId }: PropType) {
  const [recipesList, setRecipeList] = useState([] as DoneRecipesLocal[]);
  const [recipeInProgress, setRecipeInProgress] = useState<CheckedIngredient[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const storageDoneRecipes: DoneRecipesLocal[] = JSON
      .parse(localStorage.getItem('doneRecipes') || 'null') ?? '[]';
    setRecipeList(storageDoneRecipes);
  }, []);

  useEffect(() => {
    const localStorageIngredients = localStorage.getItem('inProgressRecipes');
    if (localStorageIngredients) {
      setRecipeInProgress(JSON.parse(localStorageIngredients));
    }
  }, []);

  const isRecipeInProgress = () => {
    return (
      recipeInProgress.meals?.hasOwnProperty(recipeId)
      || recipeInProgress.drinks?.hasOwnProperty(recipeId)
    );
  };

  const handleStartRecipeClick = () => {
    if (isRecipeInProgress()) {
      if (page === 'Meal') {
        navigate(`/meals/${recipeId}/in-progress`);
      } else if (page === 'Drink') {
        navigate(`/drinks/${recipeId}/in-progress`);
      }
    } else {
      // Start a new recipe
      if (page === 'Meal') {
        setRecipeInProgress((prevState) => ({
          ...prevState,
          meals: {
            ...prevState.meals,
            [recipeId]: [],
          },
        }));
      } else if (page === 'Drink') {
        setRecipeInProgress((prevState) => ({
          ...prevState,
          drinks: {
            ...prevState.drinks,
            [recipeId]: [],
          },
        }));
      }
    }
  };

  if (recipesList.length === 0) return null;

  return (
    <button
      style={ { position: 'fixed', bottom: '0px' } }
      data-testid="start-recipe-btn"
      onClick={ handleStartRecipeClick }
    >
      {isRecipeInProgress() ? 'Continue Recipe' : 'Start Recipe'}
    </button>
  );
}

export default ButtonRecipeStart;
