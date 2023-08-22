import { useState } from 'react';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

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
      <header>
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
        <h1
          data-testid="page-title"
        >
          {title}
        </h1>

      </header>
      {showSideBar === true && (<SearchBar />)}
    </>
  );
}

export default Header;
