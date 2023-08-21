import React from 'react';
import RecipeCard from './RecipeCard';

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
    <div>
      {limitedRecipes.map((drink, index) => (
        <RecipeCard
          key={ drink.idDrink }
          index={ index }
          id={ drink.idDrink }
          name={ drink.strDrink }
          image={ drink.strDrinkThumb }
        />
      ))}
    </div>
  );
}

export default DrinkRecipeList;
