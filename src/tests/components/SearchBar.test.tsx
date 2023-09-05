import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import SearchBar from '../../components/SearchBar/SearchBar';
import * as mocks from '../../MockDataResults';
import { renderWithRouter } from '../renderWith';
import { RecipeProvider, useRecipeContext } from '../../context/search-results-context';

const NAME_URL_MEALS = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const INGREDIENT_URL_MEALS = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=';
const FIRST_LETTER_URL_MEALS = 'https://www.themealdb.com/api/json/v1/1/search.php?f=';
const NAME_URL_DRINKS = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const INGREDIENT_URL_DRINKS = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=';

const SEARCH_INPUT = 'search-input';
const EXEC_SEARCH_BTN = 'exec-search-btn';
const NAME_SEARCH_RADIO = 'name-search-radio';

function TestComponent() {
  const { mealResults, drinkResults } = useRecipeContext();
  return (
    <>
      <div data-testid="meal-results">{JSON.stringify(mealResults)}</div>
      <div data-testid="drink-results">{JSON.stringify(drinkResults)}</div>
    </>
  );
}

describe('Test SearchBar component', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('Test if search input on /meals is working', async () => {
    renderWithRouter(<SearchBar />, { initialEntries: ['/meals'] });
    const searchInputEl = screen.getByTestId(SEARCH_INPUT);
    const searchRadioEls = screen.getAllByRole('radio');

    await userEvent.type(searchInputEl, 'test');
    expect(searchInputEl).toHaveValue('test');
    expect(searchRadioEls).toHaveLength(3);
  });

  it('Test if search input on /drinks is working', async () => {
    renderWithRouter(<SearchBar />, { initialEntries: ['/drinks'] });
    const searchInputEl = screen.getByTestId(SEARCH_INPUT);
    const searchRadioEls = screen.getAllByRole('radio');

    await userEvent.type(searchInputEl, 'test');
    expect(searchInputEl).toHaveValue('test');
    expect(searchRadioEls).toHaveLength(3);
  });

  it('Test alert on empty search in /meals', async () => {
    renderWithRouter(<SearchBar />, { initialEntries: ['/meals'] });

    global.fetch = vi.fn().mockResolvedValue({
      json: async () => mocks.emptyMeal,
    });

    const spy = vi.spyOn(window, 'alert').mockImplementation(() => {});

    const inputValue = 'nonexistent';

    const searchInputEl = screen.getByTestId(SEARCH_INPUT);
    const nameRadioEl = screen.getByTestId(NAME_SEARCH_RADIO);
    const searchBtnEl = screen.getByTestId(EXEC_SEARCH_BTN);

    await userEvent.type(searchInputEl, inputValue);
    await userEvent.click(nameRadioEl);
    await userEvent.click(searchBtnEl);

    expect(spy).toHaveBeenCalledTimes(1);

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(`${NAME_URL_MEALS}${inputValue}`);
  });

  it('Test alert on empty search in /drinks', async () => {
    renderWithRouter(<SearchBar />, { initialEntries: ['/drinks'] });

    global.fetch = vi.fn().mockResolvedValue({
      json: async () => mocks.emptyDrink,
    });

    const spy = vi.spyOn(window, 'alert').mockImplementation(() => {});

    const inputValue = 'nonexistent';

    const searchInputEl = screen.getByTestId(SEARCH_INPUT);
    const nameRadioEl = screen.getByTestId(NAME_SEARCH_RADIO);
    const searchBtnEl = screen.getByTestId(EXEC_SEARCH_BTN);

    await userEvent.type(searchInputEl, inputValue);
    await userEvent.click(nameRadioEl);
    await userEvent.click(searchBtnEl);

    expect(spy).toHaveBeenCalledTimes(1);

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(`${NAME_URL_DRINKS}${inputValue}`);
  });

  it('Should save meal result in context', async () => {
    const { getByTestId } = renderWithRouter(
      <RecipeProvider>
        <TestComponent />
        <SearchBar />
      </RecipeProvider>,
    );

    global.fetch = vi.fn().mockResolvedValue({
      json: async () => mocks.meals,
    });

    const inputValue = 'Corba';

    const searchInputEl = screen.getByTestId(SEARCH_INPUT);
    const nameRadioEl = screen.getByTestId(NAME_SEARCH_RADIO);
    const searchBtnEl = screen.getByTestId(EXEC_SEARCH_BTN);

    await userEvent.type(searchInputEl, inputValue);
    await userEvent.click(nameRadioEl);
    await userEvent.click(searchBtnEl);

    const mealResultsElement = getByTestId('meal-results');
    expect(mealResultsElement.textContent).toContain('Corba');
  });

  it('Test if alert pops when search for first letter with more than 1 letter', async () => {
    renderWithRouter(<SearchBar />, { initialEntries: ['/drinks'] });

    const spy = vi.spyOn(window, 'alert').mockImplementation(() => {});

    const inputValue = 'ab';

    const searchInputEl = screen.getByTestId(SEARCH_INPUT);
    const firstLetterRadioEl = screen.getByTestId('first-letter-search-radio');
    const searchBtnEl = screen.getByTestId(EXEC_SEARCH_BTN);

    await userEvent.type(searchInputEl, inputValue);
    await userEvent.click(firstLetterRadioEl);
    await userEvent.click(searchBtnEl);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  it('Should save drink result in context', async () => {
    const { getByTestId } = renderWithRouter(
      <RecipeProvider>
        <TestComponent />
        <SearchBar />
      </RecipeProvider>,
    );

    global.fetch = vi.fn().mockResolvedValue({
      json: async () => mocks.drinks,
    });

    const inputValue = 'Margarita';

    const searchInputEl = screen.getByTestId(SEARCH_INPUT);
    const nameRadioEl = screen.getByTestId(NAME_SEARCH_RADIO);
    const searchBtnEl = screen.getByTestId(EXEC_SEARCH_BTN);

    await userEvent.type(searchInputEl, inputValue);
    await userEvent.click(nameRadioEl);
    await userEvent.click(searchBtnEl);

    const drinkResultsElement = getByTestId('drink-results');
    expect(drinkResultsElement.textContent).toContain([]);
  });

  it('Test search by ingredients on /meals', async () => {
    renderWithRouter(<SearchBar />, { initialEntries: ['/meals'] });

    global.fetch = vi.fn().mockResolvedValue({
      json: async () => mocks.mealsChickenIngredient,
    });

    const inputValue = 'chicken';

    const searchInputEl = screen.getByTestId(SEARCH_INPUT);
    const ingredientRadioEl = screen.getByTestId('ingredient-search-radio');
    const searchBtnEl = screen.getByTestId(EXEC_SEARCH_BTN);

    await userEvent.type(searchInputEl, inputValue);
    await userEvent.click(ingredientRadioEl);
    await userEvent.click(searchBtnEl);

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(`${INGREDIENT_URL_MEALS}${inputValue}`);
  });

  it('Test search by ingredient on /meals', async () => {
    renderWithRouter(<SearchBar />, { initialEntries: ['/drinks'] });

    global.fetch = vi.fn().mockResolvedValue({
      json: async () => mocks.mealsChickenIngredient,
    });

    const inputValue = 'lemons';

    const searchInputEl = screen.getByTestId(SEARCH_INPUT);
    const ingredientRadioEl = screen.getByTestId('ingredient-search-radio');
    const searchBtnEl = screen.getByTestId(EXEC_SEARCH_BTN);

    await userEvent.type(searchInputEl, inputValue);
    await userEvent.click(ingredientRadioEl);
    await userEvent.click(searchBtnEl);

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(`${INGREDIENT_URL_DRINKS}${inputValue}`);
  });

  it('Test search by ingredient on /meals', async () => {
    renderWithRouter(<SearchBar />, { initialEntries: ['/meals'] });

    const inputValue = 'a';

    const searchInputEl = screen.getByTestId(SEARCH_INPUT);
    const ingredientRadioEl = screen.getByTestId('first-letter-search-radio');
    const searchBtnEl = screen.getByTestId(EXEC_SEARCH_BTN);

    await userEvent.type(searchInputEl, inputValue);
    await userEvent.click(ingredientRadioEl);
    await userEvent.click(searchBtnEl);

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(`${FIRST_LETTER_URL_MEALS}${inputValue}`);
  });
});
