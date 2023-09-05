import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import profilePic from '../../images/profileIcon.svg';
import style from './Profile.module.css';

function Profile() {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserEmail(parsedUser.email);
    }
  }, []);

  const handleLogout = () => {
    navigate('/');
    localStorage.clear();
  };

  return (
    <>
      <Header title="Profile" iconSearch={ false } iconProfile />
      <div className={ style.picProfile }>
        <img
          src={ profilePic }
          alt="foto de perfil"
        />
      </div>
      <div className={ style.profileEmail }>
        <h2 data-testid="profile-email">{userEmail}</h2>
      </div>
      <div className={ style.btnContainer }>
        <button
          className={ style.profileBtn }
          data-testid="profile-done-btn"
          onClick={ () => navigate('/done-recipes') }
        >
          Done Recipes
        </button>
      </div>
      <div className={ style.btnContainer }>
        <button
          className={ style.profileBtn }
          data-testid="profile-favorite-btn"
          onClick={ () => navigate('/favorite-recipes') }
        >
          Favorite Recipes
        </button>
      </div>
      <div className={ style.btnContainer }>
        <button
          className={ style.profileBtn }
          data-testid="profile-logout-btn"
          onClick={ handleLogout }
        >
          Logout
        </button>
      </div>

      <Footer />
    </>
  );
}

export default Profile;
