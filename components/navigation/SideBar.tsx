import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "@/app/pages/Home";
import Treino from "@/app/pages/Treino";
import Exercicio from "@/app/pages/Exercicio";
import Acompanhamento from "@/app/pages/Acompanhamento";

const drawer = createDrawerNavigator();

const SideBar = () => {
    return (
        <drawer.Navigator>
            <drawer.Screen name="Treino" component={Treino} key='treino' />
            <drawer.Screen name="Home" component={Home} key='home' />
            <drawer.Screen name="Exercicios" component={Exercicio} key='exercicios' />
            <drawer.Screen name="Acompanhamento" component={Acompanhamento} key='acompanhamento' />
        </drawer.Navigator>
    );
}

export default SideBar;
