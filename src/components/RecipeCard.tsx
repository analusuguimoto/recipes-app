import React from 'react';
import '../App.css';

interface RecipeCardProps {
  id: any;
  name: any;
  image: any;
  index: any;
}

function RecipeCard({ name, image, index, id }: RecipeCardProps) {
  return (
    <div data-testid={ `${index}-recipe-card` } style={ { cursor: 'pointer' } }>
      <img
        src={ image }
        alt={ name || id }
        data-testid={ `${index}-card-img` }
        style={ { maxWidth: '200px', height: 'auto' } }
      />
      <p data-testid={ `${index}-card-name` }>{name}</p>
    </div>
  );
}

export default RecipeCard;
