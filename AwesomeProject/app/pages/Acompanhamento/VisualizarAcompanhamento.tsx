import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

interface VisualizarAcompanhamentoProps {
  route: {
    params: {
      idUsuario: number;
    };
  };
  navigation: any;
}

const VisualizarAcompanhamento: React.FC<VisualizarAcompanhamentoProps> = ({ route, navigation }) => {
  const [data, setData] = useState<{ trueCount: number; falseCount: number }>({ trueCount: 0, falseCount: 0 });
  const { width } = useWindowDimensions(); // Hook para obter as dimensões da janela

  useEffect(() => {
    const fetchTaPagoCounts = async () => {
      try {
        const response = await fetch(`http://localhost:3000/acompanhamento/countTaPago/user/${route.params.idUsuario}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching TaPago counts:', error);
      }
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
