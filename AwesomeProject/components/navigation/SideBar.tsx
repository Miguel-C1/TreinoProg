import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "@/app/pages/Home";
import Treino from "@/app/pages/Treino/Treino";
import Exercicio from "@/app/pages/Exercicio/Exercicio";
import Acompanhamento from "@/app/pages/Acompanhamento";
import ExercicioCadastro from "@/app/pages/Exercicio/ExercicioCadastro";
import ExercicioUpdate from "@/app/pages/Exercicio/ExercicioUpdate";
import TreinoCadastro from "@/app/pages/Treino/TreinoCadastrar";


type RootStackParamList = {
    Home: undefined;
    Treino: undefined;
    Exercicios: undefined;
    Acompanhamento: undefined;
    'Cadastro de Exercicio': undefined; 
    ExercicioUpdate: { id: number }; 
    'Cadastro de Treino': undefined; 
};

const drawer = createDrawerNavigator<RootStackParamList>();

const SideBar = () => {
    return (
        <drawer.Navigator>
            <drawer.Screen name="Treino" component={Treino} key='treino' />
            <drawer.Screen name="Home" component={Home} key='home' />
            <drawer.Screen name="Exercicios" component={Exercicio} key='exercicios' />
            <drawer.Screen name="Acompanhamento" component={Acompanhamento} key='acompanhamento' />
            <drawer.Screen name="Cadastro de Exercicio" component={ExercicioCadastro} key='exercicioCadastro'
                options={{
                    drawerItemStyle: { display: 'none' } // Isto oculta o item do menu no Drawer
                }} />
            <drawer.Screen name="Cadastro de Treino" component={TreinoCadastro} key='treinoCadastro'
                options={{
                    drawerItemStyle: { display: 'none' } // Isto oculta o item do menu no Drawer
                }} />
            <drawer.Screen
                name="ExercicioUpdate"
                component={ExercicioUpdate as React.ComponentType<any>}
                key='ExercicioUpdate'
                options={{ drawerItemStyle: { display: 'none' } }}
            />

        </drawer.Navigator>
    );
}

export default SideBar;
