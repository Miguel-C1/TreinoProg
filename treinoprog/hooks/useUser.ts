import { useContext } from 'react';
import { UserContext } from '../context/UserContext'

const useUser = () => {
    const context = useContext(UserContext)
    if (!context) {
        throw new Error('useTreino must be used within a TreinoProvider');
      }
      return context;
}

export default useUser;