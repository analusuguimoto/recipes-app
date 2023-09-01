import { useLocation } from 'react-router-dom';
import DetailsDrinkInProgress from './DetailsDrinkInProgress';
import DetailsFoodInProgress from './DetailsFoodInProgress';

function RecipeInProgress() {
  const location = useLocation();
  const path = location.pathname;
  return (
    <div>
      { path === '/meals/:id-da-receita/in-progress'
        ? <DetailsFoodInProgress /> : <DetailsDrinkInProgress /> }
    </div>
  );
}

export default RecipeInProgress;
