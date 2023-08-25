import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ButtonRecipeStart from '../components/ButtonRecipeStart';
import { fetchApi } from '../helpers/fetchApi';
import { ID_MEALS_LINK } from '../helpers/links';
import { MealType } from '../types';
import shareBtn from '../images/shareBtn.svg';
import likeBtn from '../images/likeBtn.svg';

function DetailsFood() {
  const { id } = useParams<{ id: string }>();
  const [mealRecipe, setMealRecipe] = useState<MealType>();
  const [linkCopied, setLinkCopied] = useState(false);
  const currentUrl = window.location.href;
  const newUrl = currentUrl.substring(0, currentUrl.lastIndexOf('/'));

  const fetchRecipe = async () => {
    const response = await fetchApi(`${ID_MEALS_LINK}${id}`);
    setMealRecipe(response.meals[0]);
  };

  useEffect(() => {
    fetchRecipe();
  }, []);

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
        <input type="checkbox" name="ingredient" id="" />
        1.
        <input type="checkbox" name="" id="" />
        2.
      </div>
      <div>
        <h3>Instructions</h3>
        <p data-testid="instructions">{mealRecipe?.strInstructions}</p>
      </div>
      <div>
        {mealRecipe?.strYoutube ? <iframe title="recipe video" data-testid="video" width="200" height="175" src={ `https://www.youtube.com/embed/${mealRecipe?.strYoutube.split('=')[1]}` } /> : null}
      </div>
      <button
        data-testid="finish-recipe-btn"
      >
        Finish Recipe
      </button>
      <ButtonRecipeStart page="Meal" />
    </>
  );
}

export default DetailsFood;
