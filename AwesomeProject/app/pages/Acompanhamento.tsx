import React, { useEffect, useState } from 'react';
import { Button, Image, View, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function Acompanhamento() {
  const [image, setImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | undefined | null>(undefined);
  const [fileType, setFileType] = useState<string | undefined>(undefined);
  const [file, setFile] = useState< ImagePicker.ImagePickerSuccessResult | undefined >(undefined);

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão necessária', 'Precisamos da permissão para acessar a biblioteca de mídia.');
      }
    })();
  }, []);

  const uploadImage = async () => {
    if (!image) {
      Alert.alert('No image selected');
      return;
    }
    console.log("Image: ")
    console.log(image)
    const formData = new FormData();
    if (!fileName || !fileType || !file) {
      return;
    }
    const teste = new File([file.assets[0].uri], fileName, { type: fileType });
    formData.append('image', teste);
  
    formData.append('idUser', "1");
    console.log("Form Data:")
    console.log(formData)
    const boundary = '----WebKitFormBoundary' + Math.random().toString(36).substr(2, 10);
    try {
      const response = await fetch('http://localhost:3000/images/upload/', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload image');
      }

      Alert.alert('Image uploaded successfully');
    } catch (error: any) {
      Alert.alert('Upload failed', error.message);
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
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      base64: false,
      aspect: [4, 4],
      quality: 1,
    });

    if (!imagem.canceled) {
      console.log("Imagem FODA")
      console.log(imagem)
      setFile(imagem);
      setImage(imagem.assets[0].uri);
      setFileName(imagem.assets[0].fileName);
      setFileType(imagem.assets[0].mimeType);
      console.log("Chegou aqui");
      uploadImage();
    } else {
      Alert.alert('Ação cancelada', 'A captura de imagem foi cancelada.');
    }
  };

  const removeImage = async () => {
    if (!image) {
      return; // Nenhuma imagem selecionada para remover
    }

    setImage(null); // Limpa o estado para refletir a remoção da imagem
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
        <View style={styles.placeholder} />
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
