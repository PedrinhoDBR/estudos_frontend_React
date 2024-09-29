import React, { useEffect, useState } from 'react';
import '../styles/Users.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    fetch('http://127.0.0.1:5000/getusers')
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro ao buscar os dados dos usuários');
        }
        return response.json();
      })
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <p>Carregando...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p>{error}</p>
      </div>
    );
  }

  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(filter.toLowerCase()) ||
    user.email.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="user-list-container">
      <div className="filter-container">
        <input 
          type="text" 
          placeholder="Digite para filtrar" 
          value={filter} 
          onChange={(e) => setFilter(e.target.value)} 
        />
      </div>
      
      {filteredUsers.length === 0 ? (
        <p className="no-users">Nenhum usuário encontrado.</p>
      ) : (
        <div className="user-list">
          {filteredUsers.map(user => (
            <div key={user.id} className="user-card">
              <div className="user-info">
                <FontAwesomeIcon icon={faBars} size="2x" />
                <p>{user.username}</p>
                <p>{user.email}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserList;
