import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { renderWithRouter } from '../renderWith';
import App from '../../App';
import { RecipeProvider } from '../../context/search-results-context';
import { fetchMockData } from '../../MockRecipes';
//

const emailTest = 'test@test.co';
const passwordTest = 'sdwsdasd12!';

describe('Testes de Recipes - Rota Meals', async () => {
  beforeEach(() => {
    global.fetch = vi.fn(fetchMockData) as unknown as any;
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

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
    const chickenRecipe = await screen.findByText(/brown stew chicken/i);
    expect(chickenRecipe).toBeInTheDocument();

    await userEvent.click(beefBtn);
    const beefRecipe = await screen.findByText(/beef and mustard pie/i);
    expect(beefRecipe).toBeInTheDocument();

    await userEvent.click(allBtn);
    const corba = await screen.findByRole('img', { name: /corba/i });
    expect(corba).toBeInTheDocument();
  });

  test('verifica se a API é chamada', async () => {
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

    const corba = await screen.findByRole('img', { name: /corba/i });
    expect(corba).toBeInTheDocument();

    const dessertBtn = await screen.findByRole('button', { name: /dessert/i });
    expect(dessertBtn).toBeInTheDocument();
    await userEvent.click(dessertBtn);
    const apple = await screen.findByRole('img', { name: /apple frangipan tart/i });
    expect(apple).toBeInTheDocument();
    await userEvent.click(dessertBtn);
    const corba2 = await screen.findByRole('img', { name: /corba/i });
    expect(corba2).toBeInTheDocument();
  });

  test('verifica se a pag de drinks funciona corretamente', async () => {
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

    const coctailBtn = await screen.findByRole('button', { name: /cocktail/i });
    expect(coctailBtn).toBeInTheDocument();

    const ordinaryBtn = await screen.findByRole('button', { name: /ordinary drink/i });
    expect(ordinaryBtn).toBeInTheDocument();

    const shakeBtn = await screen.findByRole('button', { name: /shake/i });
    expect(shakeBtn).toBeInTheDocument();

    const ggDrink = await screen.findByRole('img', { name: /gg/i });
    expect(ggDrink).toBeInTheDocument();

    await userEvent.click(coctailBtn);
    const drink155 = await screen.findByRole('img', { name: /155 belmont/i });
    expect(drink155).toBeInTheDocument();

    await userEvent.click(allBtn);
    const ggDrink2 = await screen.findByRole('img', { name: /gg/i });
    expect(ggDrink2).toBeInTheDocument();

    await userEvent.click(shakeBtn);
    const avalanche = await screen.findByRole('img', { name: /avalanche/i });
    expect(avalanche).toBeInTheDocument();

    await userEvent.click(shakeBtn);
    const ggDrink3 = await screen.findByRole('img', { name: /gg/i });
    expect(ggDrink3).toBeInTheDocument();
  });
});
