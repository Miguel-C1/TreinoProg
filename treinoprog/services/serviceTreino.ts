import axios from 'axios';
import API_URL from '../ip/ipurl'; 


export const searchTreino = async (term: string) => {
    const response = await axios.get(`${API_URL}/training/user/${term}`);
    return response.data;
};
  
export const createTreino = async (nomeTreino: string, exercicios: number[], data: string, userId: string) => {
    const treinoData = {
        name: nomeTreino,
        exercises: exercicios,
        date: data,
        user: userId,
    };

    try {
        const response = await axios.post(`${API_URL}/training`, treinoData);
        return response.data;
    } catch (error) {
        console.error('Erro ao criar treino:', error);
        throw error;
    }
};

// Função para atualizar um treino existente
export const updateTreino = async (treinoId: number, nomeTreino: string, exercicios: number[], data: string) => {
    const treinoData = {
        name: nomeTreino,
        exercises: exercicios,
        date: data,
    };

    try {
        const response = await axios.put(`${API_URL}/training/${treinoId}`, treinoData);
        return response.data;
    } catch (error) {
        console.error('Erro ao atualizar treino:', error);
        throw error;
    }
};

// Função para deletar um treino existente
export const deleteTreino = async (treinoId: number) => {
    try {
        const response = await axios.delete(`${API_URL}/training/${treinoId}`);
        return response.data;
    } catch (error) {
        console.error('Erro ao deletar treino:', error);
        throw error;
    }
};

// Para buscar um treino específico pelo ID
export const getTreinoById = async (treinoId: number) => {
    try {
        const response = await axios.get(`${API_URL}/training/${treinoId}`);
        return response.data;
      } catch (error) {
        console.error('Erro ao buscar treino por ID:', error);
        throw error;
    }
};

export const getTreinouserId = async (userId: number) => {
    try {
        const response = await axios.get(`${API_URL}/training/user/${userId}`);
        return response.data;
      } catch (error) {
        console.error('Erro ao buscar treino por ID:', error);
        throw error;
    }
}