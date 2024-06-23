import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import useExercicio from '../../../hooks/useExercicio';

const ExercicioUpdate = ({ navigation, route }: { navigation: any, route: any}) => {
  const { updateExercicioHandler, exercicios, exercicioObj, groups,searchEsercicioByIDHandler, searchGroupsHandler } = useExercicio();
  const [nome, setNome] = useState('');
  const [grupo, setGrupo] = useState(0);
  const [grupos, setGrupos] = useState<any[]>([]);
  const { id } = route.params;

  const fetchData = async () => {
    await searchEsercicioByIDHandler(id);
  };

  const fetchDataGrupo = async () => {
    await searchGroupsHandler() 
  };

  useEffect(() => {
    fetchData();
    fetchDataGrupo();
  }, [id]);

  useEffect(() => {
    if (exercicioObj[0] && grupos) {
      setNome(exercicioObj[0].name);
      setGrupo(exercicioObj[0].group.id);
      setGrupos(groups)
    }
  }, [exercicioObj, grupos]);

  const handleSubmit = () => {
    updateExercicioHandler(Number(id), nome, grupo);
    navigation.navigate('Exercicios')
  };

  if (!exercicioObj[0]) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nome do Exercício"
        value={nome}
        onChangeText={setNome}
      />
      <Picker
        selectedValue={grupo}
        style={styles.input}
        onValueChange={(itemValue: any) => setGrupo(itemValue)}
      >
        {grupos.map((g: { id: number, name: string }) => (
          <Picker.Item key={g.id} label={g.name} value={g.id} />
        ))}
      </Picker>
      <Button title="Editar Exercício" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    width: '100%',
    height: 40,
    marginVertical: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default ExercicioUpdate;
