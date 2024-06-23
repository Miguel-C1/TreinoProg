import React, { createContext, ReactNode, useState } from 'react';
import { searchAcompanhamentoByUser, createAcompanhamento, uploadImage, searchImage, deleteImage } from '../services/serviceAcompanhamento';

interface AcompanhamentoContextType {
  acompanhamentos: any[];
  images: any[];
  imagem: string;
  createAcompanhamentoHandler: (imageId: number) => Promise<void>;
  searchAcompanhamentoByUserHandler: () => Promise<void>;
  uploadImageHandler: (uri: string) => Promise<void>;
  searchImageHandler: () => Promise<void>;
  deleteImageHandler: () => Promise<void>;
  imageSetter: (uri: string) => void;
}

export const AcompanhamentoContext = createContext<AcompanhamentoContextType | undefined>(undefined);

interface AcompanhamentoProviderProps {
  children: ReactNode;
  userId: string;
}

export const AcompanhamentoProvider: React.FC<AcompanhamentoProviderProps> = ({ children, userId }) => {
  const [acompanhamentos, setAcompanhamentos] = useState<any[]>([]);
  const [images, setImages] = useState<any[]>([]);
  const [imagem, setImagem] = useState<string>('');

  const createAcompanhamentoHandler = async (imageId: number) => {
    try {
      const result = await createAcompanhamento(Number(userId), imageId);
      setAcompanhamentos([...acompanhamentos, result]);
    } catch (error) {
      console.error('Erro ao criar acompanhamento:', error);
    }
  };

  const searchAcompanhamentoByUserHandler = async () => {
    try {
      const result = await searchAcompanhamentoByUser(Number(userId));
      setAcompanhamentos(result);
    } catch (error) {
      console.error('Erro ao buscar acompanhamento por usuário:', error);
    }
  };

  const imageSetter = (uri: string) => {
    setImagem(uri);
  };

  const uploadImageHandler = async (uri: string) => {
    try {
      await uploadImage(uri, userId);
      setImagem(undefined);
    } catch (error) {
      console.error('Erro ao fazer upload da imagem:', error);
    }
  };

  const searchImageHandler = async () => {
    try {
      const result = await searchImage(Number(userId));
      setImages(result);
    } catch (error) {
      console.error('Erro ao buscar imagens:', error);
    }
  };

  const deleteImageHandler = async () => {
    try {
      await deleteImage(Number(userId));
      setImages([]);
    } catch (error) {
      console.error('Erro ao deletar imagem:', error);
    }
  };

  return (
    <AcompanhamentoContext.Provider value={{
      acompanhamentos,
      images,
      imagem,
      imageSetter,
      createAcompanhamentoHandler,
      searchAcompanhamentoByUserHandler,
      uploadImageHandler,
      searchImageHandler,
      deleteImageHandler
    }}>
      {children}
    </AcompanhamentoContext.Provider>
  );
};
