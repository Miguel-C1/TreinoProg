import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "@/app/pages/Home";
import Treino from "@/app/pages/Treino/Treino";
import Exercicio from "@/app/pages/Exercicio/Exercicio";
import Acompanhamento from "@/app/pages/Acompanhamento";
import ExercicioCadastro from "@/app/pages/Exercicio/ExercicioCadastro";


type RootStackParamList = {
    Home: undefined;
    Treino: undefined;
    Exercicios: undefined;
    Acompanhamento: undefined;
    'Cadastro de Exercicio': undefined; // Certifique-se de que o nome da rota está igual ao definido na navegação
  };

const drawer = createDrawerNavigator<RootStackParamList>();

const SideBar = () => {
    return (
        <drawer.Navigator>
            <drawer.Screen name="Treino" component={Treino} key='treino' />
            <drawer.Screen name="Home" component={Home} key='home' />
            <drawer.Screen name="Exercicios" component={Exercicio} key='exercicios' />
            <drawer.Screen name="Acompanhamento" component={Acompanhamento} key='acompanhamento' />
            <drawer.Screen name="Cadastro de Exercicio" component={ExercicioCadastro} key='exercicioCadastro' />
        </drawer.Navigator>
    );
}

export default  SideBar;
