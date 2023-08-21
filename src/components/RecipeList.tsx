import React from 'react';
import RecipeCard from './RecipeCard';

interface RecipeListProps {
  recipes: Array<{
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
  }>;
}

function RecipeList({ recipes }: RecipeListProps) {
  return (
    <div>
      {recipes.map((recipe, index) => (
        <RecipeCard
          key={ recipe.idMeal }
          index={ index }
          id={ recipe.idMeal }
          name={ recipe.strMeal }
          image={ recipe.strMealThumb }
        />
      ))}
    </div>
  );
}

export default RecipeList;
