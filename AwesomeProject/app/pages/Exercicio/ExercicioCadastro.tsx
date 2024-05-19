import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';


interface ExercicioCadastroProps {
  onUpdate: () => void;
}

const ExercicioCadastro: React.FC<ExercicioCadastroProps> = ({onUpdate}) => {
  const [nome, setNome] = useState('');
  const [grupo, setGrupo] = useState(0);
  const [grupos, setGrupos] = useState([]);

  useEffect(() => {
    const fetchGrupos = async () => {
      const response = await fetch('http://localhost:3000/groups', { method: 'GET' });
      const json = await response.json();
      setGrupos(json);
    };
    fetchGrupos();
  }, []);

  console.log(grupos)
  console.log(grupo)

  const handleSubmit = () => {
    const body = {
      name: nome,
      id_group: grupo
    };
    if (!nome || !grupo) {
      return;
    }
    fetch('http://localhost:3000/exercise', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .then(onUpdate)
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
