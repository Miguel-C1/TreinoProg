// components/ExercicioCadastro.tsx
import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import useExercicio from '../../../hooks/useExercicio';

const ExercicioCadastro = ({ navigation }: { navigation: any; }) => {
  const [nome, setNome] = useState('');
  const [grupo, setGrupo] = useState<number | undefined>(undefined);
  const { exercicios, searchExercicioByUserHandler, createExercicioHandler } = useExercicio();

  useEffect(() => {
    searchExercicioByUserHandler();
  }, []);

  const handleSubmit = async () => {
    if (!nome || grupo === undefined) {
      return;
    }
    await createExercicioHandler(nome, grupo);
    navigation.navigate('Exercicios');
  };

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
        onValueChange={(itemValue: number) => setGrupo(itemValue)}
      >
        {exercicios.map((g: { id: number; name: string }) => (
          <Picker.Item key={g.id} label={g.name} value={g.id} />
        ))}
      </Picker>
      <Button title="Cadastrar Exercício" onPress={handleSubmit} />
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

export default ExercicioCadastro;
