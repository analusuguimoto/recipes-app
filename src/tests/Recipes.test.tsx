import { MemoryRouter } from 'react-router-dom';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from './renderWith';
// import Recipes from '../pages/Recipes';
import App from '../App';
import { RecipeProvider } from '../context/search-results-context';

describe('Testes de Recipes - Rota Meals', async () => {
  test('Testa se a paǵina contém o título correto', async () => {});

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

  await userEvent.type(emailInput, 'test@test.co');
  await userEvent.type(passwordInput, 'sdwsdasd12!');
  expect(loginButton).not.toBeDisabled();

  await userEvent.click(loginButton);
  const allBtn = await screen.getByRole('button', { name: /all/i });
  expect(allBtn).toBeInTheDocument();

  const beefBtn = await screen.findByTestId('Beef-category-filter');
  expect(beefBtn).toBeInTheDocument();

  const breakfastBtn = await screen.findByRole('button', { name: /breakfast/i });
  expect(breakfastBtn).toBeInTheDocument();

  const chickenBtn = await screen.findByRole('button', { name: /chicken/i });
  expect(chickenBtn).toBeInTheDocument();

  await userEvent.click(chickenBtn);
  screen.debug();
  const chickenrecipe = await screen.queryByText(/ayam percik/i);
  expect(chickenrecipe).toBeInTheDocument();
  // screen.getByRole('img', { name: /ayam percik/i });

  // test('Testa se há o botão All na aplicação', async () => {
  //   renderWithRouter(<Recipes />, { initialEntries: ['/meals'] });
  //   const allBtn = await screen.findByRole('button', { name: /all/i });
  //   expect(allBtn).toBeInTheDocument();
  // });

  // test('Testa se há o botão Beef na aplicação', async () => {
  //   renderWithRouter(<Recipes />, { initialEntries: ['/meals'] });
  //   const allBtn = await screen.findByRole('button', { name: /beef/i });
  //   expect(allBtn).toBeInTheDocument();
  // });

  // test('Testa se há o botão Breakfast na aplicação', async () => {
  //   renderWithRouter(<Recipes />, { initialEntries: ['/meals'] });
  //   const allBtn = await screen.findByRole('button', { name: /breakfast/i });
  //   expect(allBtn).toBeInTheDocument();
  // });

  // test('Testa se há o botão Chicken na aplicação', async () => {
  //   renderWithRouter(<Recipes />, { initialEntries: ['/meals'] });
  //   const allBtn = await screen.findByRole('button', { name: /chicken/i });
  //   expect(allBtn).toBeInTheDocument();
  // });

  // test('Testa se há o botão Dessert na aplicação', async () => {
  //   renderWithRouter(<Recipes />, { initialEntries: ['/meals'] });
  //   const allBtn = await screen.findByRole('button', { name: /dessert/i });
  //   expect(allBtn).toBeInTheDocument();
  // });

  // test('Testa se há o botão Goat na aplicação', async () => {
  //   renderWithRouter(<Recipes />, { initialEntries: ['/meals'] });
  //   const allBtn = await screen.findByRole('button', { name: /goat/i });
  //   expect(allBtn).toBeInTheDocument();
  // });
});
