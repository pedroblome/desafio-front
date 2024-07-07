import React from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

const TopBar = () => {
  const navigate = useNavigate();

  return (
    <div className="top-bar">
      <button onClick={() => navigate('/')}>Listar Animais</button>
      <button onClick={() => navigate('/create')}>Cadastrar Animal</button>
    </div>
  );
};

export default TopBar;
