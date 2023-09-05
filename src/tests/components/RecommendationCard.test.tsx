import React from 'react';
import { render } from '@testing-library/react';
import DrinkRecommendationCard from '../../components/RecommendationCard/DrinkRecommendationCard';
import MealRecommendationCard from '../../components/RecommendationCard/MealRecommendationCard';

describe('Recomendation cards', () => {
  it('renders the recommendation card with title and image', () => {
    const recommendation = {
      idDrink: '1',
      strDrink: 'Test Drink',
      strDrinkThumb: 'test-image.jpg',
    };
    const { getByTestId } = render(
      <DrinkRecommendationCard
        recommendation={ recommendation }
        index={ 0 }
        image="test-image.jpg"
      />,
    );

    const recommendationCard = getByTestId('0-recommendation-card');
    const recommendationTitle = getByTestId('0-recommendation-title');

    expect(recommendationCard).toBeInTheDocument();
    expect(recommendationTitle).toBeInTheDocument();
    expect(recommendationTitle.textContent).toBe('Test Drink');
  });

  it('renders the recommendation card with title and image', () => {
    const recipe = {
      idMeal: '1',
      strMeal: 'Test Meal',
      strMealThumb: 'test-image.jpg',
    };
    const { getByTestId } = render(
      <MealRecommendationCard
        recipe={ recipe }
        index={ 0 }
        image="test-image.jpg"
      />,
    );
    const recommendationCard = getByTestId('0-recommendation-card');
    const recommendationTitle = getByTestId('0-recommendation-title');

    expect(recommendationCard).toBeInTheDocument();
    expect(recommendationTitle).toBeInTheDocument();
    expect(recommendationTitle.textContent).toBe('Test Meal');
  });
});
