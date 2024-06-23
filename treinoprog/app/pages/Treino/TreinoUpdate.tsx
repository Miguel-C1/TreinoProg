import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import useExercicio from '../../../hooks/useExercicio';
import useTreino from '../../../hooks/userTreino';

const TreinoUpdate = ({ navigation, route }: { navigation: any, route: any }) => {
    const { treinoObj, updateTreinoHandler, seatchTreinoByIdHandler, cleanObj } = useTreino();
    const [nomeTreino, setNomeTreino] = useState('');
    const [data, setData] = useState<string>('');
    const [exerciciosEscolhidos, setExercicios] = useState<number[]>([]);
    const [selectedExercicio, setSelectedExercicio] = useState<number | undefined>(undefined);
    const { id } = route.params;
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTreinoData();
    }, [id]);

    useEffect(() => {
        if (treinoObj.length > 0 && treinoObj[0].exercises) {
            setNomeTreino(treinoObj[0].name);
            setData(treinoObj[0].date);
            setExercicios(treinoObj[0].exercises.map((exercise: any) => exercise.id));
            setLoading(false);
        }
    }, [treinoObj]);

    const fetchTreinoData = async () => {
        try {
            await seatchTreinoByIdHandler(id);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    const handleAddExercicio = () => {
        if (selectedExercicio !== undefined && !exerciciosEscolhidos.includes(selectedExercicio)) {
            setExercicios([...exerciciosEscolhidos, selectedExercicio]);
            setSelectedExercicio(undefined); // Clear the selection
        }
    };

    const handleRemoveExercicio = (exercicioId: number) => {
        setExercicios(exerciciosEscolhidos.filter((id) => id !== exercicioId));
    };

    const handleUpdate = async () => {
        console.log(id, nomeTreino, exerciciosEscolhidos, data);
        updateTreinoHandler(id, nomeTreino, exerciciosEscolhidos, data);
        navigation.navigate('Treino').then(await cleanObj());
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

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
                {treinoObj[0].exercises.map((exercicio) => (
                    <Picker.Item key={exercicio.id} label={exercicio.name} value={exercicio.id} />
                ))}
            </Picker>
            <Button title="Adicionar Exercício" onPress={handleAddExercicio} />
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={[styles.text, { fontWeight: 'bold' }]}>Nome</Text>
                    <Text style={styles.text}>Ações</Text>
                </View>
                <FlatList
                    data={exerciciosEscolhidos}
                    keyExtractor={(item) => item.toString()}
                    renderItem={({ item }) => {
                        const exercicioT = treinoObj[0].exercises.find((ex) => ex.id === item);
                        return (
                            <View style={styles.item}>
                                <Text style={styles.text}>{exercicioT?.name}</Text>
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
            <Button title="Atualizar Treino" onPress={handleUpdate} />
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

export default TreinoUpdate;
