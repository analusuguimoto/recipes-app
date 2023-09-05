import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import FavoriteRecipeCard from '../../components/FavoriteRecipeCard/FavoriteRecipeCard';
import { RecipeContextProviderTest } from '../test-context';

function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <Router>
      <RecipeContextProviderTest>{children}</RecipeContextProviderTest>
    </Router>
  );
}

test('renders a favorite recipe card', () => {
  const recipe = {
    id: '1',
    type: 'meal',
    nationality: 'Italian',
    category: 'Pasta',
    alcoholicOrNot: '',
    name: 'Spaghetti',
    image: 'spaghetti.jpg',
  };

  render(
    <Wrapper>
      <FavoriteRecipeCard i={ 0 } recipe={ recipe } />
    </Wrapper>,
  );

  expect(screen.getByTestId('0-horizontal-image')).toBeInTheDocument();
  expect(screen.getByTestId('0-horizontal-name')).toHaveTextContent('Spaghetti');
});

test('renders a favorite recipe card for a drink', () => {
  const recipe = {
    id: '2',
    type: 'drink',
    nationality: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'Margarita',
    image: 'margarita.jpg',
  };

  render(
    <Wrapper>
      <FavoriteRecipeCard i={ 0 } recipe={ recipe } />
    </Wrapper>,
  );

  const topTextElements = screen.getAllByTestId('0-horizontal-top-text');

  expect(topTextElements.length).toBeGreaterThanOrEqual(2);

  topTextElements.forEach((element) => {
    expect(element).toBeInTheDocument();
  });
});

test('renders a favorite recipe card and removes it from favorites when clicked again', () => {
  const recipe = {
    id: '4',
    type: 'drink',
    category: 'Cocktail',
    nationality: 'Italian',
    alcoholicOrNot: 'Alcoholic',
    name: 'Mojito',
    image: 'mojito.jpg',
  };

  render(
    <Wrapper>
      <FavoriteRecipeCard i={ 0 } recipe={ recipe } />
    </Wrapper>,
  );

  const favoriteButton = screen.getByTestId('0-horizontal-favorite-btn');

  expect(favoriteButton).toBeInTheDocument();

  favoriteButton.click();

  expect(screen.getByTestId('0-horizontal-favorite-btn')).toHaveAttribute('src', '/src/images/whiteHeartIcon.svg');
});
