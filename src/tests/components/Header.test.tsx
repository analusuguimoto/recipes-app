import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from '../renderWith';
import App from '../../App';
import Header from '../../components/Header/Header';

describe('Verifica se o header renderiza corretamente os elementos', () => {
  test('Verifica os elementos do header', () => {
    renderWithRouter(<Header title="" iconSearch iconProfile />);
    expect(screen.getByTestId('profile-top-btn')).toBeInTheDocument();
    expect(screen.getByTestId('search-top-btn')).toBeInTheDocument();
    expect(screen.getByTestId('page-title')).toBeInTheDocument();
  });

  test('Verifica se a page FoodRecipe renderiza corretamente', () => {
    renderWithRouter(<Header title="Meals" iconSearch iconProfile />);
    const title = screen.getByText(/Meals/i);
    expect(title).toBeInTheDocument();
    expect(screen.getByTestId('profile-top-btn')).toBeInTheDocument();
    expect(screen.getByTestId('search-top-btn')).toBeInTheDocument();
  });

  test('Verifica se a page DrinkRecipe renderiza corretamente', () => {
    renderWithRouter(<Header title="Drinks" iconSearch iconProfile />);
    const titleDrink = screen.getByText(/Drinks/i);
    expect(titleDrink).toBeInTheDocument();
    expect(screen.getByAltText('ícone de perfil')).toBeInTheDocument();
  });

  test('Verifica se a page FavoriteRecipe renderiza corretamente', () => {
    renderWithRouter(<Header title="Favorite Recipes" iconSearch={ false } iconProfile />);
    const title = screen.getByText(/Favorite Recipes/i);
    expect(title).toBeInTheDocument();
  });

  test('Verifica a renderização do header a partir da ação do app', async () => {
    renderWithRouter(<App />);
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
    expect(screen.getByAltText('ícone de pesquisa')).toBeInTheDocument();
    expect(screen.getByAltText('ícone de perfil')).toBeInTheDocument();

    const searchButton = screen.getByAltText('ícone de pesquisa');
    expect(searchButton).toBeInTheDocument();

    await userEvent.click(searchButton);
    expect(screen.getByText(/ingrediente/i)).toBeInTheDocument();
    expect(screen.getByTestId('search-input')).toBeInTheDocument();

    await userEvent.click(searchButton);
    expect(screen.queryByTestId('search-input')).not.toBeInTheDocument();
  });
});
