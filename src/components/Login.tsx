function Login() {
  return (
    <form>
      <input
        type="email"
        placeholder="Digite seu email"
        data-testid="email-input"
      />
      <input
        type="password"
        placeholder="Digite sua senha"
        data-testid="password-input"
      />
      <button
        type="submit"
        data-testid="login-submit-btn"
      >
        Entrar
      </button>
    </form>
  );
}

export default Login;
