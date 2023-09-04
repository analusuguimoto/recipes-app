import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import capa from '../images/capa-logi.jpg';
import '../styles/loginScreen.css';

function Login() {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [loginButton, setLoginButton] = useState(true);
  const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const navigate = useNavigate();

  const verifyLogin = () => {
    if (!userEmail || !userPassword) {
      return false;
    }

    if (!userEmail.match(emailRegex)) {
      return false;
    }

    return userPassword.length > 6;
  };

  useEffect(() => {
    setLoginButton(verifyLogin());
  }, [userEmail, userPassword]);

  const handleclick = (event: any) => {
    event.preventDefault();
    navigate('/meals');
    const emailLS = { email: userEmail };
    const emailStringfy = JSON.stringify(emailLS);
    localStorage.setItem('user', emailStringfy);
  };

  return (
    <div className="meal">
      <h1 className="title-login">Login</h1>
      <form className="form-container">
        <input
          type="email"
          placeholder="Digite seu email"
          data-testid="email-input"
          onChange={ (event) => setUserEmail(event.target.value) }
        />
        <input
          type="password"
          placeholder="Digite sua senha"
          data-testid="password-input"
          onChange={ (event) => setUserPassword(event.target.value) }
        />
        <button
          className="btn-login"
          type="submit"
          data-testid="login-submit-btn"
          disabled={ !loginButton }
          onClick={ handleclick }
        >
          Entrar
        </button>
      </form>
      <div>
        <img
          className="foto-capa"
          src={ capa }
          alt=""
        />
      </div>
    </div>
  );
}

export default Login;
