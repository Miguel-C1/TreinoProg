import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import useExercicio from '@/hooks/useExercicio';
import useTreino from '@/hooks/userTreino';

const TreinoCadastro = ({ navigation }: { navigation: any }) => {
    const { exercicios, searchExercicioByUserHandler } = useExercicio();
    const { createTreinoHandler, cleanObj } = useTreino();
    const [nomeTreino, setNomeTreino] = useState('');
    const [data, setData] = useState<string>('');
    const [exerciciosEscolhidos, setExercicios] = useState<number[]>([]);
    const [selectedExercicio, setSelectedExercicio] = useState<number | undefined>(undefined);

    useEffect(() => {
        fetchExercicios();
    }, []);

    const fetchExercicios = async () => {
        searchExercicioByUserHandler();
    };

    const handleAddExercicio = () => {
        if (selectedExercicio !== undefined) {
            setExercicios([...exerciciosEscolhidos, selectedExercicio]);
            setSelectedExercicio(undefined); 
        }
    };

    const handleRemoveExercicio = (exercicioId: number) => {
        setExercicios(exerciciosEscolhidos.filter(ex => ex !== exercicioId));
    };
    
    const handleSubmit = async () => {
        createTreinoHandler(nomeTreino, exerciciosEscolhidos, data);
        navigation.navigate('Treino').then(await cleanObj());;
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Nome do Treino"
                value={nomeTreino}
                onChangeText={setNomeTreino}
            />
            <Picker
                selectedValue={selectedExercicio}
                style={styles.input}
                onValueChange={(value) => setSelectedExercicio(value)}
            >
                <Picker.Item label="Selecione um exercício" value={undefined} />
                {exercicios.map((exercicio) => (
                    <Picker.Item key={exercicio.id} label={exercicio.name} value={exercicio.id} />
                ))}
            </Picker>
            <Button title="Adicionar Exercício" onPress={handleAddExercicio} />
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={[styles.text, { fontWeight: 'bold' }]}>Nome</Text>
                    <Text style={[styles.text, { fontWeight: 'bold' }]}>Grupo</Text>
                    <Text style={styles.text}></Text>
                </View>

                <FlatList
                    data={exerciciosEscolhidos}
                    keyExtractor={(item) => item.toString()}
                    renderItem={({ item }) => {
                        console.log("Item: ")
                        console.log(item)
                        const exercicioT = exercicios.find(ex => ex.id == item);
                        console.log(exercicioT)
                        return (
                            <View style={styles.item}>
                                {exercicioT ? (
                                    <>
                                        <Text style={styles.text}>{exercicioT.name}</Text>
                                        <Text style={styles.text}>{exercicioT.group.name}</Text>
                                    </>
                                ) : null}
                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={() => handleRemoveExercicio(item)}
                                >
                                    <Text style={styles.buttonText}>Excluir</Text>
                                </TouchableOpacity>
                            </View>
                        );
                    }}
                />
            </View>
            <View style={styles.dataContainer}>
                <Text style={styles.dataLabel}>Data:</Text>
                <Picker
                    style={styles.dataInput}
                    selectedValue={data}
                    onValueChange={(value) => setData(value)}
                >
                    <Picker.Item label="Selecione uma data" value="" />
                    <Picker.Item label="Segunda-feira" value="Segunda" />
                    <Picker.Item label="Terça-feira" value="Terca" />
                    <Picker.Item label="Quarta-feira" value="Quarta" />
                    <Picker.Item label="Quinta-feira" value="Quinta" />
                    <Picker.Item label="Sexta-feira" value="Sexta" />
                    <Picker.Item label="Sábado" value="Sabado" />
                    <Picker.Item label="Domingo" value="Domingo" />
                </Picker>
            </View>
            <Button title="Cadastrar Treino" onPress={handleSubmit} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    input: {
        width: '100%',
        height: 40,
        marginVertical: 12,
        borderWidth: 1,
        padding: 10,
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

export default TreinoCadastro;
