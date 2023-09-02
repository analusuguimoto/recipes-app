import React from 'react';
import { vi } from 'vitest';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import * as router from 'react-router';
import { renderWithRouter } from './renderWith';
import MainScreenFood from '../pages/MainScreenFood';
import MainScreenDrink from '../pages/MainScreenDrink';

const startRecipeBtn = 'start-recipe-btn';
const startRecipe = 'Start Recipe';

const navigate = vi.fn();

beforeEach(() => {
  vi.spyOn(router, 'useNavigate').mockImplementation(() => navigate);
});

describe('ButtonRecipeStart', () => {
  it('renders the button and handles click event on meal page', () => {
    renderWithRouter(<MainScreenFood />, {
      initialEntries: ['/meals/52977'],
    });

    const startRecipeButton = screen.getByTestId(startRecipeBtn);
    expect(startRecipeButton).toBeInTheDocument();
    expect(startRecipeButton).toHaveTextContent(startRecipe);

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
    expect(startRecipeButton).toBeInTheDocument();
    expect(startRecipeButton).toHaveTextContent(startRecipe);

    fireEvent.click(startRecipeButton);
    waitFor(() => {
      expect(window.location.pathname).toBe('/drinks/17222/in-progress');
    });
  });
});

describe('ButtonRecipeStart', () => {
  const localStorageMock = {
    getItem: vi.fn(),
  };

  beforeEach(() => {
    localStorageMock.getItem.mockClear();
    navigate.mockClear();

    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
    });
  });

  it('should render the button with "Start Recipe" when recipe is not in progress', () => {
    localStorageMock.getItem.mockReturnValue(null);

    renderWithRouter(<MainScreenFood />, {
      initialEntries: ['/drinks/15997'],
    });
    const startRecipeButton = screen.getByTestId(startRecipeBtn);

    expect(startRecipeButton).toBeInTheDocument();
    expect(startRecipeButton).toHaveTextContent(startRecipe);
  });

  it('should render the button with "Continue Recipe" when recipe is in progress', () => {
    const inProgressRecipes = {
      meals: {
        15997: true,
      },
    };
    localStorageMock.getItem.mockReturnValue(JSON.stringify({ inProgressRecipes }));

    renderWithRouter(<MainScreenFood />, {
      initialEntries: ['/drinks/15997'],
    });
    const startRecipeButton = screen.getByTestId(startRecipeBtn);

    expect(startRecipeButton).toBeInTheDocument();
    expect(startRecipeButton).toHaveTextContent(startRecipe);
  });

  it('should navigate to the correct URL when the button is clicked', () => {
    const inProgressRecipes = {
      meals: {
        52977: true,
      },
    };
    localStorageMock.getItem.mockReturnValue(JSON.stringify({ inProgressRecipes }));

    renderWithRouter(<MainScreenFood />, {
      initialEntries: ['/meals/52977'],
    });
    const startRecipeButton = screen.getByTestId(startRecipeBtn);

    fireEvent.click(startRecipeButton);

    expect(navigate).toHaveBeenCalledWith('/meals/undefined/in-progress');
  });
});
