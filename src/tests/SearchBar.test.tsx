import React from 'react';
import { vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; // Import MemoryRouter
import userEvent from '@testing-library/user-event';
import SearchBar from '../components/SearchBar';
import { mealsData } from '../MockDataResults';
import * as api from '../api'; // Import the actual API module

describe('SearchBar component', () => {
  it('should display search input and radio buttons', () => {
    render(
      <MemoryRouter>
        <SearchBar />
      </MemoryRouter>,
    );

    expect(screen.getByTestId('search-input')).toBeInTheDocument();
    expect(screen.getByTestId('ingredient-search-radio')).toBeInTheDocument();
    expect(screen.getByTestId('name-search-radio')).toBeInTheDocument();
    expect(screen.getByTestId('first-letter-search-radio')).toBeInTheDocument();
    expect(screen.getByTestId('exec-search-btn')).toBeInTheDocument();
  });
});
