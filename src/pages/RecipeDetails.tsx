import MainScreenDrink from './MainScreenDrink';
import MainScreenFood from './MainScreenFood';

function RecipeDetail() {
  const path = window.location.pathname;
  return (
    <div>
      { path === '/meals/:id-da-receita' ? <MainScreenFood /> : <MainScreenDrink /> }
    </div>
  );
}

export default RecipeDetail;
