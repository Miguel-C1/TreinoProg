import React, { FunctionComponent } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "@/app/pages/Home";
import Treino from "@/app/pages/Treino/Treino";
import Exercicio from "@/app/pages/Exercicio/Exercicio";
import Acompanhamento from "@/app/pages/Acompanhamento";
import ExercicioCadastro from "@/app/pages/Exercicio/ExercicioCadastro";
import ExercicioUpdate from "@/app/pages/Exercicio/ExercicioUpdate";
import TreinoCadastro from "@/app/pages/Treino/TreinoCadastrar";
import TreinoUpdate from "@/app/pages/Treino/TreinoUpdate";
import Template from "@/template/template";

type RootStackParamList = {
    Home: { idUsuario: number };
    Treino: { idUsuario: number } ;
    Exercicios: { idUsuario: number };
    Acompanhamento: { idUsuario: number };
    'Cadastro de Exercicio': { idUsuario: number }; 
    'Alterar Exercicio': { id: number, idUsuario: number }; 
    'Cadastro de Treino': { idUsuario: number }; 
    'Alterar Treino': { id: number, idUsuario: number };
};

const drawer = createDrawerNavigator<RootStackParamList>();

const SideBar = ({ user }: { user: number }) => {

    return (
        <drawer.Navigator>
            <drawer.Screen name="Treino"
                component={Treino as React.ComponentType<any>}
                initialParams={{ idUsuario: user }}
                key='treino' />
            <drawer.Screen name="Home"
                component={Home as React.ComponentType<any>}
                initialParams={{ idUsuario: user }}
                key='home' />
            <drawer.Screen name="Exercicios"
                component={Exercicio as React.ComponentType<any>}
                initialParams={{ idUsuario: user }}
                key='exercicios' />
            <drawer.Screen name="Acompanhamento"
                component={Acompanhamento as React.ComponentType<any>}
                initialParams={{ idUsuario: user }}
                key='acompanhamento' />
            <drawer.Screen name="Cadastro de Exercicio"
                component={ExercicioCadastro as React.ComponentType<any>}
                initialParams={{ idUsuario: user }}
                key='exercicioCadastro'
                options={{
                    drawerItemStyle: { display: 'none' }
                }}
                 />
            <drawer.Screen name="Cadastro de Treino"
                component={TreinoCadastro as React.ComponentType<any>}
                key='treinoCadastro'
                initialParams={{ idUsuario: user }}
                options={{
                    drawerItemStyle: { display: 'none' } // Isto oculta o item do menu no Drawer
                }} />
            <drawer.Screen
                name="Alterar Exercicio"
                component={ExercicioUpdate as React.ComponentType<any>}
                initialParams={{ idUsuario: user }}
                key='ExercicioUpdate'
                options={{ drawerItemStyle: { display: 'none' } }}
            />
            <drawer.Screen
                name="Alterar Treino"
                component={TreinoUpdate as React.ComponentType<any>}
                initialParams={{ idUsuario: user }}
                key='treinoUpdate'
                options={{ drawerItemStyle: { display: 'none' } }}
            />
        </drawer.Navigator>
    );
}

export default SideBar;
