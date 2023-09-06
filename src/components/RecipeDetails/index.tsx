import { useLocation } from 'react-router-dom';
import MainScreenDrink from '../../pages/MainScreenDetails/MainScreenDrink';
import MainScreenFood from '../../pages/MainScreenDetails/MainScreenFood';

function RecipeDetails() {
  const { pathname } = useLocation();
  return (
    pathname.includes('/drink') ? <MainScreenDrink /> : <MainScreenFood />
  );
}

export default RecipeDetails;
