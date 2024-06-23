import { AppRegistry } from 'react-native';
import App from './app/index'; // Supondo que o componente principal do seu aplicativo seja importado de './App.js'
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
