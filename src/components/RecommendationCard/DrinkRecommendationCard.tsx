import React from 'react';
import { Drink } from '../../context/search-results-context';
import style from './recommendationCard.module.css';

interface RecommendationCardDrinkProps {
  recommendation: Drink;
  image: string;
  index: number;
}

function DrinkRecommendationCard({ recommendation,
  index, image }: RecommendationCardDrinkProps) {
  return (
    <div
      className={ style.recommendationCard }
      data-testid={ `${index}-recommendation-card` }
    >
      <img
        src={ image }
        alt={ recommendation.strDrink }
        className={ style.recommendationImage }
      />
      <h3 data-testid={ `${index}-recommendation-title` }>{recommendation.strDrink}</h3>
    </div>
  );
}

export default DrinkRecommendationCard;
