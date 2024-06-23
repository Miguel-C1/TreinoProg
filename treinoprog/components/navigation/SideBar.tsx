import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '@/app/pages/Home';
import Treino from '@/app/pages/Treino/Treino';
import Exercicio from '@/app/pages/Exercicio/Exercicio';
import Acompanhamento from '@/app/pages/Acompanhamento/Acompanhamento';
import ExercicioCadastro from '@/app/pages/Exercicio/ExercicioCadastro';
import ExercicioUpdate from '@/app/pages/Exercicio/ExercicioUpdate';
import TreinoCadastro from '@/app/pages/Treino/TreinoCadastrar';
import TreinoUpdate from '@/app/pages/Treino/TreinoUpdate';
import VisualizarAcompanhamento from '@/app/pages/Acompanhamento/VisualizarAcompanhamento';
import VisualizarAcompanhamentoImagens from '@/app/pages/Acompanhamento/VisualizarAcompanhamentoImagens';
import { TreinoProvider } from '../../context/TreinoContext';
import { AcompanhamentoProvider } from '../../context/AcompanhamentoContext';
import { ExercicioProvider } from '../../context/ExercicioContext';
import { UserProvider } from '../../context/UserContext';

type RootStackParamList = {
    Home: { idUsuario: number };
    Treino: { idUsuario: number };
    Exercicios: { idUsuario: number };
    Acompanhamento: { id: number };
    ImageListScreen: { idUsuario: number };
    'Visualizar Acompanhamento': {idUsuario: number};
    'Visualizar Acompanhamento Imagem': undefined;
    'Cadastro de Exercicio': { idUsuario: number };
    'Alterar Exercicio': { id: string, idUsuario: number };
    'Cadastro de Treino': { idUsuario: number };
    'Alterar Treino': { id: number, idUsuario: number };
};

const Drawer = createDrawerNavigator<RootStackParamList>();

const SideBar = ({ user }: { user: number }) => {
    return (
        <UserProvider>
            <TreinoProvider userId={String(user)}>
                <ExercicioProvider userId={String(user)}>
                    <AcompanhamentoProvider userId={String(user)}>
                        <Drawer.Navigator>
                            <Drawer.Screen name="Treino" component={Treino} key="treino" />
                            <Drawer.Screen name="Home" component={Home} key="home" />
                            <Drawer.Screen name="Exercicios" component={Exercicio} key="exercicios" />
                            <Drawer.Screen name="Acompanhamento" component={Acompanhamento} key="acompanhamento" />
                            <Drawer.Screen name="Visualizar Acompanhamento" component={VisualizarAcompanhamento}  key="visualizaracompanhamento" />
                            <Drawer.Screen name="Visualizar Acompanhamento Imagem" component={VisualizarAcompanhamentoImagens}  key="visualizaracompanhamentoimagem" />
                            <Drawer.Screen name="Cadastro de Exercicio" component={ExercicioCadastro} key="exercicioCadastro" options={{ drawerItemStyle: { display: 'none' } }} />
                            <Drawer.Screen name="Cadastro de Treino" component={TreinoCadastro} key="treinoCadastro" options={{ drawerItemStyle: { display: 'none' } }} />
                            <Drawer.Screen name="Alterar Exercicio" component={ExercicioUpdate} key="ExercicioUpdate" options={{ drawerItemStyle: { display: 'none' } }} />
                            <Drawer.Screen name="Alterar Treino" component={TreinoUpdate} key="treinoUpdate" options={{ drawerItemStyle: { display: 'none' } }} />
                        </Drawer.Navigator>
                    </AcompanhamentoProvider>
                </ExercicioProvider>
            </TreinoProvider>
        </UserProvider>
    );
};

export default SideBar;
