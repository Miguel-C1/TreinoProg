import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const Treino = () => {

  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('localhost:3000/training');
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    }
  };

  // Função para renderizar cada item da lista
  const renderItem = ({ item }: { item: { id: number, dia: string, nome: string } }) => (
    <View style={styles.item}>
      <Text style={styles.text}>{item.dia}</Text>
      <Text style={styles.text}>{item.nome}</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Editar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, { backgroundColor: 'red' }]}>
        <Text style={styles.buttonText}>Excluir</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Cabeçalho da tabela */}
      <View style={styles.header}>
        <Text style={[styles.text, { fontWeight: 'bold' }]}>Dia</Text>
        <Text style={[styles.text, { fontWeight: 'bold' }]}>Nome</Text>
        <Text style={styles.text}></Text> {/* Espaço para os botões */}
      </View>
      {/* Corpo da tabela */}
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
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

export default Treino;


