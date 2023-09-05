import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import DrinkRecipeList from '../../components/RecipeList/DrinkRecipeList';
import RecipeCard from '../../components/RecipeCard/RecipeCard';

const drinkCardMock = {
  idDrink: '1',
  strDrink: 'Drink 1',
  strDrinkThumb: 'image1.jpg',
};

const drinks = [
  {
    idDrink: '1',
    strDrink: 'Drink 1',
    strDrinkThumb: 'image1.jpg',
  },
  {
    idDrink: '2',
    strDrink: 'Drink 2',
    strDrinkThumb: 'image2.jpg',
  },
];

describe('DrinkRecipeList', () => {
  it('should render a list of drinks', () => {
    render(
      <MemoryRouter>
        <DrinkRecipeList drinks={ drinks } />
      </MemoryRouter>,
    );

    const drinkCards = screen.getAllByTestId(/[\d]-recipe-card/);

    expect(drinkCards).toHaveLength(drinks.length);

    drinkCards.forEach((card, index) => {
      const drink = drinks[index];
      const drinkImage = screen.getByTestId(`${index}-card-img`);
      const drinkName = screen.getByTestId(`${index}-card-name`);

      expect(drinkImage).toHaveAttribute('src', drink.strDrinkThumb);
      expect(drinkName).toHaveTextContent(drink.strDrink);
    });
  });
});

describe('RecipeCard', () => {
  it('should render a drink card', () => {
    render(<RecipeCard id={ drinkCardMock.idDrink } name={ drinkCardMock.strDrink } image={ drinkCardMock.strDrinkThumb } index={ 0 } />);

    const card = screen.getByTestId('0-recipe-card');
    const image = screen.getByTestId('0-card-img');
    const name = screen.getByTestId('0-card-name');

    expect(card).toBeInTheDocument();
    expect(image).toHaveAttribute('src', drinkCardMock.strDrinkThumb);
    expect(name).toHaveTextContent(drinkCardMock.strDrink);
  });
});
