import { vi } from 'vitest';
import { screen } from '@testing-library/react';
import * as router from 'react-router';
import RecipeDetails from '../../components/RecipeDetails';
import { renderWithRouter } from '../renderWith';
import { RecipeProvider } from '../../context/search-results-context';
import { fetchMockData } from '../../MockRecipes';

global.fetch = vi.fn(fetchMockData) as unknown as any;

describe('Verifica se renderiza', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  test('Verifica drink', async () => {
    vi.spyOn(router, 'useParams').mockImplementation(() => ({ id: '00000' }));
    renderWithRouter(
      <RecipeProvider>
        <RecipeDetails />
      </RecipeProvider>,
      { initialEntries: ['/drinks/00000'] },
    );
    expect(await screen.findByText(/cocktail/i)).toBeInTheDocument();
  });

  test('Verifica meal', async () => {
    vi.spyOn(router, 'useParams').mockImplementation(() => ({ id: '00000' }));
    renderWithRouter(
      <RecipeProvider>
        <RecipeDetails />
      </RecipeProvider>,
      { initialEntries: ['/meals/00000'] },
    );
    expect(await screen.findByText(/side/i)).toBeInTheDocument();
  });
});
