import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';


interface ExercicioUpdateProps {
  route: {
    params: {
      id: number;
      idUser: number;
    };
  };
  navigation: any;
  onUpdate: () => void;
}

const ExercicioUpdate: React.FC<ExercicioUpdateProps> = ({ route, navigation, onUpdate }) => {
  const [nome, setNome] = useState('');
  const [grupo, setGrupo] = useState(0);
  const [grupos, setGrupos] = useState([]);

  useEffect(() => {
    const fetchGrupos = async () => {
      const response = await fetch('http://localhost:3000/groups', { method: 'GET' });
      const response2 = await fetch(`http://localhost:3000/exercise/${route.params.id}`, { method: 'GET' });
      const json = await response.json();
      const json2 = await response2.json();
      json2[0].name && setNome(json2[0].name);
      json2[0].group.id && setGrupo(json2[0].group.id);
      setGrupos(json);
    };
    fetchGrupos();
  }, [route.params.id]);

  const handleSubmit = () => {
    const body = {
      name: nome,
      id_group: grupo
    };
    if (!nome || !grupo) {
      return;
    }
    fetch(`http://localhost:3000/exercise/${route.params.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .then(onUpdate)
      .then(() => navigation.navigate('Exercicios'))
      .catch(error => console.error(error));
    
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
