import React, { useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import useTreino from '../../../hooks/userTreino';

interface TreinoProps {
  route: {
    params: {
      id: number;
      idUsuario: number;
    };
  };
  navigation: any;
}

interface Treino {
  id: number;
  name: string;
  date: string;
  exercises: {
    id: number;
    name: string;
    group: {
      id: number;
      name: string;
      sub_group: string;
    };
  }[];
}

const Treino = ({navigation}: {navigation:any}) => {
  const { treino, searchTreinoByUserIdHandler, deleteTreinoHandler, cleanObj  } = useTreino();

  useEffect(() => {
    searchTreinoByUserIdHandler();
  }, []);

  const handleDelete = async (id: number) => {
    await deleteTreinoHandler(id);
  };

  const renderItem = ({ item }: { item: Treino }) => (
    <View style={styles.item}>
      <Text style={styles.text}>{item.name}</Text>
      <Text style={styles.text}>{item.date}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Alterar Treino', { id: item.id })}
      >
        <Text style={styles.buttonText}>Editar</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: 'red' }]}
        onPress={() => handleDelete(item.id)}
      >
        <Text style={styles.buttonText}>Excluir</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.text, { fontWeight: 'bold' }]}>Nome</Text>
        <Text style={[styles.text, { fontWeight: 'bold' }]}>Data</Text>
        <Text style={styles.text}></Text>
      </View>
      <FlatList
        data={treino}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Cadastro de Treino')}
      >
        <Text style={styles.buttonText}>Adicionar Novo Treino</Text>
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

export default Treino;
