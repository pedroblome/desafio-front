import React, { useEffect, useState } from 'react';
import TopBar from '../topBar/App';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa o Bootstrap
import './App.css'; // Importa os estilos CSS adicionais

const ListAnimals = () => {
  const [animals, setAnimals] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/animals')
      .then(response => response.json())
      .then(data => {
        const sortedAnimals = sortAnimals(data);
        setAnimals(sortedAnimals);
      })
      .catch(error => console.error('Error fetching animals:', error));
  }, []);

  const handleChangeStatus = (id) => {
    fetch(`http://localhost:8080/api/animals/changeStatus/${id}`, { method: 'PUT' })
      .then(response => {
        if (response.ok) {
          setAnimals(prevAnimals =>
            sortAnimals(
              prevAnimals.map(animal =>
                animal.id === id ? { ...animal, status: animal.status === 'DISPONIVEL' ? 'ADOTADO' : 'DISPONIVEL' } : animal
              )
            )
          );
        }
      })
      .catch(error => console.error('Error changing status:', error));
  };

  const sortAnimals = (animals) => {
    return animals.sort((a, b) => (a.status === 'DISPONIVEL' ? -1 : 1));
  };

  const availableAnimals = animals.filter(animal => animal.status === 'DISPONIVEL');
  const adoptedAnimals = animals.filter(animal => animal.status === 'ADOTADO');

  return (
    <div>
      <TopBar />
      <div className="container my-5">
        <h1>Animais Disponíveis</h1>
        <div className="row">
          {availableAnimals.map(animal => (
            renderAnimalCard(animal)
          ))}
        </div>
        <h1>Animais Adotados</h1>
        <div className="row">
          {adoptedAnimals.map(animal => (
            renderAnimalCard(animal)
          ))}
        </div>
      </div>
    </div>
  );
};

const renderAnimalCard = (animal) => (
  <div key={animal.id} className="col-md-4 col-sm-6 col-xs-12 mb-4">
    <div className="card">
      <img src={animal.urlImagem} className="card-img-top" alt={animal.nome} />
      <div className="card-body">
        <h5 className="card-title">{animal.nome}</h5>
        <p className="card-text">{animal.descricao}</p>
        <p className="card-text"><small>Categoria: {animal.nomeCategoria}</small></p>
        <p className="card-text"><small>Data de Nascimento: {animal.dataNascimento}</small></p>
        <p className="card-text"><small>Idade: {animal.idade} anos</small></p>
        <button
          className={`btn ${animal.status === 'DISPONIVEL' ? 'btn-success' : 'btn-danger'}`}
          onClick={() => handleChangeStatus(animal.id)}
        >
          {animal.status}
        </button>
      </div>
    </div>
  </div>
);

export default ListAnimals;
