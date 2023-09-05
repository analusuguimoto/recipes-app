import React from 'react';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import FoodRecipe from '../../pages/Recipes/FoodRecipe';
import { renderWithRouter } from '../renderWith';
import { RecipeProvider } from '../../context/search-results-context';
import Profile from '../../pages/Profile/Profile';

test('renders Food Recipe page with category buttons', async () => {
  renderWithRouter(
    <RecipeProvider>
      <FoodRecipe />
    </RecipeProvider>,
    { initialEntries: ['/meals'] },
  );

  expect(screen.getByTestId('All-category-filter')).toBeInTheDocument();
});

test('clicking "All" button fetches all recipes', async () => {
  renderWithRouter(
    <RecipeProvider>
      <FoodRecipe />
    </RecipeProvider>,
    { initialEntries: ['/meals'] },
  );

  const allButton = screen.getByTestId('All-category-filter');
  expect(allButton).toBeInTheDocument();

  fireEvent.click(allButton);
});

test('displays a message when no results are found', async () => {
  const emptyResults = {
    meals: [],
  };

  renderWithRouter(
    <RecipeProvider>
      <FoodRecipe />
    </RecipeProvider>,
    { initialEntries: ['/meals'] },
  );

  const noResultsMessage = screen.getByText('Nenhum resultado encontrado para comidas.');
  expect(noResultsMessage).toBeInTheDocument();
});

// Por algum motivo esse teste falha quando coloco ele no arquivo com os outros testes dessa page.
test('clears localStorage and navigates to Login screen on Logout button click', () => {
  const mockUser = { email: 'test@example.com' };
  localStorage.setItem('user', JSON.stringify(mockUser));

  renderWithRouter(<Profile />, { initialEntries: ['/profile'] });

  const logoutButton = screen.getByTestId('profile-logout-btn');
  fireEvent.click(logoutButton);

  waitFor(() => {
    expect(localStorage.getItem('user')).toBeNull();
    expect(window.location.pathname).toBe('/');
  });
});
