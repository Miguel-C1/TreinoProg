import axios from 'axios';
const API_URL = 'http://26.114.212.0:3000';

export const loginUser = async (login: string, senha: string) => {
    try {
        const body = {
            login: login,
            senha: senha
        }
        const response = await axios.post(`${API_URL}/user/login`, body);
        return response.data;
    }  catch (error) {
        console.error('Erro ao buscar treino por ID:', error);
        throw error;
    }
   
}

export const createUser = async (login: string, senha: string, firstName: string, lastName: string, age: number) => {
    try {
        const body = {
            login: login,
            senha: senha,
            firstName: firstName,
            lastName: lastName,
            age: age
        }
        const response = await axios.post(`${API_URL}/user`, body);
        return response.data;
    }  catch (error) {
        console.error('Erro ao buscar treino por ID:', error);
        throw error;
    }
    
   
}

export const searchUserById = async (userId: number) => {
    try {
    const response = await axios.get(`${API_URL}/user/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar treino por ID:', error);
        throw error;
    }
}