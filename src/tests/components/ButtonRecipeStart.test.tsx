import React from 'react';
import { vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import * as router from 'react-router';
import { renderWithRouter } from '../renderWith';
import MainScreenFood from '../../pages/MainScreenFood';
import MainScreenDrink from '../../pages/MainScreenDrink';
import ButtonRecipeStart from '../../components/ButtonRecipeStart';
import { fetchMockData } from '../../MockRecipes';

const startRecipeBtn = 'start-recipe-btn';

global.fetch = vi.fn(fetchMockData) as unknown as any;

const navigate = vi.fn();

beforeEach(() => {
  vi.spyOn(router, 'useNavigate').mockImplementation(() => navigate);
  vi.spyOn(router, 'useParams').mockImplementation(() => ({ id: '00000' }));
});

const localStorageWithoutRecipeInProgress = {
  getItem: vi.fn(() => {
    return null;
  }),
};

const localStorageWithRecipeInProgress = {
  getItem: vi.fn((key) => {
    if (key === 'inProgressRecipes') {
      return JSON.stringify({ meals: { '00000': 'in-progress' } });
    }
    return null;
  }),
};

describe('ButtonRecipeStart', () => {
  it('renders the button and handles click event on meal page', () => {
    renderWithRouter(<MainScreenFood />, {
      initialEntries: ['/meals/00000'],
    });

    const startRecipeButton = screen.getByTestId(startRecipeBtn);

    fireEvent.click(startRecipeButton);
    waitFor(() => {
      expect(window.location.pathname).toBe('/meals/00000/in-progress');
    });
  });

  it('renders the button and handles click event on drinks page', () => {
    renderWithRouter(<MainScreenDrink />, {
      initialEntries: ['/drinks/00000'],
    });

    const startRecipeButton = screen.getByTestId(startRecipeBtn);

    fireEvent.click(startRecipeButton);
    waitFor(() => {
      expect(window.location.pathname).toBe('/drinks/00000/in-progress');
    });
  });
});

describe('ButtonRecipeStart', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'localStorage', {
      value: localStorageWithRecipeInProgress,
      writable: true,
    });
  });

  it('renders "Continue Recipe" when there is a recipe in progress and navigates correctly to meals', () => {
    render(<ButtonRecipeStart page="Meal" recipeId="00000" />);
    const startRecipeButton = screen.getByTestId(startRecipeBtn);
    expect(startRecipeButton).toBeInTheDocument();
    expect(startRecipeButton).toHaveTextContent('Continue Recipe');

    fireEvent.click(startRecipeButton);
    waitFor(() => {
      expect(window.location.pathname).toBe('/meals/00000/in-progress');
    });
  });

  it('renders "Continue Recipe" when there is a recipe in progress and navigates correctly to drinks', () => {
    render(<ButtonRecipeStart page="Drink" recipeId="00000" />);
    const startRecipeButton = screen.getByTestId(startRecipeBtn);
    expect(startRecipeButton).toBeInTheDocument();
    expect(startRecipeButton).toHaveTextContent('Continue Recipe');

    fireEvent.click(startRecipeButton);
    waitFor(() => {
      expect(window.location.pathname).toBe('/drinks/00000/in-progress');
    });
  });
});

describe('ButtonRecipeStart', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'localStorage', {
      value: localStorageWithoutRecipeInProgress,
      writable: true,
    });
  });

  it('renders "Start Recipe" when there is no recipe in progress', () => {
    render(<ButtonRecipeStart page="Meal" recipeId="00000" />);
    const startRecipeButton = screen.getByTestId(startRecipeBtn);
    expect(startRecipeButton).toBeInTheDocument();
    expect(startRecipeButton).toHaveTextContent('Start Recipe');
  });
});
