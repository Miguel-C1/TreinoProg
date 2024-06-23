import React, { createContext, ReactNode, useState } from 'react';
import { searchAcompanhamentoByUser, createAcompanhamento, uploadImage, searchImage, deleteImage, diasFaltados } from '../services/serviceAcompanhamento';

interface AcompanhamentoContextType {
  acompanhamentos: any[];
  images: any[];
  imagem: string;
  diasFaltadosT: DiasFaltados;
  createAcompanhamentoHandler: (imageId: number) => Promise<void>;
  searchAcompanhamentoByUserHandler: () => Promise<void>;
  uploadImageHandler: (uri: string) => Promise<void>;
  searchImageHandler: () => Promise<void>;
  deleteImageHandler: () => Promise<void>;
  diasFaltadosHandler: () => Promise<void>;
  imageSetter: (uri: string) => void;
}

export const AcompanhamentoContext = createContext<AcompanhamentoContextType | undefined>(undefined);

interface AcompanhamentoProviderProps {
  children: ReactNode;
  userId: string;
}

interface DiasFaltados {
  Domingo: {
		presentes: number,
		faltas: number
	},
	Segunda: {
		presentes: number;
		faltas: number;
	},
	Terça: {
		presentes: number;
		faltas: number;
	},
	Quarta: {
		presentes: number;
		faltas: number;
	},
	Quinta: {
		presentes: number;
		faltas: number;
	},
	Sexta: {
		presentes: number;
		faltas: number;
	},
	Sabado: {
    presentes: number;
		faltas: number;
	}

}

export const AcompanhamentoProvider: React.FC<AcompanhamentoProviderProps> = ({ children, userId }) => {
  const [acompanhamentos, setAcompanhamentos] = useState<any[]>([]);
  const [images, setImages] = useState<any[]>([]);
  const [imagem, setImagem] = useState<string>('');
  const [diasFaltadosT, setDiasFaltadosT] = useState<DiasFaltados>()

  const createAcompanhamentoHandler = async (imageId: number) => {
    try {
      const result = await createAcompanhamento(Number(userId), imageId);
      setAcompanhamentos([...acompanhamentos, result]);
    } catch (error) {
      console.error('Erro ao criar acompanhamento:', error);
    }
  };

  const diasFaltadosHandler = async () => {
    try {
      const result = await diasFaltados(Number(userId));
      setDiasFaltadosT(result);
    } catch (error) {
      console.error('Erro ao buscar dias faltados:', error);
    }
  }

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
      diasFaltadosT,
      imageSetter,
      createAcompanhamentoHandler,
      searchAcompanhamentoByUserHandler,
      uploadImageHandler,
      searchImageHandler,
      deleteImageHandler,
      diasFaltadosHandler
    }}>
      {children}
    </AcompanhamentoContext.Provider>
  );
};
