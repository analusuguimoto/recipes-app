import React from 'react';
import { Meal } from '../../context/search-results-context';
import style from './recommendationCard.module.css';

interface RecommendationCardMealProps {
  recipe: Meal;
  image: string;
  index: number;
}

function MealRecommendationCard({ recipe, index, image }: RecommendationCardMealProps) {
  return (
    <div
      className={ style.recommendationCard }
      data-testid={ `${index}-recommendation-card` }
    >
      <img
        src={ image }
        alt={ recipe.strMeal }
        className={ style.recommendationImage }
      />
      <h3 data-testid={ `${index}-recommendation-title` }>{recipe.strMeal}</h3>
    </div>
  );
}

export default MealRecommendationCard;
