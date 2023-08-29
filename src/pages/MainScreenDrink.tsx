import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ID_DRINKS_LINK, MEALS_LINK } from '../helpers/links';
import { fetchApi } from '../helpers/fetchApi';
import MealRecommendationCard from '../components/MealRecommendationCard';
import { useRecipeContext, Meal } from '../context/search-results-context';
import '../App.css';
import { DrinkType } from '../types';
import shareBtn from '../images/shareBtn.svg';
import likeBtn from '../images/likeBtn.svg';
import ButtonRecipeStart from '../components/ButtonRecipeStart';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

function MainScreenDrink() {
  const { id } = useParams<{ id: string }>();
  const [drinkRecipe, setDrinkRecipe] = useState<DrinkType>();
  const [linkCopied, setLinkCopied] = useState(false);
  const currentUrl = window.location.href;
  const [mealRecommendations, setMealRecommendations] = useState<Meal[]>([]);
  const [ingredients, setIngredients] = useState<string[]>([]);
  const { favoriteRecipes, setFavoriteRecipes } = useRecipeContext();
  const [isFavorite, setIsFavorite] = useState(false);

  const fetchRecommendations = async () => {
    const response = await fetchApi(MEALS_LINK);
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

  useEffect(() => {
    const ingredientsArray = [] as string[];
    if (drinkRecipe) {
      const maxIngredientes = Object.keys(drinkRecipe)
        .filter((chave) => chave.startsWith('strIngredient')).length;
      for (let i = 1; i <= maxIngredientes; i++) {
        const ingredientChave = `strIngredient${i}`;
        const medidaChave = `strMeasure${i}`;
        const ingrediente = drinkRecipe[ingredientChave];
        const medida = drinkRecipe[medidaChave];

        if (medida && ingrediente) {
          ingredientsArray.push(`${medida} of ${ingrediente}`);
        }
      }
    }
    setIngredients(ingredientsArray);
  }, [drinkRecipe]);

  useEffect(() => {
    const getFromLS = JSON.parse(localStorage.getItem('favoriteRecipes') as string);

    if (getFromLS) {
      setFavoriteRecipes(getFromLS);
      console.log(favoriteRecipes);
    }
  }, []);

  const handleShareBtn = () => {
    navigator.clipboard.writeText(currentUrl)
      .then(() => {
        setLinkCopied(true);
      })
      .catch((err) => console.error('Erro ao copiar: ', err));
  };

  const handleFavoriteDrink = () => {
    const checkFav = favoriteRecipes?.some((item) => item.id === drinkRecipe?.idDrink);

    if (checkFav) {
      setIsFavorite(false);
      const copyOfFavorites = favoriteRecipes
        .filter((favItem) => favItem.id !== drinkRecipe?.idDrink);
      setFavoriteRecipes(copyOfFavorites);
      const favoriteStringfy = JSON.stringify(copyOfFavorites);
      localStorage.setItem('favoriteRecipes', favoriteStringfy);
      return true;
    }

    const updatedFavRecipes = [...favoriteRecipes, {
      id: drinkRecipe?.idDrink,
      type: 'drink',
      nationality: '',
      category: drinkRecipe?.strCategory,
      alcoholicOrNot: drinkRecipe?.strAlcoholic,
      name: drinkRecipe?.strDrink,
      image: drinkRecipe?.strDrinkThumb,
    }];

    setFavoriteRecipes(updatedFavRecipes);

    setIsFavorite(true);

    const favStringfy = JSON.stringify(updatedFavRecipes);
    localStorage.setItem('favoriteRecipes', favStringfy);
  };

  const existingRecipe = favoriteRecipes.find((item) => item.id === drinkRecipe?.idDrink);

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
            onClick={ handleFavoriteDrink }
          >
            <img
              data-testid="favorite-btn"
              src={ existingRecipe ? blackHeartIcon : whiteHeartIcon }
              alt="Botão de dar Like em uma receita"
            />
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
        <ul>
          {ingredients.map((ingredient, i) => (
            <li
              key={ i }
              data-testid={ `${i}-ingredient-name-and-measure` }
            >
              {ingredient}
            </li>
          ))}
        </ul>
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
      <ButtonRecipeStart page="Drink" recipeId={ id } />
    </>
  );
}

export default MainScreenDrink;
