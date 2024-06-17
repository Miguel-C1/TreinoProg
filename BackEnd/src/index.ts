import express from 'express';
import dotenv from 'dotenv';
import { AppDataSource } from './data-source';
import cors from 'cors';
import router from './routes';
import multer from 'multer';
import { Groups } from './entity/Groups';
import { User } from './entity/User';

dotenv.config();

AppDataSource.initialize()
  .then(async () => {
    console.log('Data Source has been initialized!');
    
    await initializeGroups();
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
  });

async function initializeGroups() {
  const groupRepo = AppDataSource.getRepository(Groups);
  const userRepo = AppDataSource.getRepository(User);
  const count = await groupRepo.count();
  if (count === 0) {
    const muscleGroups = [
      "DELTÓIDE", "PEITORAL", "BÍCEPS", "OBLÍQUOS", 
      "QUADRÍCEP", "RECTO ABDOMINAL", "TRÍCEP", 
      "TRAPÉZIO", "DORSAL", "ISQUITIBIAL", "GEMEOS"
    ];
    const user = userRepo.create({ firstName: 'Admin', lastName: 'Admin', age: 18 }); 
    const groups = muscleGroups.map(name => groupRepo.create({ name: name }));
    await groupRepo.save(groups);
    await userRepo.save(user);
    console.log('Muscle groups initialized.');
  }
}

// Configuração do Multer
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const app = express();

app.use(express.json());
app.use(cors());

app.use(router);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
