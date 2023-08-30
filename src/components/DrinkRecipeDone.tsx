import { useState, useEffect } from 'react';
import { DoneRecipesLocal } from '../types';
import shareIcon from '../images/searchIcon.svg';

function DrinkRecipeDone() {
  const [recipesList, setRecipeList] = useState([] as DoneRecipesLocal[]);
  const currentUrl = window.location.href;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(currentUrl)
      .then(() => {
        alert('Link copied!');
      })
      .catch((err) => console.error('Erro ao copiar: ', err));
  };

  useEffect(() => {
    const storageDoneRecipes: DoneRecipesLocal[] = JSON
      .parse(localStorage.getItem('doneRecipes') || 'null') ?? '[]';
    setRecipeList(storageDoneRecipes);
  }, []);

  return (
    <>
      {' '}
      {recipesList.map((recipe, index) => (
        <div key={ index }>
          <img
            data-testid={ `${index}-horizontal-image` }
            src={ recipe.image }
            alt="renderiza o card"
          />
          <h1 data-testid={ `${index}-horizontal-name` }>
            {recipe.name}
          </h1>
          <p data-testid={ `${index}-horizontal-top-text` }>{recipe.alcoholicOrNot}</p>
          <p data-testid={ `${index}-horizontal-done-date` }>
            {recipe.doneDate}
          </p>
          <button
            data-testid={ `${index}-horizontal-share-btn` }
            onClick={ copyToClipboard }
          >
            <img
              src={ shareIcon }
              alt="shareIcon"
            />
          </button>
        </div>
      ))}
    </>

  );
}

export default DrinkRecipeDone;
