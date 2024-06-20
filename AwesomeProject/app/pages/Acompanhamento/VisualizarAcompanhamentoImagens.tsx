import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { fromByteArray } from 'base64-js';

interface User {
  id: number;
  firstName: string;
  login: string;
  senha: string;
  lastName: string;
  age: number;
}

interface Training {
  id: number;
  name: string;
  date: string;
}

interface Image2 {
  id: number;
  data: {
    type: string;
    data: number[];
  };
}

interface Acompanhamento {
  id: number;
  data: string;
  taPago: boolean;
  user: User;
  training: Training;
  image?: Image2;
}

const API_URL = '192.168.244.30';

interface VisualizarAcompanhamentoProps {
  route: {
    params: {
      id: number;
      idUsuario: number;
    };
  };
  navigation: any;
  onUpdate: () => void;
}

const VisualizarAcompanhamento: React.FC<VisualizarAcompanhamentoProps> = ({ route, navigation }) => {
  const [acompanhamentos, setAcompanhamentos] = useState<Acompanhamento[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAcompanhamentos = async () => {
      try {
        const response = await fetch(`${API_URL}/acompanhamento/user/${route.params.idUsuario}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Acompanhamentos:', data);
        setAcompanhamentos(data);
      } catch (error) {
        console.error('Error fetching acompanhamentos:', error);
        setError('Failed to fetch acompanhamentos');
      } finally {
        setLoading(false);
      }
    };

    fetchAcompanhamentos();
  }, [route.params.idUsuario]);

  const renderItem = ({ item }: { item: Acompanhamento }) => {
    const convertBufferToBase64 = (buffer: number[]) => {
      const bytes = new Uint8Array(buffer);
      return fromByteArray(bytes);
    };
  
    const imageUri = item.image ? `data:image/jpeg;base64,${convertBufferToBase64(item.image.data.data)}` : null;
  
    console.log('Image URI:', imageUri); // Verifique se a URI está sendo montada corretamente
  
    return (
      <View style={styles.itemContainer}>
        <Text>Data: {new Date(item.data).toLocaleString()}</Text>
        <Text>Treino: {item.training.name} ({item.training.date})</Text>
        <Text>Status: {item.taPago ? 'Pago' : 'Faltou'}</Text>
        {imageUri && (
          <Image
            source={{ uri: imageUri }}
            style={styles.image}
            resizeMode="center"

          />
        )}
      </View>
    );
  };
  

  if (loading) {
    return (
      <View style={styles.centeredContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centeredContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

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
