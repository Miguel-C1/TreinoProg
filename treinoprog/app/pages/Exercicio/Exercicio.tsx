import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Importe o hook useNavigation
import useExercicio from '../../../hooks/useExercicio';


// Defina uma interface para representar a estrutura dos dados do exercício
interface Exercise {
  id: number;
  name: string;
  group: {
    id: number;
    name: string;
    sub_group: string;
  };
}


const Exercicio = ({ navigation }: {navigation: any}) => {
   const { exercicios, searchExercicioByUserHandler, deleteExercicioHandler } = useExercicio()

   useEffect(() => {
    searchExercicioByUserHandler();
  }, []);
  

  const handleDelete = async (id: number) => {
    try {
      await deleteExercicioHandler(id)
    } catch (error) {
      console.error(error);
    }
  };

  // Função para renderizar cada item da lista
  const renderItem = ({ item }: { item: Exercise }) => (
    <View style={styles.item}>
      <Text style={styles.text}>{item.name}</Text>
      <Text style={styles.text}>{item.group.name}</Text>
      <TouchableOpacity style={styles.button} onPress={() => {
        navigation.navigate('Alterar Exercicio', { id: item.id });
      }}>
        <Text style={styles.buttonText}>Editar</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: 'red' }]}
        onPress={() => handleDelete(item.id)} // Chama handleDelete passando o ID do item
      >
        <Text style={styles.buttonText}>Excluir</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Cabeçalho da tabela */}
      <View style={styles.header}>
        <Text style={[styles.text, { fontWeight: 'bold' }]}>Nome</Text>
        <Text style={[styles.text, { fontWeight: 'bold' }]}>Grupo</Text>
      </View>
      {/* Corpo da tabela */}
      <FlatList
        data={exercicios}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate('Cadastro de Exercicio');
        }}
      >
        <Text style={styles.buttonText}>Adicionar Novo Exercício</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  text: {
    flex: 1,
    fontSize: 16,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'blue',
    borderRadius: 5,
    marginLeft: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Exercicio;
