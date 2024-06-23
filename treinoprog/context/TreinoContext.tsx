import React, { createContext, ReactNode, useState } from 'react';
import { createTreino, getTreinoById, getTreinouserId, searchTreino, updateTreino, deleteTreino } from '../services/serviceTreino';


interface TreinoContextType {
    treino: any[];
    searchTreinoByUserIdHandler: () => Promise<void>;
    createTreinoHandler: (nomeTreino: string, exercicios: number[], data: string) => Promise<void>;
    updateTreinoHandler: (treinoId: number, nomeTreino: string, exercicios: number[], data: string) => Promise<void>;
    deleteTreinoHandler: (treinoId: number) => Promise<void>;
    seatchTreinoByIdHandler: (treinoId: number) => Promise<void>;
    cleanObj: () => Promise<void>;
    treinoObj: Treino[];
}
  

interface Treino {
    id: number;
    name: string;
    exercises: Exercicio[];
    date: string;
}

interface Exercicio {
    id: number;
    name: string;
}

export const TreinoContext = createContext<TreinoContextType | undefined>(undefined);


export const TreinoProvider: React.FC<{ children: ReactNode,   userId: string}> = ({ children, userId }) => {
    
    const [treino, setTreino] = useState<any[]>([]);
    const [treinoObj, setTreinoObj] = useState<Treino[]>([])

    
    const searchTreinoByUserIdHandler = async () => {
        const result = await searchTreino(userId)
        setTreino(result)
    }

    const seatchTreinoByIdHandler = async (treinoId: number) => {
        const result = await getTreinoById(treinoId)
        setTreinoObj(result)
    }

    const cleanObj = async () => {
        setTreinoObj([])
    }

    const createTreinoHandler = async (nomeTreino: string, exercicios: number[], data: string) => {
        await createTreino(nomeTreino, exercicios, data, userId)
        await searchTreinoByUserIdHandler()
        setTreinoObj([])
    }

    const updateTreinoHandler = async (treinoId: number, nomeTreino: string, exercicios: number[], data: string) => {
        await updateTreino(treinoId, nomeTreino, exercicios, data)
        await searchTreinoByUserIdHandler()
        setTreinoObj([])
    }

    const deleteTreinoHandler = async (treinoId: number) => {
        const result =  await deleteTreino(treinoId)
        await searchTreinoByUserIdHandler()
    }
    
    return (
        <TreinoContext.Provider value={{ treino, treinoObj, searchTreinoByUserIdHandler, createTreinoHandler, updateTreinoHandler, deleteTreinoHandler, cleanObj,seatchTreinoByIdHandler}}>
            {children}
        </TreinoContext.Provider>
    )

}
