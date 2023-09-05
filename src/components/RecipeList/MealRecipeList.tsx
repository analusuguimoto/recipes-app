import React from 'react';
import { Link } from 'react-router-dom';
import RecipeCard from '../RecipeCard/RecipeCard';
import style from './RecipeList.module.css';

interface RecipeListProps {
  recipes: Array<{
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
  }>;
}

function RecipeList({ recipes }: RecipeListProps) {
  const limitedRecipes = recipes.slice(0, 12);

  return (

    <div className={ style.recipeCardContainer }>
      {limitedRecipes.map((recipe, index) => (
        <Link
          className={ style.linkCard }
          to={ `/meals/${recipe.idMeal}` }
          key={ recipe.idMeal }
        >
          <div className={ style.recipeCard }>
            <RecipeCard
              key={ recipe.idMeal }
              index={ index }
              id={ recipe.idMeal }
              name={ recipe.strMeal }
              image={ recipe.strMealThumb }
            />
          </div>
        </Link>
      ))}
    </div>
  );
}

export default RecipeList;
