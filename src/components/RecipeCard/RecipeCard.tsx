import style from './RecipeCard.module.css';

interface RecipeCardProps {
  id: any;
  name: any;
  image: any;
  index: any;
}

function RecipeCard({ name, image, index, id }: RecipeCardProps) {
  return (
    <div
      data-testid={ `${index}-recipe-card` }
      className={ style.cardContainer }
    >
      <img
        src={ image }
        alt={ name }
        data-testid={ `${index}-card-img` }
      />
      <p data-testid={ `${index}-card-name` }>{name}</p>
    </div>
  );
}

export default RecipeCard;
