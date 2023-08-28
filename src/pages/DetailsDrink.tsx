import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchApi } from '../helpers/fetchApi';
import { ID_DRINKS_LINK } from '../helpers/links';
import { DrinkType, IngredientsType, CheckedIngredient } from '../types';
import shareBtn from '../images/shareBtn.svg';
import likeBtn from '../images/likeBtn.svg';

function DetailsDrink() {
  const { id } = useParams<{ id: string }>();
  const [drinkRecipe, setDrinkRecipe] = useState<DrinkType>();
  const [linkCopied, setLinkCopied] = useState(false);
  const [ingredients, setIngredients] = useState<IngredientsType[]>([]);
  const [ischecked, setIschecked] = useState<CheckedIngredient[]>([]);
  const currentUrl = window.location.href;
  const newUrl = currentUrl.substring(0, currentUrl.lastIndexOf('/'));

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
  }, [drinkRecipe]);

  const handleShareBtn = () => {
    navigator.clipboard.writeText(newUrl)
      .then(() => {
        setLinkCopied(true);
      })
      .catch((err) => console.error('Erro ao copiar: ', err));
  };

  const handleCheck = (i: any) => {
    const newCheckedIngredientsMap = [...ischecked];
    if (drinkRecipe) {
      const recipeId = drinkRecipe?.idMeal;
      const existingRecipeIndex = newCheckedIngredientsMap
        .findIndex((item) => item.recipeId === recipeId);

      if (existingRecipeIndex === -1) {
        newCheckedIngredientsMap.push({ recipeId, ingredientsChecked: { [i]: true } });
      } else {
        const existingChecked = newCheckedIngredientsMap[existingRecipeIndex]
          .ingredientsChecked || {};
        newCheckedIngredientsMap[existingRecipeIndex].ingredientsChecked = {
          ...existingChecked,
          [i]: !existingChecked[i],
        };
      }

      setIschecked(newCheckedIngredientsMap);
    }
  };

  const getCheckedStatus = (index: number) => {
    const recipeId = drinkRecipe?.idMeal;
    const existingRecipe = ischecked.find((item) => item.recipeId === recipeId);

    return existingRecipe
      && existingRecipe.ingredientsChecked && existingRecipe.ingredientsChecked[index];
  };

  return (
    <>
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
      <button
        data-testid="finish-recipe-btn"
      >
        Finish Recipe
      </button>
    </>
  );
}

export default DetailsDrink;
