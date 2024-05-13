import React from 'react';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {
  faUserGroup,
  faSatellite,
  faCloudRain,
  faFileLines,
  faTriangleExclamation,
  faRightToBracket,
} from '@fortawesome/free-solid-svg-icons';

// Define an interface for the structure of each option
interface Option {
  link: keyof RootStackParamList;
  name: string;
  icon: any; // Adjust the type if necessary
}

type RootStackParamList = {
  AdminUsers: undefined;
  AdminStations: undefined;
  AdminParams: undefined;
  AdminReports: undefined;
  AdminAlerts: undefined;
  Home: undefined;
};

export default function Home() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const buttons = () => {
    // Explicitly specify the type of the options array
    const options: Option[] = [
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

    return options.map((option, index) => (
      <TouchableOpacity
        key={index}
        style={styles.button}
        onPress={() => navigation.navigate(option.link)}>
        <FontAwesomeIcon icon={option.icon} size={30} />
        <Text>{option.name}</Text>
      </TouchableOpacity>
    ));
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>{buttons()}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
