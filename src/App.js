import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import LoginPage from './pages/Login';
import Onebox from './pages/Onebox';
import Reply from './pages/Reply';
import { lightTheme, darkTheme } from './styles/theme';
import CreateAccount from './pages/CreateAccount';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    transition: all 0.50s linear;
  }
`;

const App = () => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <GlobalStyle />
      <Router>
        <div>
          <button onClick={toggleTheme} style={toggleButtonStyle}>
            Toggle Theme
          </button>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/onebox" element={<Onebox />} />
            <Route path="/create-account" element={<CreateAccount />} />
            <Route path="/reply/:threadId" element={<Reply />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
};

const toggleButtonStyle = {
  position: 'absolute',
  top: '10px',
  right: '10px',
  padding: '10px 20px',
  cursor: 'pointer',
  backgroundColor: '#007BFF',
  color: '#FFF',
  border: 'none',
  borderRadius: '5px',
  zIndex: 1000,
};

export default App;
