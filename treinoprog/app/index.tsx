import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '@/app/pages/Login/Login';
import RegisterScreen from '@/app/pages/Login/Cadastro';
import Template from '@/template/template';
import LoginNav from '@/components/navigation/LoginNav';

const App = () => {
  const [user, setUser] = useState<[{ id: number}]>([{id: 0}]);

  const handleLogin = (userData: any) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser([{id: 0}]);
  };

  // Condicional para renderizar tela de login ou template
  const renderScreen = () => {
    if (user[0].id === 0) {
      // Usuário não está logado
      return <LoginNav onLogin={handleLogin}/>;
    } else {
      // Usuário está logado
      console.log(user);
      return <Template user={user[0].id} handleLogout={handleLogout} route={{
        params: {
          idUsuario: user[0].id
        }
      }} />;
    }
  };

  return (
      renderScreen()
  
  );
};

export default App;
