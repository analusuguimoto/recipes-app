import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { DoneRecipesLocal } from '../types';
import Footer from '../components/Footer';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import '../styles/donePage.css';

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
      <div className="buttn-container">
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
      </div>

      { filterList ? filterList.map((recipe, i) => (
        <div key={ i } className="recipe-card">
          <Link to={ `http://localhost:3000/${recipe.type}s/${recipe.id}` }>
            <div className="recipe-image">
              <img
                width="100px"
                data-testid={ `${i}-horizontal-image` }
                src={ recipe.image }
                alt="renderiza o card"
              />
            </div>
          </Link>
          <div className="recipe-details">
            <Link
              to={ `http://localhost:3000/${recipe.type}s/${recipe.id}` }
              className="recipe-title"
            >
              <h1
                data-testid={ `${i}-horizontal-name` }
              >
                {recipe.name}
              </h1>
            </Link>
            {recipe.type === 'drink' && (
              <p data-testid={ `${i}-horizontal-top-text` }>{recipe.alcoholicOrNot}</p>
            )}
            {recipe.type === 'meal' && (
              <>
                <p data-testid={ `${i}-horizontal-top-text` }>
                  {`${recipe.nationality} - ${recipe.category}`}
                </p>
                {recipe.tags?.map((tag, i) => (
                  <li
                    key={ i }
                    data-testid={ `${i}-${tag}-horizontal-tag` }
                  >
                    {tag}
                  </li>
                ))}
              </>
            )}
            <p data-testid={ `${i}-horizontal-done-date` }>
              {recipe.doneDate}
            </p>
            <button
              className="share-button"
              onClick={ () => copyToClipboard(`http://localhost:3000/${recipe.type}s/${recipe.id}`) }
            >
              { !linkCopied
                ? <img
                    src={ shareIcon }
                    data-testid={ `${i}-horizontal-share-btn` }
                    alt="Botão de Compartilhamento"
                />
                : <span>Link copied!</span>}
            </button>
          </div>
        </div>
      )) : (<h3>Nenhuma receita enconytrada</h3>) }
      <Footer />
    </>
  );
}

export default DoneRecipes;
