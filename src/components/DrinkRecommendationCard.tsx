import React from 'react';
import { Drink } from '../context/search-results-context';
import '../App.css';

interface RecommendationCardDrinkProps {
  recommendation: Drink;
  image: string;
  index: number;
}

function DrinkRecommendationCard({ recommendation,
  index, image }: RecommendationCardDrinkProps) {
  return (
    <div className="recommendation-card" data-testid={ `${index}-recommendation-card` }>
      <img
        src={ image }
        alt={ recommendation.strDrink }
        className="recommendation-image"
        width="100px"
      />
      <h3 data-testid={ `${index}-recommendation-title` }>{recommendation.strDrink}</h3>
    </div>
  );
}

export default DrinkRecommendationCard;
