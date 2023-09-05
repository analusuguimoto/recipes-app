import React from 'react';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { renderWithRouter } from '../renderWith';
import Profile from '../../pages/Profile/Profile';

describe('Profile screen', () => {
  it('renders user email and buttons', () => {
    renderWithRouter(<Profile />, { initialEntries: ['/profile'] });

    const emailElement = screen.getByTestId('profile-email');
    const doneButton = screen.getByTestId('profile-done-btn');
    const favoriteButton = screen.getByTestId('profile-favorite-btn');
    const logoutButton = screen.getByTestId('profile-logout-btn');

    expect(emailElement).toBeInTheDocument();
    expect(doneButton).toBeInTheDocument();
    expect(favoriteButton).toBeInTheDocument();
    expect(logoutButton).toBeInTheDocument();
  });

  it('navigates to Done Recipes screen on Done Recipes button click', () => {
    renderWithRouter(<Profile />, { initialEntries: ['/profile'] });

    const doneButton = screen.getByTestId('profile-done-btn');
    userEvent.click(doneButton);

    waitFor(() => {
      expect(window.location.pathname).toBe('/done-recipes');
    });
  });

  it('navigates to Favorite Recipes screen on Favorite Recipes button click', () => {
    renderWithRouter(<Profile />, { initialEntries: ['/profile'] });

    const favoriteButton = screen.getByTestId('profile-favorite-btn');
    userEvent.click(favoriteButton);

    waitFor(() => {
      expect(window.location.pathname).toBe('/favorite-recipes');
    });
  });

  it('displays user email from localStorage', async () => {
    const mockStoredUser = { email: 'test@example.com' };
    const localStorageMock = {
      getItem: vi.fn(() => JSON.stringify(mockStoredUser)),
    };
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
      writable: true,
    });

    renderWithRouter(<Profile />, { initialEntries: ['/profile'] });

    const profileEmail = await screen.findByTestId('profile-email');
    expect(profileEmail).toBeInTheDocument();
    expect(profileEmail.textContent).toBe(mockStoredUser.email);
  });
});
