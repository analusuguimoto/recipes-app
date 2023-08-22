import { useParams } from 'react-router-dom';

function MainScreenDrink() {
  const { id } = useParams();
  return (
    <p>{id}</p>
  );
}

export default MainScreenDrink;
