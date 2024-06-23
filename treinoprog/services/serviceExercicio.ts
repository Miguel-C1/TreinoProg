import axios from 'axios';
import API_URL from '../ip/ipurl'; 

export const searchExercicioByUser = async (userId: string) => {
    const response = await axios.get(`${API_URL}/exercise/user/${userId}`)
    return response.data;
}


export const searchGroups = async () => {
    const response = await axios.get(`${API_URL}/groups`)
    return response.data
}

export const searchExercicio = async () => {
    const response = await axios.get(`${API_URL}/exercise`)
    return response.data;
}

export const searchExercicioById = async (id: string) => {
    const response = await axios.get(`${API_URL}/exercise/${id}`)
    return response.data;
}

export const createExercicio = async (userId: string, nome: string, grupo: number) => {
    const body = {
        id_user: userId,
        name: nome,
        id_group: grupo
    };
    const response = await axios.post(`${API_URL}/exercise`, body)
    return response.data;
}

export const updateExercicio = async (exercicioId: number, nome: string, grupo: number) => {
    const body = {
        name: nome,
        id_group: grupo
    };
    const response = await axios.put(`${API_URL}/exercise/${exercicioId}`, body)
    return response.data;
}

export const deleteExercicio = async (exercicioId: number) => {
    const response = await axios.delete(`${API_URL}/exercise/${exercicioId}`)
    return response.data;
}

