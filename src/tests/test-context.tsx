import React, { createContext, useContext } from 'react';

type Meal = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
};

type Drink = {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
};

type Favorites = {
  id: string | undefined;
  type: string;
  nationality: string | undefined;
  category: string | undefined;
  alcoholicOrNot: string | undefined;
  name: string | undefined;
  image: string | undefined;
};

type RecipeContextType = {
  mealResults: Meal[];
  drinkResults: Drink[];
  setMealResults: React.Dispatch<React.SetStateAction<Meal[]>>;
  setDrinkResults: React.Dispatch<React.SetStateAction<Drink[]>>;
  updateMealState: (newState: Meal[]) => void;
  updateDrinkState: (newState: Drink[]) => void;
  fetchMeals: () => void;
  fetchDrinks: () => void;
  favoriteRecipes: Favorites[];
  setFavoriteRecipes: React.Dispatch<React.SetStateAction<Favorites[]>>;
};

const RecipeContext = createContext<RecipeContextType | undefined>(undefined);

export function RecipeContextProviderTest({ children }: { children: React.ReactNode }) {
  const fakeMealResults: Meal[] = [
    {
      idMeal: '1',
      strMeal: 'Spaghetti',
      strMealThumb: 'spaghetti.jpg',
    },
  ];

  const fakeDrinkResults: Drink[] = [
    {
      idDrink: '1',
      strDrink: 'Cocktail',
      strDrinkThumb: 'cocktail.jpg',
    },
  ];

  const fakeFavoriteRecipes: Favorites[] = [
    {
      id: '1',
      type: 'meal',
      nationality: 'Italian',
      category: 'Pasta',
      alcoholicOrNot: '',
      name: 'Spaghetti',
      image: 'spaghetti.jpg',
    },
  ];

  return (
    <RecipeContext.Provider
      value={ {
        mealResults: fakeMealResults,
        drinkResults: fakeDrinkResults,
        setMealResults: () => {},
        setDrinkResults: () => {},
        updateMealState: () => {},
        updateDrinkState: () => {},
        fetchMeals: () => {},
        fetchDrinks: () => {},
        favoriteRecipes: fakeFavoriteRecipes,
        setFavoriteRecipes: () => {},
      } }
    >
      {children}
    </RecipeContext.Provider>
  );
}

export function useRecipeContextTest() {
  const context = useContext(RecipeContext);
  if (context === undefined) {
    throw new Error('error');
  }
  return context;
}
