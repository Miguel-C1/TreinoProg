import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function Acompanhamento(gotoHome: any) {

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Acompanhamento</Text>
      <View style={styles.row}>
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
