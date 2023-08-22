import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchApi } from '../helpers/fetchApi';
import { ID_MEALS_LINK } from '../helpers/links';
import { MealType } from '../types';

function MainScreenFood() {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<MealType>();

  const fetchRecipe = async () => {
    const response = await fetchApi(`${ID_MEALS_LINK}${id}`);
    setRecipe(response.meals[0]);
    console.log(response);
  };
  useEffect(() => {
    fetchRecipe();
  }, []);

  return (
    <>
      <h1 data-testid="recipe-category">{ recipe?.strCategory }</h1>
      <h2 data-testid="recipe-title">{ recipe?.strMeal }</h2>
      <img
        data-testid="recipe-photo"
        src={ recipe?.strMealThumb }
        alt={ recipe?.strMeal }
        style={ { maxWidth: '200px', height: 'auto' } }
      />
      <div>
        <h3>Ingredients</h3>

      </div>
      <div>
        <h3>Instructions</h3>
        <p data-testid="instructions">{ recipe?.strInstructions }</p>
      </div>
      <div>
        { recipe?.strYoutube ? <iframe title="recipe video" data-testid="video" width="560" height="315" src={ `https://www.youtube.com/embed/${recipe?.strYoutube.split('=')[1]}` } /> : null }
      </div>
    </>
  );
}

export default MainScreenFood;
