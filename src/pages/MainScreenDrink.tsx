import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ID_DRINKS_LINK } from '../helpers/links';
import { fetchApi } from '../helpers/fetchApi';
import MealRecommendationCard from '../components/MealRecommendationCard';
import { Meal } from '../context/search-results-context';
import '../App.css';
import { DrinkType } from '../types';
import shareBtn from '../images/shareBtn.svg';
import likeBtn from '../images/likeBtn.svg';

function MainScreenDrink() {
  const { id } = useParams<{ id: string }>();
  const [drinkRecipe, setDrinkRecipe] = useState<DrinkType>();
  const [linkCopied, setLinkCopied] = useState(false);
  const currentUrl = window.location.href;
  const [mealRecommendations, setMealRecommendations] = useState<Meal[]>([]);

  const fetchRecommendations = async () => {
    const response = await fetchApi('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    setMealRecommendations(response.meals);
  };

  const fetchRecipe = async () => {
    const response = await fetchApi(`${ID_DRINKS_LINK}${id}`);
    setDrinkRecipe(response.drinks[0]);
  };

  useEffect(() => {
    fetchRecipe();
    fetchRecommendations();
  }, []);

  const handleShareBtn = () => {
    navigator.clipboard.writeText(currentUrl)
      .then(() => {
        setLinkCopied(true);
      })
      .catch((err) => console.error('Erro ao copiar: ', err));
  };

  return (
    <>
      <nav>
        <h1>{ drinkRecipe?.strCategory }</h1>
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
      <h2 data-testid="recipe-title">{ drinkRecipe?.strDrink }</h2>
      <img
        data-testid="recipe-photo"
        src={ drinkRecipe?.strDrinkThumb }
        alt={ drinkRecipe?.strDrink }
        style={ { maxWidth: '200px', height: 'auto' } }
      />
      <p data-testid="recipe-category">{ drinkRecipe?.strAlcoholic }</p>
      <div>
        <h3>Ingredients</h3>

      </div>
      <div>
        <h3>Instructions</h3>
        <p data-testid="instructions">{ drinkRecipe?.strInstructions }</p>
      </div>
      <div>
        <h3>Recommendations</h3>
        <div className="recommendation-carousel">
          {mealRecommendations.slice(0, 6).map((meal, index) => (
            <MealRecommendationCard
              key={ meal.idMeal }
              recipe={ meal }
              index={ index }
              image={ meal.strMealThumb }
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default MainScreenDrink;
