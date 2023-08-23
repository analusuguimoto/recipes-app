import React from 'react';
import { Meal } from '../context/search-results-context';
import '../App.css';

interface RecommendationCardMealProps {
  recipe: Meal;
  image: string;
  index: number;
}

function MealRecommendationCard({ recipe, index, image }: RecommendationCardMealProps) {
  return (
    <div className="recommendation-card" data-testid={ `${index}-recommendation-card` }>
      <img
        src={ image }
        alt={ recipe.strMeal }
        className="recommendation-image"
      />
      <h3 data-testid={ `${index}-recommendation-title` }>{recipe.strMeal}</h3>
    </div>
  );
}

export default MealRecommendationCard;
