import React from 'react';
import '../styles/Header.css'

const Header = () => {
  return (
    <header className="header">
      <nav className="nav-links">
        <a href="#home">Home</a>
        <a href="#usuarios">Usuários</a>
        {/* <a href="#teste">Teste</a> */}
      </nav>
    </header>
  );
}

export default Header;
