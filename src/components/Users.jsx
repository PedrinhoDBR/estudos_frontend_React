import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Users.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';

const apiUrl = process.env.REACT_APP_API_URL;

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${apiUrl}/getusers`)
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

  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(filter.toLowerCase()) ||
    user.email.toLowerCase().includes(filter.toLowerCase())
  );

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

  return (
    <div className="user-list-container">
      <div className="headers-container">
        <button className="new-user-button" onClick={() => navigate('/newuser/$0')} >
          Novo Usuário
        </button>

        <div className="filter-container">
          <input 
            type="text" 
            placeholder="Digite para filtrar" 
            value={filter} 
            onChange={(e) => setFilter(e.target.value)} 
          />
        </div>
      </div>

      {filteredUsers.length === 0 ? (
        <p className="no-users">Nenhum usuário encontrado.</p>
      ) : (
        <div className="user-list">
          {filteredUsers.map(user => (
            <div key={user.id} className="user-card">
              <div className="user-info">
                <FontAwesomeIcon 
                  icon={faPen} 
                  onClick={() => navigate(`/user/${user.id}`)}
                  style={{ cursor: 'pointer' }} 
                />
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
