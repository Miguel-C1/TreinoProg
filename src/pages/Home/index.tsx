import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { 
  faUserGroup,
  faSatellite,
  faCloudRain,
  faFileLines,
  faTriangleExclamation,
  faRightToBracket,
} from '@fortawesome/free-solid-svg-icons';
import { useNavigation } from '@react-navigation/native';

export default function Home() {
  const navigation = useNavigation();

  const buttons = () => {
    const options = [
      {
        link: 'AdminUsers',
        name: 'USUÁRIOS',
        icon: faUserGroup,
      },
      {
        link: 'AdminStations',
        name: 'ESTAÇÕES',
        icon: faSatellite,
      },
      {
        link: 'AdminParams',
        name: 'PARÂMETROS',
        icon: faCloudRain,
      },
      {
        link: 'AdminReports',
        name: 'RELATÓRIOS',
        icon: faFileLines,
      },
      {
        link: 'AdminAlerts',
        name: 'ALERTAS',
        icon: faTriangleExclamation,
      },
      {
        link: 'Home',
        name: 'SAIR',
        icon: faRightToBracket,
      },
    ];

    return options.map((opt, index) => (
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate(opt.link)} key={index}>
        <FontAwesomeIcon icon={opt.icon} />
        <Text>{opt.name}</Text>
      </TouchableOpacity>
    ));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem Vindo a LW Solution!</Text>
      <View style={styles.row}>
        {buttons()}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  button: {
    width: '30%',
    margin: 10,
    padding: 20,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
});