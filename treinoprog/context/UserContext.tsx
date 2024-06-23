import React, { createContext, ReactNode, useState } from 'react';
import { loginUser, createUser, searchUserById } from '../services/serviceUser';

interface UserContextType {
  user: any;
  loginUserHandler: (login: string, senha: string) => Promise<void>;
  createUserHandler: (login: string, senha: string, firstName: string, lastName: string, age: number) => Promise<void>;
  searchUserByIdHandler: (userId: number) => Promise<void>;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<any>(null);

  const loginUserHandler = async (login: string, senha: string) => {
    try {
      const result = await loginUser(login, senha);
      setUser(result);
    } catch (error) {
      console.error('Erro ao fazer login:', error);
    }
  };

  const createUserHandler = async (login: string, senha: string, firstName: string, lastName: string, age: number) => {
    try {
      const result = await createUser(login, senha, firstName, lastName, age);
      setUser(result);
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
    }
  };

  const searchUserByIdHandler = async (userId: number) => {
    try {
      const result = await searchUserById(userId);
      setUser(result);
    } catch (error) {
      console.error('Erro ao buscar usuário por ID:', error);
    }
  };

  return (
    <UserContext.Provider value={{ user, loginUserHandler, createUserHandler, searchUserByIdHandler }}>
      {children}
    </UserContext.Provider>
  );
};
