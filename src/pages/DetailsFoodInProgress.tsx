import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchApi } from '../helpers/fetchApi';
import { ID_MEALS_LINK } from '../helpers/links';
import { IngredientsType, MealType, DoneRecipesLocal, InProgressRecipes } from '../types';
import shareBtn from '../images/shareBtn.svg';
import likeBtn from '../images/likeBtn.svg';

function DetailsFoodInProgress() {
  const { id } = useParams<{ id: string }>();
  const [mealRecipe, setMealRecipe] = useState<MealType>();
  const [linkCopied, setLinkCopied] = useState(false);
  const [ischecked,
    setIschecked] = useState<InProgressRecipes>({ meals: {}, drinks: {} });
  const [ingredients, setIngredients] = useState<IngredientsType[]>([]);
  const currentUrl = window.location.href;
  const newUrl = currentUrl.substring(0, currentUrl.lastIndexOf('/'));

  const fetchRecipe = async () => {
    const response = await fetchApi(`${ID_MEALS_LINK}${id}`);
    setMealRecipe(response.meals[0]);
  };

  const handleSaveInLocalStorage = async () => {
    const doneRecipe: DoneRecipesLocal = {
      id: mealRecipe?.idMeal,
      type: 'meal',
      nationality: mealRecipe?.strArea,
      category: mealRecipe?.strCategory,
      alcoholicOrNot: mealRecipe?.strAlcoholic,
      name: mealRecipe?.strMeal,
      image: mealRecipe?.strMealThumb,
      doneDate: mealRecipe?.dateModified,
      tags: mealRecipe?.strTags,
    };
    const prevLocalStorage = JSON
      .parse(localStorage.getItem('doneRecipes') ?? '[]');
    localStorage.setItem('doneRecipes', JSON
      .stringify([...prevLocalStorage, doneRecipe]));
  };

  useEffect(() => {
    fetchRecipe();
    const localStorageIngredients = localStorage.getItem('inProgressRecipes');
    if (localStorageIngredients) {
      setIschecked(JSON.parse(localStorageIngredients));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('inProgressRecipes', JSON.stringify(ischecked));
  }, [ischecked]);

  useEffect(() => {
    const ingredientsArray = [];
    if (mealRecipe) {
      const maxIngredientes = Object.keys(mealRecipe)
        .filter((chave) => chave.startsWith('strIngredient')).length;
      for (let i = 1; i <= maxIngredientes; i++) {
        const ingredientChave = `strIngredient${i}`;
        const medidaChave = `strMeasure${i}`;
        const ingrediente = mealRecipe[ingredientChave];
        const medida = mealRecipe[medidaChave];

        if (medida && ingrediente) {
          const obj = {
            medida,
            ingrediente,
          };
          ingredientsArray.push(obj);
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

  const handleCheck = (i: number) => {
    const newCheckedIngredientsMap = { ...ischecked };
    if (mealRecipe) {
      const recipeId = mealRecipe.idMeal;

      if (!newCheckedIngredientsMap.meals[recipeId]) {
        newCheckedIngredientsMap.meals[recipeId] = [];
      }

      if (!newCheckedIngredientsMap.meals[recipeId].includes(i)) {
        newCheckedIngredientsMap.meals[recipeId].push(i);
      } else {
        const indexToRemove = newCheckedIngredientsMap.meals[recipeId].indexOf(i);
        newCheckedIngredientsMap.meals[recipeId].splice(indexToRemove, 1);
      }

      setIschecked(newCheckedIngredientsMap);
    }
  };

  const getCheckedStatus = (index: number) => {
    if (mealRecipe && ischecked.meals[mealRecipe.idMeal]) {
      return ischecked.meals[mealRecipe.idMeal].includes(index);
    }
    return false;
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
            <li
              key={ i }
              data-testid={ `${i}-ingredient-step` }
              style={
                getCheckedStatus(i)
                  ? { textDecoration: 'line-through solid rgb(0,0,0)' }
                  : undefined
              }
            >
              <input
                type="checkbox"
                id="ingredient"
                onChange={ () => handleCheck(i) }
                checked={ getCheckedStatus(i) }
              />
              {`${ingredient.medida} of ${ingredient.ingrediente}`}
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
