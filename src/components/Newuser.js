import React, { useState } from 'react';

const NewUser = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState(null);
    const apiUrl = process.env.REACT_APP_API_URL; // Certifique-se de que a URL está configurada

    const handleSubmit = async (e) => {
        e.preventDefault(); // Previne o comportamento padrão do formulário
        setError(null); // Reseta a mensagem de erro

        try {
            const response = await fetch(`${apiUrl}/setusers`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email }),
            });

            if (!response.ok) {
                throw new Error('Erro ao criar usuário');
            }

            // Se a requisição foi bem-sucedida, redireciona para a tela anterior
            window.history.back(); // Volta para a tela anterior
        } catch (error) {
            setError(error.message); // Define a mensagem de erro se algo der errado
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor='username'>Nome de usuário: </label><br />
                <input 
                    type='text' 
                    id='username' 
                    name='username' 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                /><br />
                
                <label htmlFor='email'>Email: </label><br />
                <input 
                    type='text' 
                    id='email' 
                    name='email' 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                /><br />

                <button type='submit'>Confirmar</button>
            </form>

            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Exibe mensagem de erro, se existir */}
        </div>
    );
};

export default NewUser;
