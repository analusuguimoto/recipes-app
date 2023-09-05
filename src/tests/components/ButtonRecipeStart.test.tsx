import React from 'react';
import { vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import * as router from 'react-router';
import { renderWithRouter } from '../renderWith';
import MainScreenFood from '../../pages/MainScreenDetails/MainScreenFood';
import MainScreenDrink from '../../pages/MainScreenDetails/MainScreenDrink';
import ButtonRecipeStart from '../../components/ButtonoRecipeStart/ButtonRecipeStart';

const startRecipeBtn = 'start-recipe-btn';

const navigate = vi.fn();

beforeEach(() => {
  vi.spyOn(router, 'useNavigate').mockImplementation(() => navigate);
});

const localStorageWithoutRecipeInProgress = {
  getItem: vi.fn(() => {
    return null;
  }),
};

const localStorageWithRecipeInProgress = {
  getItem: vi.fn((key) => {
    if (key === 'inProgressRecipes') {
      return JSON.stringify({ meals: { 12345: 'in-progress' } });
    }
    return null;
  }),
};

describe('ButtonRecipeStart', () => {
  it('renders the button and handles click event on meal page', () => {
    renderWithRouter(<MainScreenFood />, {
      initialEntries: ['/meals/52977'],
    });

    const startRecipeButton = screen.getByTestId(startRecipeBtn);

    fireEvent.click(startRecipeButton);
    waitFor(() => {
      expect(window.location.pathname).toBe('/meals/15997/in-progress');
    });
  });

  it('renders the button and handles click event on drinks page', () => {
    renderWithRouter(<MainScreenDrink />, {
      initialEntries: ['/drinks/17222'],
    });

    const startRecipeButton = screen.getByTestId(startRecipeBtn);

    fireEvent.click(startRecipeButton);
    waitFor(() => {
      expect(window.location.pathname).toBe('/drinks/17222/in-progress');
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
    render(<ButtonRecipeStart page="Meal" recipeId="12345" />);
    const startRecipeButton = screen.getByTestId(startRecipeBtn);
    expect(startRecipeButton).toBeInTheDocument();
    expect(startRecipeButton).toHaveTextContent('Continue Recipe');

    fireEvent.click(startRecipeButton);
    waitFor(() => {
      expect(window.location.pathname).toBe('/meals/12345/in-progress');
    });
  });

  it('renders "Continue Recipe" when there is a recipe in progress and navigates correctly to drinks', () => {
    render(<ButtonRecipeStart page="Drink" recipeId="12345" />);
    const startRecipeButton = screen.getByTestId(startRecipeBtn);
    expect(startRecipeButton).toBeInTheDocument();
    expect(startRecipeButton).toHaveTextContent('Continue Recipe');

    fireEvent.click(startRecipeButton);
    waitFor(() => {
      expect(window.location.pathname).toBe('/drinks/12345/in-progress');
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
    render(<ButtonRecipeStart page="Meal" recipeId="12345" />);
    const startRecipeButton = screen.getByTestId(startRecipeBtn);
    expect(startRecipeButton).toBeInTheDocument();
    expect(startRecipeButton).toHaveTextContent('Start Recipe');
  });
});
