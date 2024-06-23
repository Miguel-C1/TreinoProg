import { useContext } from 'react';
import { ExercicioContext } from '../context/ExercicioContext'

const useExercicio = () => {
    const context = useContext(ExercicioContext)
    if (!context) {
        throw new Error('useTreino must be used within a TreinoProvider');
      }
      return context;
}

export default useExercicio;