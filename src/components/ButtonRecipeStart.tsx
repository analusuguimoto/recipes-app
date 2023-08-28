import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { DoneRecipesLocal, InProgressRecipes } from '../types';

type PropType = {
  page: string;
  recipeId: string;
};

function ButtonRecipeStart({ page, recipeId }: PropType) {
  const [recipesList, setRecipeList] = useState([] as DoneRecipesLocal[]);
  const [recipeInProgress, setRecipeInProgress] = useState<InProgressRecipes>(
    {
      drinks: { idDrink: [] },
      meals: { idMeal: [] },
    },
  );

  useEffect(() => {
    // Pegando o storage para verificar se existe algum item e se tiver, coloco ele no estado, se não tiver, coloco um array vazio lá
    const storageDoneRecipes: DoneRecipesLocal[] = JSON
      .parse(localStorage.getItem('doneRecipes') || 'null') ?? '[]';
    setRecipeList(storageDoneRecipes);
  }, [setRecipeList]);

  useEffect(() => {
    // Pecgando o storage para verificar se existe algum item e se tiver, coloco ele no estado, se não tiver, coloco um array vazio lá
    const storageRecipesInProgress = JSON
      .parse(localStorage.getItem('inProgressRecipes') || 'null') ?? '[]';
    setRecipeInProgress(storageRecipesInProgress);
  }, [setRecipeInProgress]);

  if (recipesList.length === 0) return;

  if (page === 'Meal') {
    return (
      recipeInProgress.meals.idMeal.length !== 0 ? (
        <Link to={ `/meals/:${recipeId}/in-progress` }>
          <button
            style={ { position: 'fixed', bottom: '0px' } }
            data-testid="start-recipe-btn"
          >
            Continue Recipe
          </button>
        </Link>
      ) : (
        <button
          style={ { position: 'fixed', bottom: '0px' } }
          data-testid="start-recipe-btn"
        >
          Start Recipe
        </button>
      )
    );
  }

  if (page === 'Drink') {
    return (
      recipeInProgress.drinks.idDrink.length !== 0 ? (
        <Link to={ `/drinks/:${recipeId}/in-progress` }>
          <button
            style={ { position: 'fixed', bottom: '0px' } }
            data-testid="start-recipe-btn"
          >
            Continue Recipe
          </button>
        </Link>
      ) : (
        <button
          style={ { position: 'fixed', bottom: '0px' } }
          data-testid="start-recipe-btn"
        >
          Start Recipe
        </button>
      )
    );
  }
}

export default ButtonRecipeStart;
