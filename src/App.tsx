import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import MainScreenFood from './pages/MainScreenFood';
import MainScreenDrink from './pages/MainScreenDrink';
import DetailsFood from './pages/DetailsFood';
import DetailsDrink from './pages/DetailsDrink';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipe from './pages/FavoriteRecipe';
import Recipes from './pages/Recipes';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Login /> } />
      <Route path="/meals" element={ <Recipes /> } />
      <Route path="/drinks" element={ <Recipes /> } />
      <Route path="/meals/:id" element={ <MainScreenFood /> } />
      <Route path="/drinks/:id" element={ <MainScreenDrink /> } />
      <Route path="/meals/:id/in-progress" element={ <DetailsFood /> } />
      <Route path="/drinks/:id/in-progress" element={ <DetailsDrink /> } />
      <Route path="/profile" element={ <Profile /> } />
      <Route path="/done-recipes" element={ <DoneRecipes /> } />
      <Route path="/favorite-recipes" element={ <FavoriteRecipe /> } />

    </Routes>
  );
}

export default App;
