import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ID_DRINKS_LINK } from '../helpers/links';
import { fetchApi } from '../helpers/fetchApi';
import { DrinkType } from '../types';

function MainScreenDrink() {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<DrinkType>();

  const fetchRecipe = async () => {
    const response = await fetchApi(`${ID_DRINKS_LINK}${id}`);
    setRecipe(response.drinks[0]);
    console.log(response);
  };
  useEffect(() => {
    fetchRecipe();
  }, []);

  return (
    <>
      <h2>{ recipe?.strDrink }</h2>
      <p>{ recipe?.strAlcoholic }</p>
    </>
  );
}

export default MainScreenDrink;
