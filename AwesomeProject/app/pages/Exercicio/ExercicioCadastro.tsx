import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';

const ExercicioCadastro = ({ navigation }: { navigation: any }) => {
  const [nome, setNome] = useState('');
  const [grupo, setGrupo] = useState('');

  const handleSubmit = async () => {
    // Implementar chamada API para criar novo exercício
    Alert.alert('Exercício cadastrado', `Nome: ${nome}, Grupo: ${grupo}`);
    navigation.goBack(); // Retorna para a tela anterior após o cadastro
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nome do Exercício"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={styles.input}
        placeholder="Grupo do Exercício"
        value={grupo}
        onChangeText={setGrupo}
      />
      <Button
        title="Cadastrar Exercício"
        onPress={handleSubmit}
      />
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
