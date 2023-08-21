import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import Login from '../components/Login';
import { renderWithRouter } from './renderWith';

describe('Verifica se a tela de login renderiza corretamente os elementos', () => {
  test('Verifica se é exibido um heading com o nome da aplicação', () => {
    renderWithRouter(<App />);
    const heading = screen.getByText(/trybeats/i);
    expect(heading).toBeInTheDocument();
  });

  test('Verifica se é renderizado um forms com espaço para email e senha', () => {
    renderWithRouter(<App />);
    const emailInput = screen.getByPlaceholderText(/Digite seu email/i);
    const passwordInput = screen.getByPlaceholderText(/Digite sua senha/i);
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });

  test('Verifica se o botão é nativamente desabilitado, e habilitado com o preenchimento correto do forms', async () => {
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
    const initialHeader = screen.getByTestId('search-input');
    // screen.findByPlaceholderText(/search-input/i);
    expect(initialHeader).toBeInTheDocument();
  });
});
