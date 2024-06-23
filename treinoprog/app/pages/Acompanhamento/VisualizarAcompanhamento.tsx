import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import useAcompanhamento from '../../../hooks/useAcompanhamento';

const VisualizarAcompanhamento = ({ navigation, route }: { navigation: any, route: any }) => {
  const { diasFaltadosT, diasFaltadosHandler, acompanhamentos } = useAcompanhamento();
  const [semanas, setSemanas] = useState<any[]>([]); // Estado para armazenar os dados das semanas

  useEffect(() => {
    const fetchAcompanhamentoData = async () => {
      await diasFaltadosHandler();  // Atualiza diasFaltadosT
      if (diasFaltadosT) {
        const labels = Object.keys(diasFaltadosT);
        console.log(labels)
        console.log(diasFaltadosT)
        // Transforma o objeto diasFaltadosT em um array de semanas com faltas e presenças
        const semanasData = labels.map((dia) => ({
          semana: dia,
          faltas: diasFaltadosT[dia].faltas,
          presencas: diasFaltadosT[dia].presentes,
        }));

        setSemanas(semanasData);
      }
    };

    fetchAcompanhamentoData();
  }, [acompanhamentos]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Relatório de Faltas e Presenças por Semana</Text>
      <View style={styles.tableContainer}>
        <View style={styles.tableHeader}>
          <Text style={styles.headerText}>Semana</Text>
          <Text style={styles.headerText}>Faltas</Text>
          <Text style={styles.headerText}>Presenças</Text>
        </View>
        {semanas.map((semana, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={styles.rowText}>{semana.semana}</Text>
            <Text style={styles.rowText}>{semana.faltas}</Text>
            <Text style={styles.rowText}>{semana.presencas}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  tableContainer: {
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    overflow: 'hidden',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f2f2f2',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  headerText: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  rowText: {
    flex: 1,
    textAlign: 'center',
  },
});

export default VisualizarAcompanhamento;
