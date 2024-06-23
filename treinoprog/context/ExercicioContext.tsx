import React, { createContext, ReactNode, useState } from 'react';
import { searchExercicioByUser, createExercicio, updateExercicio, deleteExercicio, searchExercicio, searchExercicioById, searchGroups } from '../services/serviceExercicio';

interface ExercicioContextType {
  exercicios: any[];
  exercicioObj: any[];
  groups: any[];
  searchExercicioByUserHandler: () => Promise<void>;
  searchExercicioHandler: () => Promise<void>;
  createExercicioHandler: (nome: string, grupo: number) => Promise<void>;
  updateExercicioHandler: (exercicioId: number, nome: string, grupo: number) => Promise<void>;
  deleteExercicioHandler: (exercicioId: number) => Promise<void>;
  searchEsercicioByIDHandler: (id: string) => Promise<void>;
  searchGroupsHandler: () => Promise<void>;
}

export const ExercicioContext = createContext<ExercicioContextType | undefined>(undefined);

interface ExercicioProviderProps {
    children: ReactNode;
    userId: string;
}

export const ExercicioProvider: React.FC<ExercicioProviderProps> = ({ children, userId }) => {
  const [exercicios, setExercicios] = useState<any[]>([]);
  const [exercicioObj, setExercicioObj] = useState<any[]>([]);
  const [groups, setGroups] = useState<any[]>([]);

  const searchGroupsHandler = async () => {
    try {
      const result = await searchGroups();
      setGroups(result);
    } catch (error) {
      console.error('Erro ao buscar grupos')
    }
  }
  const searchExercicioByUserHandler = async () => {
    try {
      const result = await searchExercicioByUser(userId);
      setExercicios(result);
    } catch (error) {
      console.error('Erro ao buscar exercícios por usuário:', error);
    }
  };

  const searchExercicioHandler = async () => {
    try {
      const result = await searchExercicio();
      setExercicios(result);
    } catch (error) {
      console.error('Erro ao buscar exercícios:', error);
    }
  };

  const searchEsercicioByIDHandler = async (id: string) => {
    try {
      const result = await searchExercicioById(id);
      setExercicioObj(result);
    } catch (error) {
      console.error('Erro ao buscar exercícios por ID:', error);
    }
  }


  const createExercicioHandler = async (nome: string, grupo: number) => {
    try {
      const result = await createExercicio(userId, nome, grupo);
      setExercicios([...exercicios, result]);
    } catch (error) {
      console.error('Erro ao criar exercício:', error);
    }
  };

  const updateExercicioHandler = async (exercicioId: number, nome: string, grupo: number) => {
    try {
      const result = await updateExercicio(exercicioId, nome, grupo);
      setExercicioObj([]);
      setExercicios(exercicios.map(exercicio => exercicio.id === exercicioId ? result : exercicio));
    } catch (error) {
      console.error('Erro ao atualizar exercício:', error);
    }
  };

  const deleteExercicioHandler = async (exercicioId: number) => {
    try {
      await deleteExercicio(exercicioId);
      setExercicios(exercicios.filter(exercicio => exercicio.id !== exercicioId));
    } catch (error) {
      console.error('Erro ao deletar exercício:', error);
    }
  };

  return (
    <ExercicioContext.Provider value={{ exercicios, exercicioObj, groups, searchExercicioByUserHandler, searchExercicioHandler, createExercicioHandler, updateExercicioHandler, deleteExercicioHandler, searchEsercicioByIDHandler, searchGroupsHandler }}>
      {children}
    </ExercicioContext.Provider>
  );
};
