import React, { useEffect, useState } from 'react';
import { Button, Image, View, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

export default function Acompanhamento() {
  const [image, setImage] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);


  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão necessária', 'Precisamos da permissão para acessar a biblioteca de mídia.');
      }
    })();
  }, []);

  const uploadImage = async () => {
    if (!selectedImage) {
      Alert.alert('No image selected');
      return;
    }

    const fileUri = selectedImage;
    const fileInfo = await FileSystem.getInfoAsync(fileUri);

    if (!fileInfo.exists) {
      Alert.alert('File not found');
      return;
    }

    const fileData = await FileSystem.readAsStringAsync(fileUri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    const formData = new FormData();
    formData.append('image', {
      uri: fileUri,
      name: 'photo.jpg',
      type: 'image/jpeg',
      data: fileData,
    } as any);

    try {
      const response = await fetch('http://seu-backend.com/upload', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to upload image');
      }

      Alert.alert('Image uploaded successfully');
    } catch (error: any) {
      Alert.alert('Upload failed', error);
    }
  };

  const tirarFoto = async () => {
    let permissao = await ImagePicker.requestCameraPermissionsAsync();

    if (permissao.status !== 'granted') {
      Alert.alert('Permissão necessária', 'Precisamos da permissão para acessar a câmera.');
      return;
    }

    let imagem = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!imagem.canceled) {
      // Aqui você pode lidar com a imagem capturada
      setImage(imagem.assets[0].uri);
      uploadImage();
    } else {
      Alert.alert('Ação cancelada', 'A captura de imagem foi cancelada.');
    }
  };

  const removeImage = async () => {
    if (!image) {
      return; // Nenhuma imagem selecionada para remover
    }

    try {
      await FileSystem.deleteAsync(image, { idempotent: true });
      setImage(''); // Limpa o estado para refletir a remoção da imagem
    } catch (error) {
      console.error('Erro ao excluir imagem:', error);
      Alert.alert('Erro', 'Houve um erro ao excluir a imagem.');
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Tirar Foto" onPress={tirarFoto} />
      {image ? (
        <View style={styles.imageContainer}>
          <Image source={{ uri: image }} style={styles.image} />
          <Button title="Remover Imagem" onPress={removeImage} />
        </View>
      ) : (
        <View style={styles.placeholder}>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
  imageContainer: {
    marginBottom: 10,
  },
  placeholder: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
  },
});
