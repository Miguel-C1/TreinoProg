import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import  useAcompanhamento  from '../../../hooks/useAcompanhamento'

const VisualizarAcompanhamento = ({ navigation, route, }: { navigation: any, route: any }) => {
  const { searchAcompanhamentoByUserHandler, acompanhamentos } = useAcompanhamento();
  const [data, setData] = useState<{ trueCount: number; falseCount: number }>({ trueCount: 0, falseCount: 0 });
  const { width } = useWindowDimensions(); // Hook para obter as dimensões da janela

  useEffect(() => {
    const fetchTaPagoCounts = async () => {
      searchAcompanhamentoByUserHandler();
    };

    fetchTaPagoCounts();
  }, [route.params.idUsuario]);

  const chartData = {
    labels: ['Pago', 'Faltou'],
    datasets: [
      {
        data: [data.trueCount, data.falseCount],
      },
    ],
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Relatório de Acompanhamento</Text>
      <BarChart
        style={styles.chart}
        data={chartData}
        width={width - 32} // Ajusta a largura do gráfico com base na largura da tela
        height={220}
        yAxisLabel=""
        yAxisSuffix=""
        chartConfig={{
          backgroundColor: '#e26a00',
          backgroundGradientFrom: '#fb8c00',
          backgroundGradientTo: '#ffa726',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#ffa726',
          },
        }}
        verticalLabelRotation={30}
      />
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
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
});

export default VisualizarAcompanhamento;
