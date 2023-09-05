import { useLocation } from 'react-router-dom';
import MainScreenDrink from './MainScreenDrink';
import MainScreenFood from './MainScreenFood';

function RecipeDetail() {
  const location = useLocation();
  const path = location.pathname;
  return (
    <div>
      { path === '/meals/:id' ? <MainScreenFood /> : <MainScreenDrink /> }
    </div>
  );
}

export default RecipeDetail;
