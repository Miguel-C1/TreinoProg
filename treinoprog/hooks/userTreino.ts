import { useContext } from 'react';
import { TreinoContext } from '../context/TreinoContext';

const useTreino = () => {
  const context = useContext(TreinoContext);
  if (!context) {
    throw new Error('useTreino must be used within a TreinoProvider');
  }
  return context;
};

export default useTreino;
