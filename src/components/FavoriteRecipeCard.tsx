import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Favorites, useRecipeContext } from '../context/search-results-context';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import '../styles/donePage.css';

type CardProp = {
  i: number,
  recipe: Favorites,
};

function FavoriteRecipeCard({ i, recipe }: CardProp) {
  const [linkCopied, setLinkCopied] = useState(false);
  const { favoriteRecipes, setFavoriteRecipes } = useRecipeContext();
  const [isFavorite, setIsFavorite] = useState(false);
  const urlRecipe = `http://localhost:3000/${recipe.type}s/${recipe.id}`;

  const handleShareBtn = (url: string) => {
    navigator.clipboard.writeText(url)
      .then(() => {
        setLinkCopied(true);
      })
      .catch((err) => console.error('Erro ao copiar: ', err));
  };

  useEffect(() => {
    const favItmesLS = JSON.parse(localStorage.getItem('favoriteRecipes') as string);
    setFavoriteRecipes(favItmesLS);
  }, []);

  const handleFavoriteMeal = () => {
    const checkFav = favoriteRecipes?.some((item) => item.id === recipe.id);

    if (checkFav) {
      setIsFavorite(false);
      const copyOfFavorites = favoriteRecipes
        .filter((favItem) => favItem.id !== recipe.id);
      setFavoriteRecipes(copyOfFavorites);
      const favoriteStringfy = JSON.stringify(copyOfFavorites);
      localStorage.setItem('favoriteRecipes', favoriteStringfy);
      return true;
    }

    const updatedFavRecipes = [...favoriteRecipes, {
      id: recipe.id,
      type: recipe.type,
      nationality: recipe.nationality,
      category: recipe.category,
      alcoholicOrNot: recipe.alcoholicOrNot,
      name: recipe.name,
      image: recipe.image,
    }];
    setFavoriteRecipes(updatedFavRecipes);

    setIsFavorite(true);

    const favStringfy = JSON.stringify(updatedFavRecipes);
    localStorage.setItem('favoriteRecipes', favStringfy);
  };

  const existingRecipe = favoriteRecipes.find((item) => item.id === recipe.id);

  return (
    <div key={ i } className="recipe-card">
      <div className="recipe-image">
        <Link to={ urlRecipe }>
          <img
            data-testid={ `${i}-horizontal-image` }
            src={ recipe.image }
            alt={ recipe.name }
            width="100px"
          />
        </Link>
      </div>
      <div className="recipe-details">
        <Link to={ urlRecipe } className="title-fav">
          <h3
            data-testid={ `${i}-horizontal-name` }
          >
            { recipe.name }
          </h3>
        </Link>
        <p
          data-testid={ `${i}-horizontal-top-text` }
        >
          {
            recipe.type === 'meal'
              ? `${recipe.nationality} - ${recipe.category}`
              : `${recipe.category}`
          }
        </p>
        {
          recipe.type === 'drink'
            ? <p data-testid={ `${i}-horizontal-top-text` }>{ recipe.alcoholicOrNot }</p>
            : null
        }
      </div>
      <div className="share-like-container">
        <button
          className="share-btn-fav"
          onClick={
                  () => handleShareBtn(urlRecipe)
                }
        >
          { !linkCopied ? <img
            src={ shareIcon }
            alt="Botão de Compartilhamento"
            data-testid={ `${i}-horizontal-share-btn` }
          />
            : <span>Link copied!</span>}
        </button>

        <button
          className="like-btn-fav"
          onClick={ handleFavoriteMeal }
        >
          <img
            data-testid={ `${i}-horizontal-favorite-btn` }
            src={ existingRecipe ? blackHeartIcon : whiteHeartIcon }
            alt="Botão de dar Like em uma receita"
          />
        </button>
      </div>
    </div>

  );
}

export default FavoriteRecipeCard;
