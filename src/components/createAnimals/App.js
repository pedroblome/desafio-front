import React, { useState } from 'react';
import './App.css';

const CadastrarAnimal = () => {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [urlImagem, setUrlImagem] = useState('');
  const [nomeCategoria, setNomeCategoria] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [status, setStatus] = useState('DISPONIVEL');
  const [idade, setIdade] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const newAnimal = {
      nome,
      descricao,
      urlImagem,
      nomeCategoria,
      dataNascimento,
      status,
      idade: parseInt(idade, 10)
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
        // Redirecionar ou limpar o formulário
      })
      .catch(error => console.error('Error cadastrando animal:', error));
  };

  return (
    <div className="cadastrar-animal">
      <h1>Cadastrar Animal</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Nome:
          <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />
        </label>
        <label>
          Descrição:
          <input type="text" value={descricao} onChange={(e) => setDescricao(e.target.value)} required />
        </label>
        <label>
          URL da Imagem:
          <input type="text" value={urlImagem} onChange={(e) => setUrlImagem(e.target.value)} required />
        </label>
        <label>
          Categoria:
          <input type="text" value={nomeCategoria} onChange={(e) => setNomeCategoria(e.target.value)} required />
        </label>
        <label>
          Data de Nascimento:
          <input type="date" value={dataNascimento} onChange={(e) => setDataNascimento(e.target.value)} required />
        </label>
        <label>
          Idade:
          <input type="number" value={idade} onChange={(e) => setIdade(e.target.value)} required />
        </label>
        <label>
          Status:
          <select value={status} onChange={(e) => setStatus(e.target.value)} required>
            <option value="DISPONIVEL">Disponível</option>
            <option value="ADOTADO">Adotado</option>
          </select>
        </label>
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};

export default CadastrarAnimal;
