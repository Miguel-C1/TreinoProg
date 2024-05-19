import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';

interface TreinoUpdateProps {
    route: {
        params: {
          id: number;
        };
      };
    onUpdate: () => void;
}

const TreinoUpdate: React.FC<TreinoUpdateProps> = ({ route, onUpdate }) => {
    const [nomeTreino, setNomeTreino] = useState('');
    const [data, setData] = useState<string>('');
    const [exercicios, setExercicios] = useState<any>([]);
    const [listaExercicios, setListaExercicios] = useState<{ id: number; name: string, group: { name: string } }[]>([]);
    const [selectedExercicio, setSelectedExercicio] = useState<number | undefined>(undefined);

    useEffect(() => {
        fetchExercicios();
        fetchTreinoData();
        console.log(route.params.id)
    }, [route.params.id]);

    const fetchExercicios = async () => {
        try {
            const response = await fetch('http://localhost:3000/exercise/');
            const json = await response.json();
            setListaExercicios(json);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchTreinoData = async () => {
        try {
            const response = await fetch(`http://localhost:3000/training/${route.params.id}`);
            const json = await response.json();
            console.log(response)
            console.log(json);
            setNomeTreino(json[0].name);
            setData(json[0].date);
            setExercicios(json[0].exercises);
        } catch (error) {
            console.error(error);
        }
    };

    const handleAddExercicio = () => {
        if (selectedExercicio !== undefined) {
            setExercicios([...exercicios, selectedExercicio]);
            setSelectedExercicio(undefined); // Clear the selection
        }
    };

    const handleRemoveExercicio = (exercicioId: number) => {
        setExercicios(exercicios.filter((ex: { id: number; }) => ex.id !== exercicioId));
    };

    const handleUpdate = () => {
        const treinoData = {
            name: nomeTreino,
            exercises: exercicios,
            date: data,
            user: 1,
        };
        fetch(`http://localhost:3000/training/${route.params.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(treinoData),
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
                {listaExercicios.map((exercicio) => (
                    <Picker.Item key={exercicio.id} label={exercicio.name} value={exercicio.id} />
                ))}
            </Picker>
            <Button title="Adicionar Exercício" onPress={handleAddExercicio} />
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={[styles.text, { fontWeight: 'bold' }]}>Nome</Text>
                    <Text style={styles.text}></Text> {/* Espaço para os botões */}
                </View>

                <FlatList
                    data={exercicios}
                    keyExtractor={(item) => item.toString()}
                    renderItem={({ item }) => {
                        console.log("Item")
                        console.log(item)
                        const exercicio = listaExercicios.find(ex => ex.id == item.id);
                        console.log(listaExercicios)
                        console.log("exercicio")
                        console.log(exercicio)

                        return (
                            <View style={styles.item}>
                                <Text style={styles.text}>{exercicio?.name} </Text>
                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={() => handleRemoveExercicio(item.id)}
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
