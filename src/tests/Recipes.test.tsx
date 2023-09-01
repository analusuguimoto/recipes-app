import { MemoryRouter } from 'react-router-dom';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { renderWithRouter } from './renderWith';
// import Recipes from '../pages/Recipes';
import App from '../App';
import { RecipeProvider } from '../context/search-results-context';
import { meals, mealsChickenIngredient } from '../MockDataResults';

const emailTest = 'test@test.co';
const passwordTest = 'sdwsdasd12!';

describe('Testes de Recipes - Rota Meals', async () => {
  test('Testa se a seção de Meals funciona corretamente', async () => {
    renderWithRouter(
      <RecipeProvider>
        <App />
      </RecipeProvider>,
    );

    const loginButton = screen.getByRole('button', { name: 'Entrar' });
    expect(loginButton).toBeInTheDocument();
    expect(loginButton).toBeDisabled();

    const emailInput = screen.getByPlaceholderText(/Digite seu email/i);
    const passwordInput = screen.getByPlaceholderText(/Digite sua senha/i);
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();

    await userEvent.type(emailInput, emailTest);
    await userEvent.type(passwordInput, passwordTest);
    expect(loginButton).not.toBeDisabled();

    await userEvent.click(loginButton);

    const allBtn = await screen.findByRole('button', { name: /all/i });
    expect(allBtn).toBeInTheDocument();

    const beefBtn = await screen.findByTestId('Beef-category-filter');
    expect(beefBtn).toBeInTheDocument();

    const breakfastBtn = await screen.findByRole('button', { name: /breakfast/i });
    expect(breakfastBtn).toBeInTheDocument();

    const chickenBtn = await screen.findByRole('button', { name: /chicken/i });
    expect(chickenBtn).toBeInTheDocument();

    await userEvent.click(chickenBtn);
    const chickenRecipe = await screen.findByText(/ayam percik/i);
    expect(chickenRecipe).toBeInTheDocument();

    await userEvent.click(beefBtn);
    const beefRecipe = await screen.findByText(/beef asado/i);
    expect(beefRecipe).toBeInTheDocument();

    await userEvent.click(beefBtn);
    const sushi = await screen.findByRole('img', { name: /sushi/i });
    expect(sushi).toBeInTheDocument();
  });

  test('verifica se a API é chamada', async () => {
    renderWithRouter(
      <RecipeProvider>
        <App />
      </RecipeProvider>,
    );

    // global.fetch = vi.fn().mockResolvedValue({
    //   json: async () => meals,
    // });

    const loginButton = screen.getByRole('button', { name: 'Entrar' });
    expect(loginButton).toBeInTheDocument();
    expect(loginButton).toBeDisabled();

    const emailInput = screen.getByPlaceholderText(/Digite seu email/i);
    const passwordInput = screen.getByPlaceholderText(/Digite sua senha/i);
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();

    await userEvent.type(emailInput, emailTest);
    await userEvent.type(passwordInput, passwordTest);
    expect(loginButton).not.toBeDisabled();

    await userEvent.click(loginButton);
    // expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  test.only('verifica se a pag de drinks funciona corretamente', async () => {
    renderWithRouter(
      <RecipeProvider>
        <App />
      </RecipeProvider>,
    );

    const loginButton = screen.getByRole('button', { name: 'Entrar' });
    expect(loginButton).toBeInTheDocument();
    expect(loginButton).toBeDisabled();

    const emailInput = screen.getByPlaceholderText(/Digite seu email/i);
    const passwordInput = screen.getByPlaceholderText(/Digite sua senha/i);
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();

    await userEvent.type(emailInput, emailTest);
    await userEvent.type(passwordInput, passwordTest);
    expect(loginButton).not.toBeDisabled();

    await userEvent.click(loginButton);
    const drinkBtn = screen.getByTestId('drinks-bottom-link');
    expect(drinkBtn).toBeInTheDocument();
    await userEvent.click(drinkBtn);

    const allBtn = await screen.findByRole('button', { name: /all/i });
    expect(allBtn).toBeInTheDocument();

    await waitFor(() => {
      const coctailBtn = screen.getByRole('button', { name: /cocktail/i });
      expect(coctailBtn).toBeInTheDocument();
    });
  });
});
