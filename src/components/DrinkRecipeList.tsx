import React from 'react';
import { Link } from 'react-router-dom';
import RecipeCard from './RecipeCard';
import '../App.css';
import '../styles/recipeCard.css';

interface DrinkRecipeListProps {
  drinks: Array<{
    idDrink: string;
    strDrink: string;
    strDrinkThumb: string;
  }>;
}

function DrinkRecipeList({ drinks }: DrinkRecipeListProps) {
  const limitedRecipes = drinks.slice(0, 12);

  return (
    <div className="recipe-card-container">
      {limitedRecipes.map((drink, index) => (
        <Link
          to={ `/drinks/${drink.idDrink}` }
          key={ drink.idDrink }
        >
          <div className="recipe-card">
            <RecipeCard
              key={ drink.idDrink }
              index={ index }
              id={ drink.idDrink }
              name={ drink.strDrink }
              image={ drink.strDrinkThumb }
            />
          </div>
        </Link>
      ))}
    </div>
  );
}

export default DrinkRecipeList;
