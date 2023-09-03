import { MemoryRouter } from 'react-router-dom';
import { screen } from '@testing-library/react';
import { renderWithRouter } from './renderWith';
import Recipes from '../pages/Recipes';

describe('Testes de Recipes - Rota Meals', () => {
  test('Testa se a paǵina contém o título correto', () => {});

  test('Testa se há o botão All na aplicação', async () => {
    renderWithRouter(<Recipes />, { initialEntries: ['/meals'] });
    const allBtn = await screen.findByRole('button', { name: /all/i });
    expect(allBtn).toBeInTheDocument();
  });

  test('Testa se há o botão Beef na aplicação', async () => {
    renderWithRouter(<Recipes />, { initialEntries: ['/meals'] });
    const allBtn = await screen.findByRole('button', { name: /beef/i });
    expect(allBtn).toBeInTheDocument();
  });

  test('Testa se há o botão Breakfast na aplicação', async () => {
    renderWithRouter(<Recipes />, { initialEntries: ['/meals'] });
    const allBtn = await screen.findByRole('button', { name: /breakfast/i });
    expect(allBtn).toBeInTheDocument();
  });

  test('Testa se há o botão Chicken na aplicação', async () => {
    renderWithRouter(<Recipes />, { initialEntries: ['/meals'] });
    const allBtn = await screen.findByRole('button', { name: /chicken/i });
    expect(allBtn).toBeInTheDocument();
  });

  test('Testa se há o botão Dessert na aplicação', async () => {
    renderWithRouter(<Recipes />, { initialEntries: ['/meals'] });
    const allBtn = await screen.findByRole('button', { name: /dessert/i });
    expect(allBtn).toBeInTheDocument();
  });

  test('Testa se há o botão Goat na aplicação', async () => {
    renderWithRouter(<Recipes />, { initialEntries: ['/meals'] });
    const allBtn = await screen.findByRole('button', { name: /goat/i });
    expect(allBtn).toBeInTheDocument();
  });
});
