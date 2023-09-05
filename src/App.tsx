import { Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login';
import Profile from './pages/Profile/Profile';
import DoneRecipes from './pages/DoneRecipes/DoneRecipes';
import FavoriteRecipe from './pages/FavoriteRecipe/FavoriteRecipe';
import Recipes from './pages/Recipes/Recipes';
// import RecipeDetails from './pages/RecipeDetails';
// import RecipeInProgress from './pages/RecipeInProgress';
import MainScreenFood from './pages/MainScreenDetails/MainScreenFood';
import MainScreenDrink from './pages/MainScreenDetails/MainScreenDrink';
import DetailsDrinkInProgress from './pages/InProgress/DetailsDrinkInProgress';
import DetailsFoodInProgress from './pages/InProgress/DetailsFoodInProgress';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Login /> } />
      <Route path="/meals" element={ <Recipes /> } />
      <Route path="/drinks" element={ <Recipes /> } />
      <Route path="/meals/:id" element={ <MainScreenFood /> } />
      <Route path="/drinks/:id" element={ <MainScreenDrink /> } />
      <Route path="/meals/:id/in-progress" element={ <DetailsFoodInProgress /> } />
      <Route path="/drinks/:id/in-progress" element={ <DetailsDrinkInProgress /> } />
      <Route path="/profile" element={ <Profile /> } />
      <Route path="/done-recipes" element={ <DoneRecipes /> } />
      <Route path="/favorite-recipes" element={ <FavoriteRecipe /> } />
    </Routes>
  );
}

export default App;
