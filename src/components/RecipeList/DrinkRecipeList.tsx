import React from 'react';
import { Link } from 'react-router-dom';
import RecipeCard from '../RecipeCard/RecipeCard';
import style from './RecipeList.module.css';

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
    <div className={ style.recipeCardContainer }>
      {limitedRecipes.map((drink, index) => (
        <Link
          className={ style.linkCard }
          to={ `/drinks/${drink.idDrink}` }
          key={ drink.idDrink }
        >
          <div className={ style.recipeCard }>
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
