import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const apiUrl = process.env.REACT_APP_API_URL;

const User = () => {
    const { id } = useParams();
    const [userData, setUserData] = useState({ id: '', username: '', email: '' });
    const [error, setError] = useState(null);
    useEffect(() => {
        if (id !== 0) {
            fetch(`${apiUrl}/getusers?id=${id}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Erro ao buscar dados do usuário');
                    }
                    return response.json();
                })
                .then(data => {
                   if (Array.isArray(data) && data.length > 0) {
                        setUserData(data[0]);
                    }
                })
                .catch(err => setError(err.message));
        }else{
            setUserData({ ...userData, id: '0' })
        }
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();  

        if (window.confirm('Deseja confirmar a alteração?')) {
            fetch(`${apiUrl}/setusers`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao enviar os dados');
                }
                return response.json();
            })
            .then(data => {
                console.log('Teste:', data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
        }
    };

    if (error) return <div>Error: {error}</div>;
    if (!userData && id !== '0') return <div>Loading...</div>;
    console.log(userData)
    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor='username'>Nome de usuário:</label><br />
            <input type='text' id='username' name='username' value={userData.username} onChange={(e) => setUserData({ ...userData, username: e.target.value })} /><br />

            <label htmlFor='email'>Email:</label><br />
            <input type='text' id='email' name='email' value={userData.email} onChange={(e) => setUserData({ ...userData, email: e.target.value })} /><br />
                <input  type='hidden'  id='id'  name='id'  value={userData.id}/>

            <button type='submit'>Enviar</button>
        </form>
    );
    
};

export default User;
