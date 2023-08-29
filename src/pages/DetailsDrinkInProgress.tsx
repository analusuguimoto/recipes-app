import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchApi } from '../helpers/fetchApi';
import { ID_DRINKS_LINK } from '../helpers/links';
import { DrinkType,
  IngredientsType, DoneRecipesLocal, InProgressRecipes } from '../types';
import shareBtn from '../images/shareBtn.svg';
import likeBtn from '../images/likeBtn.svg';
import DrinkRecipe from './DrinkRecipe';

function DetailsDrinkInProgress() {
  const { id } = useParams<{ id: string }>();
  const [drinkRecipe, setDrinkRecipe] = useState<DrinkType>();
  const [linkCopied, setLinkCopied] = useState(false);
  const [ingredients, setIngredients] = useState<IngredientsType[]>([]);
  const [ischecked,
    setIschecked] = useState<InProgressRecipes>({ meals: {}, drinks: {} });
  const currentUrl = window.location.href;
  const newUrl = currentUrl.substring(0, currentUrl.lastIndexOf('/'));

  // salva a receita pronta no local storage, chave doneRecié
  const handleSaveInLocalStorage = async () => {
    const doneRecipe: DoneRecipesLocal = {
      id: drinkRecipe?.idDrink,
      type: 'drink',
      nationality: '',
      category: drinkRecipe?.strCategory,
      alcoholicOrNot: drinkRecipe?.strAlcoholic,
      name: drinkRecipe?.strDrink,
      image: drinkRecipe?.strDrinkThumb,
      doneDate: drinkRecipe?.dateModified,
      tags: drinkRecipe?.strTag,
    };
    const prevLocalStorage = JSON
      .parse(localStorage.getItem('doneRecipes') ?? '[]');
    localStorage.setItem('doneRecipes', JSON
      .stringify([...prevLocalStorage, doneRecipe]));
  };

  const fetchRecipe = async () => {
    const response = await fetchApi(`${ID_DRINKS_LINK}${id}`);
    setDrinkRecipe(response.drinks[0]);
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
    if (drinkRecipe) {
      const maxIngredientes = Object.keys(drinkRecipe)
        .filter((chave) => chave.startsWith('strIngredient')).length;
      for (let i = 1; i <= maxIngredientes; i++) {
        const ingredientChave = `strIngredient${i}`;
        const medidaChave = `strMeasure${i}`;
        const ingrediente = drinkRecipe[ingredientChave];
        const medida = drinkRecipe[medidaChave];

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
    console.log(drinkRecipe);
  }, [drinkRecipe]);

  const handleShareBtn = () => {
    navigator.clipboard.writeText(newUrl)
      .then(() => {
        setLinkCopied(true);
      })
      .catch((err) => console.error('Erro ao copiar: ', err));
  };

  const handleCheck = (i: number) => {
    const newCheckedIngredientsMap = { ...ischecked };
    if (drinkRecipe) {
      const recipeId = drinkRecipe.idDrink;

      if (!newCheckedIngredientsMap.drinks[recipeId]) {
        newCheckedIngredientsMap.drinks[recipeId] = [];
      }

      if (!newCheckedIngredientsMap.drinks[recipeId].includes(i)) {
        newCheckedIngredientsMap.drinks[recipeId].push(i);
      } else {
        const indexToRemove = newCheckedIngredientsMap.drinks[recipeId].indexOf(i);
        newCheckedIngredientsMap.drinks[recipeId].splice(indexToRemove, 1);
      }

      setIschecked(newCheckedIngredientsMap);
    }
  };

  const getCheckedStatus = (index: number) => {
    if (drinkRecipe && ischecked.drinks[drinkRecipe.idDrink]) {
      return ischecked.drinks[drinkRecipe.idDrink].includes(index);
    }
    return false;
  };

  return (
    <>
      =======
      <nav>
        <h1 data-testid="recipe-category">{ drinkRecipe?.strCategory }</h1>
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
      <h2 data-testid="recipe-title">{drinkRecipe?.strDrink}</h2>
      <img
        data-testid="recipe-photo"
        src={ drinkRecipe?.strDrinkThumb }
        alt={ drinkRecipe?.strDrink }
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
              </label>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Instructions</h3>
        <p data-testid="instructions">{drinkRecipe?.strInstructions}</p>
      </div>
      <Link to="/done-recipes">
        <button
          onClick={ handleSaveInLocalStorage }
          data-testid="finish-recipe-btn"
        >
          Finish Recipe
        </button>
      </Link>
    </>
  );
}

export default DetailsDrinkInProgress;
