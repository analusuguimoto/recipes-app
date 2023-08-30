import { useState, useEffect } from 'react';
import { DoneRecipesLocal } from '../types';
import shareIcon from '../images/searchIcon.svg';

function DrinkRecipeDone() {
  const [recipesList, setRecipeList] = useState([] as DoneRecipesLocal[]);
  const [linkCopied, setLinkCopied] = useState(false);

  const copyToClipboard = (currentUrl:string) => {
    navigator.clipboard.writeText(currentUrl)
      .then(() => {
        setLinkCopied(true);
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
            onClick={ () => copyToClipboard(`http://localhost:3000/${recipe.type}s/${recipe.id}`) }
          >
            { !linkCopied
              ? <img
                  src={ shareIcon }
                  data-testid={ `${index}-horizontal-share-btn` }
                  alt="Botão de Compartilhamento"
              />
              : <span>Link copied!</span>}
          </button>
        </div>
      ))}
    </>

  );
}

export default DrinkRecipeDone;
