import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { DoneRecipesLocal } from '../types';
import Footer from '../components/Footer';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';

function DoneRecipes() {
  const [recipesList, setRecipeList] = useState([] as DoneRecipesLocal[]);
  const [filterList, setFilterList] = useState([] as DoneRecipesLocal[]);
  const [linkCopied, setLinkCopied] = useState(false);

  const copyToClipboard = (currentUrl:string) => {
    navigator.clipboard.writeText(currentUrl)
      .then(() => {
        setLinkCopied(true);
      })
      .catch((err) => console.error('Erro ao copiar: ', err));
  };

  const filterRecipes = (recipeType: string) => {
    if (recipeType === 'all') {
      setFilterList(recipesList);
    } else {
      const filteredRecipes = recipesList.filter((recipe) => recipe.type === recipeType);
      setFilterList(filteredRecipes);
    }
  };

  useEffect(() => {
    const storageDoneRecipes: DoneRecipesLocal[] = JSON
      .parse(localStorage.getItem('doneRecipes') || 'null') ?? '[]';
    setRecipeList(storageDoneRecipes);
    setFilterList(storageDoneRecipes);
  }, []);

  return (
    <>
      <Header title="Done Recipes" iconSearch={ false } iconProfile />
      <button
        onClick={ () => filterRecipes('all') }
        data-testid="filter-by-all-btn"
      >
        All
      </button>
      <button
        onClick={ () => filterRecipes('meal') }
        data-testid="filter-by-meal-btn"
      >
        Meals
      </button>
      <button
        onClick={ () => filterRecipes('drink') }
        data-testid="filter-by-drink-btn"
      >
        Drinks
      </button>
      {filterList.map((recipe, index) => (
        <div key={ index }>
          <Link to={ `http://localhost:3000/${recipe.type}s/${recipe.id}` }>
            <img
              width="100px"
              data-testid={ `${index}-horizontal-image` }
              src={ recipe.image }
              alt="renderiza o card"
            />
            <h1 data-testid={ `${index}-horizontal-name` }>
              {recipe.name}
            </h1>
          </Link>
          {recipe.type === 'drink' && (
            <p data-testid={ `${index}-horizontal-top-text` }>{recipe.alcoholicOrNot}</p>
          )}
          {recipe.type === 'meal' && (
            <>
              <p data-testid={ `${index}-horizontal-top-text` }>
                {`${recipe.nationality} - ${recipe.category}`}
              </p>
              {recipe.tags?.map((tag, i) => (
                <li
                  key={ i }
                  data-testid={ `${index}-${tag}-horizontal-tag` }
                >
                  {tag}
                </li>
              ))}
            </>
          )}
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
      <Footer />
    </>
  );
}

export default DoneRecipes;
