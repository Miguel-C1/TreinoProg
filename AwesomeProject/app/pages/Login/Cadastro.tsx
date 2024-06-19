import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

export default function RegisterScreen ({ navigation }: { navigation: any }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const [age, setAge] = useState('');

  const handleRegister = async () => {
    if (!firstName || !lastName || !login || !senha || !age) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

      try {
          
          if (!firstName || !lastName || !login || !senha || !age) {
                Alert.alert('Erro', 'Por favor, preencha todos os campos.');
                return;
            }
        const dataD = {
            firstName: firstName,
            lastName: lastName,
            login: login,
            senha: senha,
            age: Number(age),
        };
      const response = await fetch('http://localhost:3000/user/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          },
        body: JSON.stringify(dataD),
      });

      if (!response.ok) {
        throw new Error('Erro ao realizar cadastro');
      }

          const data = await response.json();
          navigation.navigate('Login');
      Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
      // Navegar para a tela de login ou outra tela
    } catch (error: any) {
      Alert.alert('Erro', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro</Text>
      <TextInput
        style={styles.input}
        placeholder="Primeiro Nome"
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        style={styles.input}
        placeholder="Sobrenome"
        value={lastName}
        onChangeText={setLastName}
      />
      <TextInput
        style={styles.input}
        placeholder="Login"
        value={login}
        onChangeText={setLogin}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Idade"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
      />
      <Button title="Registrar" onPress={handleRegister} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
  },
});
