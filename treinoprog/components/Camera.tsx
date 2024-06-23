import React from 'react';
import { View, Button, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

const CameraComponent = ({ onImageTaken }: any) => {
  const pickImage = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Desculpe, precisamos de permissão para acessar a câmera!');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
      quality: 0.5, // Reduzir a qualidade da imagem
      cameraType: ImagePicker.CameraType.front,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const uri = result.assets[0].uri;
      const base64 = await FileSystem.readAsStringAsync(uri, { encoding: 'base64' });
      const base64Length = base64.length * (3/4); // Base64 string length * 3/4 to get the size in bytes

      if (base64Length > 5 * 1024 * 1024) { // 5MB size limit
        alert('Imagem muito grande. Por favor, escolha uma imagem menor.');
        return;
      }

      onImageTaken(`data:image/jpeg;base64,${base64}`);
    }
  };

  return (
    <View>
      <Button title="Ta Pago!!" onPress={pickImage} />
    </View>
  );
};

export default CameraComponent;