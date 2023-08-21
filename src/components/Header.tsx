import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import RecipeList from './RecipeList';
import SearchBar from './SearchBar';

function Header() {
  return (
    <>
      <header>
        <img
          src={ profileIcon }
          alt="ícone de perfil"
          data-testid="profile-top-btn"
        />
        <img
          src={ searchIcon }
          alt="ícone de pesquisa"
          data-testid="search-top-btn"
        />
        <h1>Título</h1>

      </header>
      <SearchBar />

    </>
  );
}

export default Header;
