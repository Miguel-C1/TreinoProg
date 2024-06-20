import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';


interface ExercicioCadastroProps {
  route: {
    params: {
      id: number;
      idUsuario: number;
    };
  };
  onUpdate: () => void;
  navigation: any;
}

const API_URL = '192.168.244.30';


const ExercicioCadastro: React.FC<ExercicioCadastroProps> = ({route,onUpdate, navigation}) => {
  const [nome, setNome] = useState('');
  const [grupo, setGrupo] = useState(0);
  const [grupos, setGrupos] = useState([]);

  useEffect(() => {
    const fetchGrupos = async () => {
      const response = await fetch(`${API_URL}/groups`, { method: 'GET' });
      const json = await response.json();
      setGrupos(json);
    };
    fetchGrupos();
  }, []);

  console.log(grupos)
  console.log(grupo)

  const handleSubmit = async () => {
    console.log("ID USUARIO:")
    console.log(route.params.idUsuario)
    const body = {
      id_user: route.params.idUsuario,
      name: nome,
      id_group: grupo
    };
    if (!nome || !grupo) {
      return;
    }
    await fetch(`${API_URL}/exercise`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .then(() => navigation.navigate('Exercicios').then(onUpdate))
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
