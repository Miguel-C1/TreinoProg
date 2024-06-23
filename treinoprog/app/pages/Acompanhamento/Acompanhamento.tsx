import React, { useState } from 'react';
import { View, Button, Alert, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import CameraComponent from '@/components/Camera';
import useAcompanhamento from '@/hooks/useAcompanhamento';

const Acompanhamento = () => {
  const [image, setImage] = useState(null);
  const { imageSetter,uploadImageHandler } = useAcompanhamento();

  const handleImageTaken = (base64Image) => {
    setImage(base64Image);
    imageSetter(base64Image);
    console.log(base64Image)
  };

  const travanaPose = () => {
    uploadImageHandler(image)
    setImage(null)
  }

  return (
    <SafeAreaView style={styles.container}>
      <CameraComponent onImageTaken={handleImageTaken} />
      {image && (
        <><View style={styles.imageContainer}>
          <Text style={styles.imageLabel}>Ficou Boa?</Text>
          <Image source={{ uri: image }} style={styles.image} />
        </View>
          <TouchableOpacity style={styles.button} onPress={travanaPose}>
            <Text style={styles.buttonText}>Ficou boa pra caralho!!!</Text>
          </TouchableOpacity></>
      )}


    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  imageContainer: {
    marginTop: 24,
    alignItems: 'center',
  },
  imageLabel: {
    fontSize: 18,
    marginBottom: 8,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#000',
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
  }
});

export default Acompanhamento;