import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useFetch from '../hooks/use-fetch';
import { FetchFunction,
  fetchMealsByFirstLetter,
  fetchMealsByIngredient,
  fetchMealsByName } from '../api';
import { useRecipeContext } from '../context/search-results-context';

type SearchType = 'ingredient' | 'name' | 'first-letter';

function SearchBar() {
  const [searchType, setSearchType] = useState<SearchType>('ingredient');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { setSearchResults } = useRecipeContext();

  /*   const navigate = useNavigate();
 */
  const FIRST_LETTER = 'first-letter';

  const fetchFunction: FetchFunction = async () => {
    if (searchType === 'ingredient') {
      return fetchMealsByIngredient(searchQuery);
    } if (searchType === 'name') {
      return fetchMealsByName(searchQuery);
    } if (searchType === FIRST_LETTER) {
      return fetchMealsByFirstLetter(searchQuery);
    }
    throw new Error('Invalid search type');
  };

  const { data } = useFetch(fetchFunction);

  const handleSearch = () => {
    setSearchResults(data);

    /*     if (data && data.length === 1) {
      const recipeId = data[0].idMeal || data[0].idDrink;
      const recipeType = data[0].idMeal ? 'meals' : 'drinks';
      navigate(`/${recipeType}/${recipeId}`);
    } */
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        data-testid="search-input"
        value={ searchQuery }
        onChange={ (e) => setSearchQuery(e.target.value) }
      />

      <label>
        <input
          type="radio"
          name="search-type"
          value="ingredient"
          data-testid="ingredient-search-radio"
          checked={ searchType === 'ingredient' }
          onChange={ () => setSearchType('ingredient') }
        />
        Ingrediente
      </label>

      <label>
        <input
          type="radio"
          name="search-type"
          value="name"
          data-testid="name-search-radio"
          checked={ searchType === 'name' }
          onChange={ () => setSearchType('name') }
        />
        Nome
      </label>

      <label>
        <input
          type="radio"
          name="search-type"
          value="first-letter"
          data-testid="first-letter-search-radio"
          checked={ searchType === FIRST_LETTER }
          onChange={ () => setSearchType(FIRST_LETTER) }
        />
        Primeira Letra
      </label>

      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ handleSearch }
      >
        Buscar
      </button>
    </div>
  );
}

export default SearchBar;
