import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchApi } from '../helpers/fetchApi';
import { ID_MEALS_LINK } from '../helpers/links';
import { MealType } from '../types';
import shareBtn from '../images/shareBtn.svg';
import likeBtn from '../images/likeBtn.svg';

function DetailsFoodInProgress() {
  const { id } = useParams<{ id: string }>();
  const [mealRecipe, setMealRecipe] = useState<MealType>();
  const [linkCopied, setLinkCopied] = useState(false);
  const [ingredients, setIngredients] = useState<string[]>([]);
  const currentUrl = window.location.href;
  const newUrl = currentUrl.substring(0, currentUrl.lastIndexOf('/'));

  const fetchRecipe = async () => {
    const response = await fetchApi(`${ID_MEALS_LINK}${id}`);
    setMealRecipe(response.meals[0]);
  };

  // salva a receita no local storage, descomentar após a implementação da página
  const handleSaveInLocalStorage = () => {
    const storage = JSON.stringify(mealRecipe);
    localStorage.setItem('doneRecipes', storage);
  };

  useEffect(() => {
    fetchRecipe();
  }, []);

  useEffect(() => {
    const ingredientsArray = [] as string[];
    if (mealRecipe) {
      const maxIngredientes = Object.keys(mealRecipe)
        .filter((chave) => chave.startsWith('strIngredient')).length;
      for (let i = 1; i <= maxIngredientes; i++) {
        const ingredientChave = `strIngredient${i}`;
        const medidaChave = `strMeasure${i}`;
        const ingrediente = mealRecipe[ingredientChave];
        const medida = mealRecipe[medidaChave];

        if (medida && ingrediente) {
          ingredientsArray.push(`${medida} of ${ingrediente}`);
        }
      }
    }
    setIngredients(ingredientsArray);
  }, [mealRecipe]);

  const handleShareBtn = () => {
    navigator.clipboard.writeText(newUrl)
      .then(() => {
        setLinkCopied(true);
      })
      .catch((err) => console.error('Erro ao copiar: ', err));
  };

  return (
    <>
      <nav>
        <h1 data-testid="recipe-category">{ mealRecipe?.strCategory }</h1>
        <div>
          <button
            data-testid="share-btn"
            onClick={ () => handleShareBtn() }
          >
            { !linkCopied ? <img src={ shareBtn } alt="Botão de Compartilhamento" />
              : <span>Link copied!</span>}
          </button>
          <button
            data-testid="favorite-btn"
          >
            <img src={ likeBtn } alt="Botão de dar Like em uma receita" />
          </button>
        </div>
      </nav>
      <h2 data-testid="recipe-title">{mealRecipe?.strMeal}</h2>
      <img
        data-testid="recipe-photo"
        src={ mealRecipe?.strMealThumb }
        alt={ mealRecipe?.strMeal }
        style={ { maxWidth: '200px', height: 'auto' } }
      />
      <div>
        <h3>Ingredients</h3>
        <ul>
          {ingredients.map((ingredient, i) => (
            <li key={ i }>
              <label
                htmlFor="ingredient"
                data-testid={ `${i}-ingredient-step` }
                key={ i }
              >
                <input
                  type="checkbox"
                  id="ingredient"
                />
                {ingredient}
              </label>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Instructions</h3>
        <p data-testid="instructions">{mealRecipe?.strInstructions}</p>
      </div>
      <div>
        {mealRecipe?.strYoutube ? <iframe title="recipe video" data-testid="video" width="200" height="175" src={ `https://www.youtube.com/embed/${mealRecipe?.strYoutube.split('=')[1]}` } /> : null}
      </div>
      <Link to="/done-recipes">
        <button
          data-testid="finish-recipe-btn"
          onClick={ handleSaveInLocalStorage }
        >
          Finish Recipe
        </button>
      </Link>
    </>
  );
}

export default DetailsFoodInProgress;
