import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { fetchApi } from '../helpers/fetchApi';
import { DRINKS_LINK, MEALS_LINK } from '../helpers/links';

export interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

export interface Drink {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
}

type RecipeContextType = {
  mealResults: Meal[];
  drinkResults: Drink[];
  setMealResults: React.Dispatch<React.SetStateAction<Meal[]>>;
  setDrinkResults: React.Dispatch<React.SetStateAction<Drink[]>>;
};

const RecipeContext = createContext<RecipeContextType>({
  mealResults: [],
  drinkResults: [],
  setMealResults: () => {},
  setDrinkResults: () => {},
});

export function useRecipeContext() {
  return useContext(RecipeContext);
}

type RecipeProviderProps = {
  children: ReactNode;
};

export function RecipeProvider({ children }: RecipeProviderProps) {
  const [mealResults, setMealResults] = useState<Meal[]>([]);
  const [drinkResults, setDrinkResults] = useState<Drink[]>([]);

  const fetchMeals = async () => {
    const response = await fetchApi(MEALS_LINK);
    setMealResults(response.meals);
  };
  const fetchDrinks = async () => {
    const response = await fetchApi(DRINKS_LINK);
    setDrinkResults(response.drinks);
  };

  useEffect(() => {
    fetchMeals();
    fetchDrinks();
  }, []);

  console.log('Meal Results:', mealResults);
  console.log('Drink Results:', drinkResults);

  return (
    <RecipeContext.Provider
      value={ {
        mealResults,
        setMealResults,
        drinkResults,
        setDrinkResults,
      } }
    >
      {children}
    </RecipeContext.Provider>
  );
}

export default RecipeContext;
