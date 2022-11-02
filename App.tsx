import { StyleSheet, Text, View, Button, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import React from "react";

export default function App() {
  const [image, setImage] = React.useState(null);

  const handleCameraButton = async () => {
    const cameraPermission = await ImagePicker.getCameraPermissionsAsync();

    if (cameraPermission.status === "denied") {
      const request = await ImagePicker.requestCameraPermissionsAsync();
      if (request.status === "denied") return;
    }

    const result: any = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);

      const rollPermission =
        await ImagePicker.getMediaLibraryPermissionsAsync();

      if (rollPermission.status === "denied") {
        const request = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (request.status === "denied") return;
      }

      await MediaLibrary.saveToLibraryAsync(result.uri);
    }
  };

  const handleGalleryButton = async () => {
    const result: any = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headingText}>Subir una Imagen</Text>
      {image && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: image }} style={styles.image} />
        </View>
      )}
      <View style={styles.buttonContainer}>
        <Button onPress={handleCameraButton} title="Cámara" />
        <Button onPress={handleGalleryButton} title="Galería" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    width: 400,
    height: 400,
    marginBottom: 15,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 30,
  },
  headingText: {
    fontSize: 24,
    textTransform: "uppercase",
    marginBottom: 15,
  },
  buttonContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});
