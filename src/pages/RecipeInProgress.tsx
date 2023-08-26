import DetailsDrinkInProgress from './DetailsDrinkInProgress';
import DetailsFoodInProgress from './DetailsFoodInProgress';

function RecipeInProgress() {
  const path = window.location.pathname;
  return (
    <div>
      { path === '/meals/:id/in-progress'
        ? <DetailsFoodInProgress /> : <DetailsDrinkInProgress /> }
    </div>
  );
}

export default RecipeInProgress;
