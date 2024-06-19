import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Cadastrar from "@/app/pages/Login/Cadastro";
import LoginScreen from "@/app/pages/Login/Login";

const Stack = createStackNavigator();


interface MainStackProps {
    onLogin: (userData: object) => void;
}

const MainStack: React.FC<MainStackProps> = ({ onLogin }) => (
    <Stack.Navigator screenOptions={{
        headerShown: false
    }}>
        <Stack.Screen name="Login">
            {(props) => <LoginScreen {...props} onLogin={onLogin} />}
        </Stack.Screen>
        <Stack.Screen name="Cadastrar" component={Cadastrar} />
    </Stack.Navigator>
);

const AppNavigator: React.FC<{ onLogin: (userData: object) => void }> = ({ onLogin }) => {
    return (
        <NavigationContainer independent={true}>
            <MainStack onLogin={onLogin} />
        </NavigationContainer>
    );
}

export default AppNavigator;
