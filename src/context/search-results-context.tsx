// RecipeContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Recipe {
  idMeal: string;
  idDrink?: string;
  strMeal: string;
  strDrink?: string;
  strMealThumb: string;
  strDrinkThumb?: string;
  [key: string]: string | undefined;
}

type RecipeContextType = {
  searchResults: any;
  setSearchResults: React.Dispatch<React.SetStateAction<Recipe[]>>;
};

const RecipeContext = createContext<RecipeContextType>({
  searchResults: [],
  setSearchResults: () => {},
});

export function useRecipeContext() {
  return useContext(RecipeContext);
}

type RecipeProviderProps = {
  children: ReactNode;
};

export function RecipeProvider({ children }: RecipeProviderProps) {
  const [searchResults, setSearchResults] = useState<Recipe[]>([]);
  console.log('Context Data:', searchResults);
  return (
    <RecipeContext.Provider value={ { searchResults, setSearchResults } }>
      {children}
    </RecipeContext.Provider>
  );
}

export default RecipeContext;
