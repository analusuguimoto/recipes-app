import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipe from './pages/FavoriteRecipe';
import Recipes from './pages/Recipes';
import RecipeDetail from './pages/RecipeDetails';
import RecipeInProgress from './pages/RecipeInProgress';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Login /> } />
      <Route path="/meals" element={ <Recipes /> } />
      <Route path="/drinks" element={ <Recipes /> } />
      <Route path="/meals/:id" element={ <RecipeDetail /> } />
      <Route path="/drinks/:id" element={ <RecipeDetail /> } />
      <Route path="/meals/:id/in-progress" element={ <RecipeInProgress /> } />
      <Route path="/drinks/:id/in-progress" element={ <RecipeInProgress /> } />
      <Route path="/profile" element={ <Profile /> } />
      <Route path="/done-recipes" element={ <DoneRecipes /> } />
      <Route path="/favorite-recipes" element={ <FavoriteRecipe /> } />

    </Routes>
  );
}

export default App;
