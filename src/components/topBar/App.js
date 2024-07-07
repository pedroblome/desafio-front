import React from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css'; // Certifique-se de que o CSS está corretamente vinculado

const TopBar = () => {
  const navigate = useNavigate();

  return (
    <div className="top-bar">
      <a className="logo">
        <img src="https://www.waproject.com.br/assets/image/logo.svg" alt="WA Project logo" />
      </a>
      <div className="navigation-buttons">
        <button onClick={() => navigate('/')} className="btn-home">Listar Animais</button>
        <button onClick={() => navigate('/create')} className="btn-about">Cadastrar Animal</button>
      </div>
    </div>
  );
};

export default TopBar;
