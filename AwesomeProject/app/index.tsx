import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '@/app/pages/Login/Login';
import RegisterScreen from '@/app/pages/Login/Cadastro';
import Template from '@/template/template';
import LoginNav from '@/components/navigation/LoginNav';

const App = () => {
  const [user, setUser] = useState({ id: 0});

  const handleLogin = (userData: any) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser({ id: 0});
  };

  // Condicional para renderizar tela de login ou template
  const renderScreen = () => {
    if (user.id === 0) {
      // Usuário não está logado
      return <LoginNav onLogin={handleLogin}/>;
    } else {
      // Usuário está logado
      return <Template user={user.id} handleLogout={handleLogout} route={{
        params: {
          id: user.id
        }
      }} />;
    }
  };

  return (
      renderScreen()
  
  );
};

export default App;
