import axios from 'axios';
const API_URL = 'http://26.114.212.0:3000';


export const uploadImage = async (uri: string, idUsuario: string) => {
    try {
        const body = {
            image: uri,
            idUser: idUsuario
        };
        console.log("Chegou Aqui")
        const response = await axios.post(`${API_URL}/images/upload`, body)
        return response.data;
    } catch (error) {
        console.error('Erro ao fazer Upload da Imagem:', error);
        throw error;
    }

}

export const searchImage = async (userId: number) => {
    const response = await axios.get(`${API_URL}/image/user/${userId}`)
    return response.data;
}

export const deleteImage = async (userId: number) => {
    const response = await axios.delete(`${API_URL}/image/image/${userId}`)
    return response.data;
}

export const searchAcompanhamentoByUser = async (userId: number) => {
    const response = await axios.get(`${API_URL}/acompanhamento/user/${userId}`)
    return response.data;
}

export const diasFaltados = async (userId: number) => {
    const response = await axios.get(`${API_URL}/acompanhamento/faltas/${userId}`)
    return response.data
}

export const createAcompanhamento = async (userId: number, imageId: number) => {
    try {
        const body = {
            userId: userId,
            imageId: imageId
        };
        const response = await axios.post(`${API_URL}/acompanhamento/user`, body)
        return response.data;
    } catch (error) {
        console.error('Erro ao criar acompanhamento:', error);
        throw error;

    }

}