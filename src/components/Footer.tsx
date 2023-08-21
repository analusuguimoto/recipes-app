import '../footer.css';

function Footer() {
  return (
    <footer data-testid="footer">
      <img src="drinkIcon.svg" alt="drink" data-testid="drinks-bottom-btn" />
      <img src="mealIcon.svg" alt="meal" data-testid="meals-bottom-btn" />
    </footer>
  );
}
export default Footer;
