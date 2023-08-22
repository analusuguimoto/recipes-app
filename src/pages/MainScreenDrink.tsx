import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ID_DRINKS_LINK } from '../helpers/links';
import { fetchApi } from '../helpers/fetchApi';
import { DrinkType } from '../types';

function MainScreenDrink() {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<DrinkType>();

  const fetchRecipe = async () => {
    const response = await fetchApi(`${ID_DRINKS_LINK}${id}`);
    setRecipe(response.drinks[0]);
    console.log(response);
  };
  useEffect(() => {
    fetchRecipe();
  }, []);

  return (
    <>
      <h1 data-testid="recipe-category">{ recipe?.strCategory }</h1>
      <h2 data-testid="recipe-title">{ recipe?.strDrink }</h2>
      <img
        data-testid="recipe-photo"
        src={ recipe?.strDrinkThumb }
        alt={ recipe?.strDrink }
        style={ { maxWidth: '200px', height: 'auto' } }
      />
      <div>
        <h3>Ingredients</h3>

      </div>
      <div>
        <h3>Instructions</h3>
        <p data-testid="instructions">{ recipe?.strInstructions }</p>
      </div>
    </>
  );
}

export default MainScreenDrink;
