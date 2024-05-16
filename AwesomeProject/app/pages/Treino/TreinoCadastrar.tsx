import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const TreinoCadastro = () => {
    const [nomeTreino, setNomeTreino] = useState('');
    const [datas, setDatas] = useState<{ segunda: string; terca: string; quarta: string; quinta: string; sexta: string; sabado: string; domingo: string }>({
        segunda: '',
        terca: '',
        quarta: '',
        quinta: '',
        sexta: '',
        sabado: '',
        domingo: ''
    });
    const [exercicios, setExercicios] = useState<number[]>([]);
    const [listaExercicios, setListaExercicios] = useState<{ id: number; name: string }[]>([]);

    useEffect(() => {
        fetchExercicios();
    }, []);

    const fetchExercicios = async () => {
        try {
            const response = await fetch('http://localhost:3000/exercise/');
            const json = await response.json();
            setListaExercicios(json);
        } catch (error) {
            console.error(error);
        }
    };

    const handleAddExercicio = () => {
        // Adicionar um exercício à lista de exercícios
        setExercicios([...exercicios, listaExercicios[0]?.id || 0]);
    };

    const handleExercicioChange = (index: number, value: number) => {
        // Atualizar a lista de exercícios com o novo valor
        const newExercicios = [...exercicios];
        newExercicios[index] = value;
        setExercicios(newExercicios);
    };

    const handleDataChange = (dia: string, value: string) => {
        // Atualizar a lista de datas com o novo valor
        setDatas({ ...datas, [dia]: value });
    };

    const handleSubmit = () => {
        // Enviar os dados para o servidor
        const treinoData = {
            nome: nomeTreino,
            exercicios: exercicios,
            datas: datas
        };
        console.log(treinoData); // Substitua por sua lógica de envio para o servidor
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Nome do Treino"
                value={nomeTreino}
                onChangeText={setNomeTreino}
            />
            {exercicios.map((exercicioId, index) => (
                <Picker
                    key={index}
                    selectedValue={exercicioId}
                    style={styles.input}
                    onValueChange={(value) => handleExercicioChange(index, value)}
                >
                    {listaExercicios.map((exercicio) => (
                        <Picker.Item key={exercicio.id} label={exercicio.name} value={exercicio.id} />
                    ))}
                </Picker>
            ))}
            <Button title="Adicionar Exercício" onPress={handleAddExercicio} />
            <View style={styles.dataContainer}>
                <Text style={styles.dataLabel}>Segunda:</Text>
                <Picker
                    style={styles.dataInput}
                    selectedValue={datas.segunda}
                    onValueChange={(value) => handleDataChange('segunda', value)}
                >
                    <Picker.Item label="Selecione uma data" value="" />
                    <Picker.Item label="Segunda-feira" value="Segunda" />
                    <Picker.Item label="Terça-feira" value="Terca" />
                    <Picker.Item label="Quarta-feira" value="Quarta" />
                    <Picker.Item label="Quinta-feira" value="Quinta" />
                    <Picker.Item label="Sexta-feira" value="Sexta" />
                    <Picker.Item label="Sabado" value="Sabado" />
                    <Picker.Item label="Domingo" value="Domingo" />
                </Picker>
            </View>
            {/* Adicione outros dias aqui */}
            <Button title="Cadastrar Treino" onPress={handleSubmit} />
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
    dataContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    dataLabel: {
        marginRight: 10,
    },
    dataInput: {
        flex: 1,
        height: 40,
        borderWidth: 1,
        padding: 10,
    },
});

export default TreinoCadastro;
