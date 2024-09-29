import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import UserList from './components/Users';
import Home from './components/Home';
import NewUser from './components/Newuser';

const App = () => {
  return (
    <Router>
      <div>
        <nav style={{ backgroundColor: '#111', padding: '10px' }}>
          <ul style={{ display: 'flex', listStyle: 'none', color: '#fff' }}>
            <li style={{ marginRight: '20px' }}>
              <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>Home</Link>
            </li>
            <li>
              <Link to="/users" style={{ color: '#fff', textDecoration: 'none' }}>Usuários</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/newuser/:id" element={<NewUser />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
