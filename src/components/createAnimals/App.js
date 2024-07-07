import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TopBar from '../topBar/App';
import 'bootstrap/dist/css/bootstrap.min.css';

const CadastrarAnimal = () => {
  const navigate = useNavigate();
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [urlImagem, setUrlImagem] = useState('');
  const [nomeCategoria, setNomeCategoria] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [status, setStatus] = useState('DISPONIVEL');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newAnimal = {
      nome,
      descricao,
      urlImagem,
      nomeCategoria,
      dataNascimento,
      status
    };

    fetch('http://localhost:8080/api/animals', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newAnimal)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Animal cadastrado com sucesso:', data);
        navigate("/");
      })
      .catch(error => console.error('Error cadastrando animal:', error));
  };

  return (
    <div>
      <TopBar />
      <div className="container mt-5">
        <h1 className="mb-3">Cadastrar Animal</h1>
        <form className="w-50 mx-auto" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="nome" className="form-label">Nome:</label>
            <input type="text" className="form-control" id="nome" value={nome} onChange={e => setNome(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label htmlFor="descricao" className="form-label">Descrição:</label>
            <input type="text" className="form-control" id="descricao" value={descricao} onChange={e => setDescricao(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label htmlFor="urlImagem" className="form-label">URL da Imagem:</label>
            <input type="text" className="form-control" id="urlImagem" value={urlImagem} onChange={e => setUrlImagem(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label htmlFor="nomeCategoria" className="form-label">Categoria:</label>
            <input type="text" className="form-control" id="nomeCategoria" value={nomeCategoria} onChange={e => setNomeCategoria(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label htmlFor="dataNascimento" className="form-label">Data de Nascimento:</label>
            <input type="date" className="form-control" id="dataNascimento" value={dataNascimento} onChange={e => setDataNascimento(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label htmlFor="status" className="form-label">Status:</label>
            <select className="form-select" id="status" value={status} onChange={e => setStatus(e.target.value)} required>
              <option value="DISPONIVEL">Disponível</option>
              <option value="ADOTADO">Adotado</option>
            </select>
          </div>
          <button type="submit" className="btn btn-success">Cadastrar</button>
        </form>
      </div>
    </div>

  );
};

export default CadastrarAnimal;
