import { useState } from 'react';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';
import '../styles/header.css';

type PropType = {
  title: string;
  iconSearch: boolean;
  iconProfile: boolean;
};

function Header({ title, iconSearch, iconProfile }: PropType) {
  const [showSideBar, setShowSideBar] = useState(false);
  const showSideBarElement = () => (showSideBar === false
    ? setShowSideBar(true) : setShowSideBar(false));

  return (
    <>
      <header className="header-title">
        <div className="header-title">
          <img
            src={ logo }
            alt="Recipe Icon"
            className="header-logo"
          />
          <span>
            <em>RECIPES</em>
            {' '}
            <strong>app</strong>
          </span>

        </div>
        <div className="header-icons">
          {iconProfile === true && (
            <Link to="/profile">
              <img
                src={ profileIcon }
                alt="ícone de perfil"
                data-testid="profile-top-btn"
              />
            </Link>
          )}
          {iconSearch === true && (
            <button
              type="submit"
              onClick={ showSideBarElement }
            >
              <img
                className="searchIcon"
                src={ searchIcon }
                alt="ícone de pesquisa"
                data-testid="search-top-btn"
              />
            </button>
          )}
        </div>

      </header>
      {showSideBar === true && (<SearchBar />)}
      <div>
        <h1
          data-testid="page-title"
          className="page-title"
        >
          {title}
        </h1>
        <div className="title-icon">
          {isDrinksPage && <img src={ drinkIcon } alt="ícone de drinks" />}
          {isMealsPage && <img src={ mealIcon } alt="ícone de meals" />}
        </div>
      </div>
    </>
  );
}

export default Header;
