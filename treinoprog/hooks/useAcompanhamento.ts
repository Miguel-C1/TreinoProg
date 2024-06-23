import { useContext } from 'react';
import { AcompanhamentoContext } from '../context/AcompanhamentoContext'

const useAcompanhamento = () => {
    const context = useContext(AcompanhamentoContext)
    if (!context) {
        throw new Error('useTreino must be used within a TreinoProvider');
      }
      return context;
}

export default useAcompanhamento;