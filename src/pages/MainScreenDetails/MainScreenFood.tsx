import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchApi } from '../../helpers/fetchApi';
import { DRINKS_LINK, ID_MEALS_LINK } from '../../helpers/links';
import { useRecipeContext, Drink } from '../../context/search-results-context';
import
DrinkRecommendationCard
  from '../../components/RecommendationCard/DrinkRecommendationCard';
import shareBtn from '../../images/shareBtn.svg';
import { MealType } from '../../types';
import ButtonRecipeStart from '../../components/ButtonoRecipeStart/ButtonRecipeStart';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import style from './screenDetails.module.css';

function MainScreenFood() {
  const { id } = useParams<{ id: string }>();
  const [mealRecipe, setMealRecipe] = useState<MealType>();
  const [linkCopied, setLinkCopied] = useState(false);
  const currentUrl = window.location.href;
  const [drinkRecommendations, setDrinkRecommendations] = useState<Drink[]>([]);
  const [ingredients, setIngredients] = useState<string[]>([]);
  const { favoriteRecipes, setFavoriteRecipes } = useRecipeContext();
  const [isFavorite, setIsFavorite] = useState(false);

  const fetchRecommendations = async () => {
    const response = await fetchApi(DRINKS_LINK);
    setDrinkRecommendations(response.drinks);
  };

  const fetchRecipe = async () => {
    const response = await fetchApi(`${ID_MEALS_LINK}${id}`);
    setMealRecipe(response.meals[0]);
  };

  useEffect(() => {
    fetchRecipe();
    fetchRecommendations();
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

  useEffect(() => {
    const getFromLS = JSON.parse(localStorage.getItem('favoriteRecipes') as string);

    if (getFromLS) {
      setFavoriteRecipes(getFromLS);
    }
  }, []);

  const handleShareBtn = () => {
    navigator.clipboard.writeText(currentUrl)
      .then(() => {
        setLinkCopied(true);
      })
      .catch((err) => console.error('Erro ao copiar: ', err));
  };

  const handleFavoriteMeal = () => {
    const checkFav = favoriteRecipes?.some((item) => item.id === mealRecipe?.idMeal);
    console.log(checkFav, mealRecipe?.idMeal);

    if (checkFav) {
      setIsFavorite(false);
      const copyOfFavorites = favoriteRecipes
        .filter((favItem) => favItem.id !== mealRecipe?.idMeal);
      setFavoriteRecipes(copyOfFavorites);
      const favoriteStringfy = JSON.stringify(copyOfFavorites);
      localStorage.setItem('favoriteRecipes', favoriteStringfy);
      return true;
    }

    const updatedFavRecipes = [...favoriteRecipes, {
      id: mealRecipe?.idMeal,
      type: 'meal',
      nationality: mealRecipe?.strArea,
      category: mealRecipe?.strCategory,
      alcoholicOrNot: '',
      name: mealRecipe?.strMeal,
      image: mealRecipe?.strMealThumb,
    }];
    setFavoriteRecipes(updatedFavRecipes);

    setIsFavorite(true);

    const favStringfy = JSON.stringify(updatedFavRecipes);
    localStorage.setItem('favoriteRecipes', favStringfy);
  };

  const existingRecipe = favoriteRecipes.find((item) => item.id === mealRecipe?.idMeal);

  return (
    <>
      <nav className={ style.navContainer }>
        <h1
          data-testid="recipe-category"
        >
          { mealRecipe?.strCategory }
        </h1>
        <div className={ style.btnHeaderContainer }>
          <button
            className={ style.shareBtn }
            data-testid="share-btn"
            onClick={ () => handleShareBtn() }
          >
            { !linkCopied ? <img src={ shareBtn } alt="Botão de Compartilhamento" />
              : <span>Link copied!</span>}
          </button>
          <button
            className={ style.likeBtn }
            onClick={ handleFavoriteMeal }
          >
            <img
              data-testid="favorite-btn"
              src={ existingRecipe ? blackHeartIcon : whiteHeartIcon }
              alt="Botão de dar Like em uma receita"
            />
          </button>
        </div>
      </nav>
      <div
        className={ style.recipeImgContainer }
      >
        <img
          className={ style.recipeImg }
          data-testid="recipe-photo"
          src={ mealRecipe?.strMealThumb }
          alt={ mealRecipe?.strMeal }
        />
        <h2
          className={ style.recipeName }
          data-testid="recipe-title"
        >
          { mealRecipe?.strMeal }
        </h2>
      </div>
      <div
        className={ style.divContainer }
      >
        <h3 className={ style.divTitle }>Ingredients</h3>
        <ul className={ style.ingredientList }>
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
      <div className={ style.divContainer }>
        <h3 className={ style.divTitle }>Instructions</h3>
        <p
          className={ style.instructionsText }
          data-testid="instructions"
        >
          { mealRecipe?.strInstructions }

        </p>
      </div>
      <h3 className={ style.videoTitle }>Video</h3>
      <div
        className={ style.ytContainer }
      >
        { mealRecipe?.strYoutube ? <iframe title="recipe video" data-testid="video" width="560" height="315" src={ `https://www.youtube.com/embed/${mealRecipe?.strYoutube.split('=')[1]}` } /> : null }
      </div>
      <div className={ style.recContainer }>
        <h3 className={ style.recTitle }>Recommendations</h3>
        <div className={ style.recommendationCarousel }>
          {drinkRecommendations.slice(0, 6).map((recommendation, index) => (
            <DrinkRecommendationCard
              key={ recommendation.idDrink }
              recommendation={ recommendation }
              index={ index }
              image={ recommendation.strDrinkThumb }
            />
          ))}
        </div>
      </div>
      <ButtonRecipeStart page="Meal" recipeId={ id } />
    </>
  );
}

export default MainScreenFood;
