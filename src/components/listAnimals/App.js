import React, { useEffect, useState } from 'react';
import './App.css';
import TopBar from '../topBar/App';
const ListAnimals = () => {
  const [animals, setAnimals] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/animals')
      .then(response => response.json())
      .then(data => setAnimals(data))
      .catch(error => console.error('Error fetching animals:', error));
  }, []);

  const handleChangeStatus = (id) => {
    fetch(`http://localhost:8080/api/animals/changeStatus/${id}`, {
      method: 'PUT'
    })
      .then(response => {
        if (response.ok) {
          setAnimals(prevAnimals =>
            prevAnimals.map(animal =>
              animal.id === id ? { ...animal, status: animal.status === 'DISPONIVEL' ? 'ADOTADO' : 'DISPONIVEL' } : animal
            )
          );
        }
      })
      .catch(error => console.error('Error changing status:', error));
  };

  const availableAnimals = animals.filter(animal => animal.status === 'DISPONIVEL');
  const adoptedAnimals = animals.filter(animal => animal.status === 'ADOTADO');

  return (
    <div>
      <TopBar />
      <h1>Animais Disponíveis</h1>
      <div className="animal-list">
        {availableAnimals.map(animal => (
          <div key={animal.id} className="animal-item">
            <img src={animal.urlImagem} alt={animal.nome} width="200" />
            <h2>{animal.nome}</h2>
            <p>{animal.descricao}</p>
            <p>Categoria: {animal.nomeCategoria}</p>
            <p>Data de Nascimento: {animal.dataNascimento}</p>
            <p>Idade: {animal.idade} anos</p>
            <button
              className={`button-status ${animal.status === 'DISPONIVEL' ? 'disponivel' : 'adotado'}`}
              onClick={() => handleChangeStatus(animal.id)}
            >
              {animal.status}
            </button>
          </div>
        ))}
      </div>
      <h1>Animais Adotados</h1>
      <div className="animal-list">
        {adoptedAnimals.map(animal => (
          <div key={animal.id} className="animal-item">
            <img src={animal.urlImagem} alt={animal.nome} width="200" />
            <h2>{animal.nome}</h2>
            <p>{animal.descricao}</p>
            <p>Categoria: {animal.nomeCategoria}</p>
            <p>Data de Nascimento: {animal.dataNascimento}</p>
            <p>Idade: {animal.idade} anos</p>
            <button
              className={`button-status ${animal.status === 'DISPONIVEL' ? 'disponivel' : 'adotado'}`}
              onClick={() => handleChangeStatus(animal.id)}
            >
              {animal.status}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListAnimals;
