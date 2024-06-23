import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { fromByteArray } from 'base64-js';
import  useAcompanhamento  from '../../../hooks/useAcompanhamento'

const VisualizarAcompanhamento = ({ navigation, route }: { navigation: any, route: any }) => {
  const { acompanhamentos, searchAcompanhamentoByUserHandler} = useAcompanhamento();
  useEffect(() => {
    const fetchAcompanhamentos = async () => {
       await searchAcompanhamentoByUserHandler()
    };

    fetchAcompanhamentos();
  }, []);

  const renderItem = ({ item }: { item: any }) => {
  
    return (
      <View style={styles.itemContainer}>
        <Text>Data: {new Date(item.data).toLocaleString()}</Text>
        <Text>Treino: {item.training.name} ({item.training.date})</Text>
        <Text>Status: {item.taPago ? 'Pago' : 'Faltou'}</Text>
        {item && (
          <Image
            source={{ uri: item.image.imagem }}
            style={styles.image}
            resizeMode="center"

          />
        )}
      </View>
    );
  };
  

  return (
    <FlatList
      data={acompanhamentos}
      renderItem={renderItem}
      keyExtractor={item => item.id.toString()}
      contentContainerStyle={styles.flatListContainer}
    />
  );
};

const styles = StyleSheet.create({
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
  flatListContainer: {
    paddingHorizontal: 10,
  },
  itemContainer: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  image: {
    width: '100%',
    height: 200,
    marginTop: 10,
  },
});

export default VisualizarAcompanhamento;
